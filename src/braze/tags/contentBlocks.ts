import { Liquid, TagToken, Context } from '../..';
import { BlockMode } from '../../context/block-mode'
import { readFile } from 'fs/promises';
import { resolve } from 'path';

const identifier = /[\w-]+[?]?/;
const attribute = new RegExp(`^\\s*content_blocks\\s*\\$\\{\\s*(${identifier.source})\\s*\\}\\s*$`);
const toKebabCase = (str: String) =>
  str!.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)!
    .map(x => x.toLocaleLowerCase())
    .join('-')

//@ts-ignore
const renderContentBlocks = async (liquid, ctx, fileName) => {
  const customOpts = ctx.environments['__contentBlocks'];
  const roots = customOpts?.root || ['./content_blocks', '../content_blocks'];
  const ext = customOpts?.ext || '.liquid';
  const base = ctx.opts.root[0];
//@ts-ignore
  const opts = { root: roots.map(p => resolve(base, p)) };

  let fileContent;
  try {
    fileContent = await readFile(resolve(base, ...roots, `${fileName}${ext}`), 'utf8');
  } catch (err) {
    try {
      fileContent = await readFile(resolve(base, ...roots, `${toKebabCase(fileName)}${ext}`), 'utf8');
    } catch (err) {
      console.error(`Error reading file for ${fileName}:`, err);
      return '';
    }
  }

  const template = liquid.parse(fileContent);
  return await liquid.render(template, ctx);
};

export default {
  //@ts-ignore
  parse: function (tagToken) {
    const match = tagToken.value.match(/^\s*content_blocks\.(\S+)\s*$/);
    if (!match) {
      throw new Error(`Illegal token ${tagToken.raw}`);
    }
    //@ts-ignore
    this.fileName = match[1];
    //@ts-ignore
    this.extension = '.liquid';
  },
  //@ts-ignore
  render: async function (ctx) {
    //@ts-ignore
    if (!this.fileName) {
      throw new Error(`Content block name is undefined`);
    }

    const originBlocks = ctx.getRegister('blocks');
    const originBlockMode = ctx.getRegister('blockMode');
    ctx.setRegister('blocks', {});
    ctx.setRegister('blockMode', BlockMode.OUTPUT);
//@ts-ignore
    const html = await renderContentBlocks(this.liquid, ctx, this.fileName);

    ctx.setRegister('blocks', originBlocks);
    ctx.setRegister('blockMode', originBlockMode);

    return html;
  }
};
