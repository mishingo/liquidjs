import connectedContent from './connectedContent'
import abortMessage from './abortMessage'
import contentBlocks from './contentBlocks'
import {TagImplOptions} from '../../template/tag-options-adapter'

const tags: { [key: string]: TagImplOptions } = {
  'connected_content': connectedContent,
  'abort_message': abortMessage,
  'content_blocks': contentBlocks
}

export default tags
