import { Value, Liquid, TopLevelToken, TagToken, Context, Tag } from '../..'
import {TagImplOptions} from '../../template/tag-options-adapter'
import { AbortError } from '../error'

const re = new RegExp(`\\(('([^']*)'|"([^"]*)")?\\)`)

export default <TagImplOptions>{
  parse: function (tagToken: TagToken) {
    const match = tagToken.args.match(re)
    if (!match) {
      //@ts-ignore
      throw new Error(`illegal token ${tagToken.raw}`)
    }

    this.msg = match[2] || match[3] || 'message is aborted'
  },
  render: async function (ctx: Context) {
    throw new AbortError(this.msg)
  }
}
