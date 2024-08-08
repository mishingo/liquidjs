import { __assign } from 'tslib'
import { ForloopDrop } from '../drop'
import { toEnumerable } from '../util'
import { TopLevelToken, assert, Liquid, Token, Template, evalQuotedToken, TypeGuards, Tokenizer, evalToken, Hash, Emitter, TagToken, Context, Tag } from '..'
import { Parser } from '../parser'

export type ParsedFileName = Template[] | Token | string | undefined

export default class extends Tag {
  private file: ParsedFileName
  private currentFile?: string
  private hash: Hash
  constructor (token: TagToken, remainTokens: TopLevelToken[], liquid: Liquid, parser: Parser) {
    super(token, remainTokens, liquid)
    const tokenizer = this.tokenizer
    this.file = parseFilePath(tokenizer, this.liquid, parser)
    this.currentFile = token.file
  
    this.hash = new Hash(tokenizer.remaining())
  }
  * render (ctx: Context, emitter: Emitter): Generator<unknown, void, unknown> {
    const { liquid, hash } = this
    const filepath = (yield renderFilePath(this['file'], ctx, liquid)) as string
    assert(filepath, () => `illegal file path "${filepath}"`)

    const childCtx = ctx.spawn()
    const scope = childCtx.bottom()
    __assign(scope, yield hash.render(ctx))
   
      const templates = (yield liquid._parsePartialFile(filepath, childCtx.sync, this['currentFile'])) as Template[]
      yield liquid.renderer.renderTemplates(templates, childCtx, emitter)

  }
}

/**
 * @return null for "none",
 * @return Template[] for quoted with tags and/or filters
 * @return Token for expression (not quoted)
 * @throws TypeError if cannot read next token
 */
export function parseFilePath (tokenizer: Tokenizer, liquid: Liquid, parser: Parser): ParsedFileName {
  if (liquid.options.dynamicPartials) {
    const file = tokenizer.readValue()
    tokenizer.assert(file, 'illegal file path')
    if (file!.getText() === 'none') return
    if (TypeGuards.isQuotedToken(file)) {
      // for filenames like "files/{{file}}", eval as liquid template
      const templates = parser.parse(evalQuotedToken(file))
      return optimize(templates)
    }
    return file
  }
  const tokens = [...tokenizer.readFileNameTemplate(liquid.options)]
  const templates = optimize(parser.parseTokens(tokens))
  return templates === 'none' ? undefined : templates
}

function optimize (templates: Template[]): string | Template[] {
  // for filenames like "files/file.liquid", extract the string directly
  if (templates.length === 1 && TypeGuards.isHTMLToken(templates[0].token)) return templates[0].token.getContent()
  return templates
}

export function * renderFilePath (file: ParsedFileName, ctx: Context, liquid: Liquid): IterableIterator<unknown> {
  if (typeof file === 'string') return file
  if (Array.isArray(file)) return liquid.renderer.renderTemplates(file, ctx)
  return yield evalToken(file, ctx)
}
