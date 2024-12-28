import connectedContent from './connectedContent'
import abortMessage from './abortMessage'
import catalogItems from './catalogItems'
//import ContentBlockTag from './contentBlocks'
import {TagImplOptions} from '../../template/tag-options-adapter'

const tags: { [key: string]: TagImplOptions } = {
  'connected_content': connectedContent,
  'abort_message': abortMessage,
  'catalog_items': catalogItems
  //'content_blocks': ContentBlockTag
}

export default tags
