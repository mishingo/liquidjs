import { QuotedToken, RangeToken, OperatorToken, Token, PropertyAccessToken, OperatorType, operatorTypes } from '../tokens'
import { isRangeToken, isPropertyAccessToken, UndefinedVariableError, range, isOperatorToken, assert } from '../util'
import type { Context } from '../context'
import type { UnaryOperatorHandler } from '../render'

export class Expression {
  private postfix: Token[]

  public constructor (tokens: IterableIterator<Token>) {
    this.postfix = [...toPostfix(tokens)]
  }
  public * evaluate (ctx: Context, lenient?: boolean): Generator<unknown, unknown, unknown> {
    assert(ctx, 'unable to evaluate: context not defined')
    const operands: any[] = []
    for (const token of this.postfix) {
      if (isOperatorToken(token)) {
        const r = operands.pop()
        let result
        if (operatorTypes[token.operator] === OperatorType.Unary) {
          result = yield (ctx.opts.operators[token.operator] as UnaryOperatorHandler)(r, ctx)
        } else {
          const l = operands.pop()
          result = yield ctx.opts.operators[token.operator](l, r, ctx)
        }
        operands.push(result)
      } else {
        operands.push(yield evalToken(token, ctx, lenient))
      }
    }
    return operands[0]
  }
  public valid () {
    return !!this.postfix.length
  }
}

export function * evalToken(token: Token | undefined, ctx: Context, lenient = false): IterableIterator<unknown> {
  if (!token) return;

  // Handle plain text tokens
  if ('content' in token) return token.content;

  // Handle property access tokens
  if (isPropertyAccessToken(token)) return yield evalPropertyAccessToken(token, ctx, lenient);

  // Handle range tokens
  if (isRangeToken(token)) return yield evalRangeToken(token, ctx);

  // Convert token to string and check for dynamic variable syntax ${variableName}
  const str = token.getText();
  const dynamicVarRegex = /\$\{([^}]+)\}/g;

  // Check if the expression contains dynamic variable syntax
  let dynamicVariableMatch = dynamicVarRegex.exec(str);
  if (dynamicVariableMatch) {
    let result = str;

    // Process each dynamic variable found
    while (dynamicVariableMatch) {
      const fullMatch = dynamicVariableMatch[0];  // e.g., ${email_address}
      const varName = dynamicVariableMatch[1].trim();  // e.g., email_address

      // Split the variable name by dot to form a path array
      const path = varName.split('.');

      // Get the value of the variable from the context using getSync()
      const value = ctx.getSync(path);
      const resolvedValue = value !== undefined ? String(value) : '';

      // Replace the dynamic variable in the original string
      result = result.replace(fullMatch, resolvedValue);

      // Move to the next match
      dynamicVariableMatch = dynamicVarRegex.exec(result);
    }

    return result;
  }

  // If no dynamic variable syntax is found, fall back to default evaluation
  return yield ctx.getSync(str.trim().split('.'));
}

function * evalPropertyAccessToken (token: PropertyAccessToken, ctx: Context, lenient: boolean): IterableIterator<unknown> {
  const props: string[] = []
  for (const prop of token.props) {
    props.push((yield evalToken(prop, ctx, false)) as unknown as string)
  }
  try {
    if (token.variable) {
      const variable = yield evalToken(token.variable, ctx, lenient)
      return yield ctx._getFromScope(variable, props)
    } else {
      return yield ctx._get(props)
    }
  } catch (e) {
    if (lenient && (e as Error).name === 'InternalUndefinedVariableError') return null
    throw (new UndefinedVariableError(e as Error, token))
  }
}

export function evalQuotedToken (token: QuotedToken) {
  return token.content
}

function * evalRangeToken (token: RangeToken, ctx: Context) {
  const low: number = yield evalToken(token.lhs, ctx)
  const high: number = yield evalToken(token.rhs, ctx)
  return range(+low, +high + 1)
}

function * toPostfix (tokens: IterableIterator<Token>): IterableIterator<Token> {
  const ops: OperatorToken[] = []
  for (const token of tokens) {
    if (isOperatorToken(token)) {
      while (ops.length && ops[ops.length - 1].getPrecedence() > token.getPrecedence()) {
        yield ops.pop()!
      }
      ops.push(token)
    } else yield token
  }
  while (ops.length) {
    yield ops.pop()!
  }
}
