import { TagToken, Context, Emitter, Template, ParseStream, Liquid, TopLevelToken, Token } from '../..';

import {TagImplOptions} from '../../template/tag-options-adapter'
import { resolve } from 'path';



const toKebabCase = (str: string) =>
  str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)!
    .map(x => x.toLocaleLowerCase())
    .join('-');

const renderContentBlocks = async (liquid: Liquid, ctx: Context, fileName: string) => {
  //@ts-ignore
  const customOpts = ctx.environments['__contentBlocks'];
  const opts: any = {};
  const root = ctx.opts.root.slice(0);

  if (root.length === 1) {
    const base = root[0];
    let roots = ['./content_blocks', '../content_blocks'];
    if (customOpts && customOpts.root && customOpts.root.length > 0) {
      roots = typeof customOpts.root === 'string' ? [customOpts.root] : customOpts.root;
    }
    opts.root = roots.map(p => resolve(base, p));
  }

  const ext = (customOpts && customOpts.ext) || '.liquid';

  let template;
  try {
    template = await liquid.parseFile(fileName, opts);
  } catch (err) {
    try {
      template = await liquid.parseFile(toKebabCase(fileName), opts);
    } catch (err) {
      try {
        template = await liquid.parseFile(fileName + ext, opts);
      } catch (err) {
        template = await liquid.parseFile(toKebabCase(fileName) + ext, opts);
      }
    }
  }

  return liquid.render(template, ctx.getAll(), ctx.opts);
};

const ContentBlockTag: TagImplOptions = {
  parse(tagToken: TagToken, remainingTokens: TopLevelToken[]) {
    const match = /content_blocks\.(\w+)/.exec(tagToken.args);
    if (match) {
      this.fileName = match[1];
    } else {
      this.variable = tagToken.args.trim();
    }
  },
  async render(ctx: Context, emitter: Emitter) {
    let fileName;
    if (this.fileName) {
      fileName = this.fileName;
    } else if (this.variable) {
      fileName = await this.liquid.evalValue(this.variable, ctx);
    }

    if (!fileName) {
      throw new Error('Content block name is undefined');
    }

    const originBlocks = ctx.getRegister('blocks');
    const originBlockMode = ctx.getRegister('blockMode');
    ctx.setRegister('blocks', {});
    ctx.setRegister('blockMode', 1); // BlockMode.OUTPUT is 1 in liquidjs 10.16.1

    const html = await renderContentBlocks(this.liquid, ctx, fileName);
    ctx.setRegister('blocks', originBlocks);
    ctx.setRegister('blockMode', originBlockMode);

    emitter.write(html);
  }
};

export default ContentBlockTag;
