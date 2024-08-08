import * as _ from '../../util/underscore'

import { Value, Liquid, TopLevelToken, TagToken, Context, Tag } from '../..'
import {TagImplOptions} from '../../template/tag-options-adapter'

import { assert } from '../../util/assert'

import { BlockMode } from '../../context/block-mode'
import { resolve } from 'path'

const identifier = /[\w-]+[?]?/
const attribute = new RegExp(`^\\s*(?:(${identifier.source})\\.)?\\$\\{\\s*([\\s\\S]+?)\\s*\\}\\s*$`)


const toKebabCase = (str: String) =>
  str!.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)!
    .map(x => x.toLocaleLowerCase())
    .join('-')

const renderContentBlocks = async function (liquid: Liquid, ctx: Context, fileName: string) {
  const customOpts = ctx.environments['__contentBlocks']

  const opts = {}
  const root = ctx.opts.root.slice(0)
  if (root.length === 1) {
    const base = root[0]
    let roots = ['./content_blocks', '../content_blocks']
    if (customOpts && customOpts.root && customOpts.root.length > 0) {
      roots = _.isString(customOpts.root) ? [customOpts.root] : customOpts.root
    }

    opts['root'] = roots.map(p => resolve(base, p))
  }

  const ext = (customOpts && customOpts.ext) || '.liquid'

  let template
  try {
    template = await liquid.parseFile(fileName)
  } catch (err) {
    try {
      template = await liquid.parseFile(toKebabCase(fileName))
    } catch (err) {
      try {
        template = await liquid.parseFile(fileName + ext)
      } catch (err) {
        template = await liquid.parseFile(toKebabCase(fileName) + ext)
      }
    }
  }

  return liquid.renderer.renderTemplates(template, ctx)
}

export default <TagImplOptions>{
  parse: function (tagToken: TagToken) {
    //@ts-ignore
    const match = tagToken.value.match(attribute)
    if (!match) {
      //@ts-ignore
      throw new Error(`illegal token ${tagToken.raw}`)
    }
    this.fileName = match[2]
    this.extension = '.liquid'
  },
  render: async function (ctx: Context) {
    assert(this.fileName, `content blocks name is undefined`)

    const originBlocks = ctx.getRegister('blocks')
    const originBlockMode = ctx.getRegister('blockMode')
    ctx.setRegister('blocks', {})
    ctx.setRegister('blockMode', BlockMode.OUTPUT)

    const html = renderContentBlocks(this.liquid, ctx, this.fileName)
    ctx.setRegister('blocks', originBlocks)
    ctx.setRegister('blockMode', originBlockMode)

    return html
  }
}
