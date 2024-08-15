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
function * evalPropertyAccessToken(token: PropertyAccessToken, ctx: Context, lenient: boolean): IterableIterator<unknown> {
  const props: (string | number)[] = [];
  for (const prop of token.props) {
    let propValue = yield evalToken(prop, ctx, false);

    if (typeof propValue === 'string') {
      // If the propValue is a string and might be dynamic, handle it
      //@ts-ignore
      if (propValue.startsWith('${') && propValue.endsWith('}')) {
        //@ts-ignore
        propValue = propValue.slice(2, -1); // remove the `${` and `}`
      }
    }
    //@ts-ignore
    props.push(propValue);
  }

  try {
    if (token.variable) {
      const variable = yield evalToken(token.variable, ctx, lenient);
      return yield ctx._getFromScope(variable, props);
    } else {
      return yield ctx._get(props);
    }
  } catch (e) {
    if (lenient && (e as Error).name === 'InternalUndefinedVariableError') return null;
    throw new UndefinedVariableError(e as Error, token);
  }
}

export function * evalToken(token: Token | undefined, ctx: Context, lenient = false): IterableIterator<unknown> {
  if (!token) return;

  if ('content' in token) {
    let content = token.content;

    // Handle dynamic expressions within ${} if the content is a string
    if (typeof content === 'string' && content.startsWith('${') && content.endsWith('}')) {
      const variableName = content.slice(2, -1); // extract variable name
      content = yield ctx._get(variableName); // resolve variable from context
    }

    return content;
  }

  if (isPropertyAccessToken(token)) {
    return yield evalPropertyAccessToken(token, ctx, lenient);
  }

  if (isRangeToken(token)) {
    return yield evalRangeToken(token, ctx);
  }
}

/*
export function * evalToken (token: Token | undefined, ctx: Context, lenient = false): IterableIterator<unknown> {
  if (!token) return
  if ('content' in token) return token.content
  if (isPropertyAccessToken(token)) return yield evalPropertyAccessToken(token, ctx, lenient)
  if (isRangeToken(token)) return yield evalRangeToken(token, ctx)
}

function * evalPropertyAccessToken(token: PropertyAccessToken, ctx: Context, lenient: boolean): IterableIterator<unknown> {
  const props: string[] = [];
  for (const prop of token.props) {
    let propValue = yield evalToken(prop, ctx, false);

    if (typeof propValue === 'string') {
      // Handle dynamic expressions within ${} only if propValue is a string
      //@ts-ignore
      if (propValue.startsWith('${') && propValue.endsWith('}')) {
        //@ts-ignore
        propValue = propValue.slice(2, -1); // remove the `${` and `}`
      }
    }
    //@ts-ignore
    props.push(propValue);
  }

  try {
    if (token.variable) {
      const variable = yield evalToken(token.variable, ctx, lenient);
      return yield ctx._getFromScope(variable, props);
    } else {
      return yield ctx._get(props);
    }
  } catch (e) {
    if (lenient && (e as Error).name === 'InternalUndefinedVariableError') return null;
    throw new UndefinedVariableError(e as Error, token);
  }
}

/*
working without []
function * evalPropertyAccessToken(token: PropertyAccessToken, ctx: Context, lenient: boolean): IterableIterator<unknown> {
  const props: string[] = [];
  for (const prop of token.props) {
    let propValue = (yield evalToken(prop, ctx, false)) as unknown as string;
    if (propValue.startsWith('${') && propValue.endsWith('}')) {
      propValue = propValue.slice(2, -1); // remove the `${` and `}`
    }
    props.push(propValue);
  }
  try {
    if (token.variable) {
      const variable = yield evalToken(token.variable, ctx, lenient);
      return yield ctx._getFromScope(variable, props);
    } else {
      return yield ctx._get(props);
    }
  } catch (e) {
    if (lenient && (e as Error).name === 'InternalUndefinedVariableError') return null;
    throw (new UndefinedVariableError(e as Error, token));
  }
}
  */
/*
original
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
  */

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