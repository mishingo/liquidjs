import { __assign } from 'tslib';
import { TopLevelToken, assert, Liquid, Token, Template, evalQuotedToken, TypeGuards, Tokenizer, evalToken, Hash, Emitter, TagToken, Context, Tag } from '..';
import { Parser } from '../parser';
import * as path from 'path';
import * as fs from 'fs';

export type ParsedFileName = Template[] | Token | string | undefined;

export default class extends Tag {
  private file: ParsedFileName;
  private currentFile?: string;
  private hash: Hash;

  constructor(token: TagToken, remainTokens: TopLevelToken[], liquid: Liquid, parser: Parser) {
    super(token, remainTokens, liquid);
    const tokenizer = this.tokenizer;
    //@ts-ignore
    this.file = token.filename; // Use the filename from the token
    this.currentFile = token.file;
    this.hash = new Hash(tokenizer.remaining());
  }

  * render(ctx: Context, emitter: Emitter): Generator<unknown, void, unknown> {
    const { liquid, hash } = this;
    const filename = (yield renderFilePath(this['file'], ctx, liquid)) as string;
    assert(filename, () => `illegal file path "${filename}"`);

    // Construct the file path for the content block
    const projectRoot: string | string[] = liquid.options.root || process.cwd();

    let filepath: string = '';
    if (projectRoot instanceof Array) {
      // We will need to search for it
      for (const root of projectRoot) {
        const tentativePath = path.join(root, 'src', 'content_blocks', `${filename}.liquid`);
        if (fs.existsSync(tentativePath)) {
          filepath = tentativePath;
          break;
        }
      }
      assert(filepath, () => `file "${filename}.liquid" not found in any of the root directories`);
    } else {
      filepath = path.join(projectRoot, 'src', 'content_blocks', `${filename}.liquid`);
      assert(fs.existsSync(filepath), () => `file "${filename}.liquid" not found at path "${filepath}"`);
    }

    // Render any variables from the hash (if applicable)
    const hashScope = yield hash.render(ctx);
    // Merge the hash scope with the current context
    __assign(ctx.environments, hashScope);
    // Parse and render the content block template with the updated context
    const templates = (yield liquid._parsePartialFile(filepath, ctx.sync, this['currentFile'])) as Template[];
    yield liquid.renderer.renderTemplates(templates, ctx, emitter);
  }
}


export function parseFilePath(tokenizer: Tokenizer, liquid: Liquid, parser: Parser): ParsedFileName {
  const file = tokenizer.readValue();
  tokenizer.assert(file, 'illegal file path');
  if (file!.getText() === 'none') return;
  if (TypeGuards.isQuotedToken(file)) {
    const templates = parser.parse(evalQuotedToken(file));
    return optimize(templates);
  }
  return file;
}

function optimize(templates: Template[]): string | Template[] {
  if (templates.length === 1 && TypeGuards.isHTMLToken(templates[0].token)) return templates[0].token.getContent();
  return templates;
}

export function * renderFilePath(file: ParsedFileName, ctx: Context, liquid: Liquid): IterableIterator<unknown> {
  if (typeof file === 'string') return file;
  if (Array.isArray(file)) return liquid.renderer.renderTemplates(file, ctx);
  return yield evalToken(file, ctx);
}

