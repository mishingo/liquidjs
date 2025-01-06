import { TagImplOptions } from '../../template/tag-options-adapter'
// @ts-ignore
import * as rp_ from 'request-promise-cache'
const rp = rp_

interface RequestError {
  message?: string;
  statusCode?: number;
}

interface CatalogItem {
  id: string;
  [key: string]: any;  // Allow for other properties
}

interface CatalogResponse {
  items: CatalogItem[];
  message: string;
}

// Match the catalog_items tag syntax: catalog_items catalog_type post_uid
const tagRegex = /^(\S+)\s+\{\{(.+?)\}\}$/

export default <TagImplOptions>{
  parse: function (tagToken) {
    const match = tagToken.args.match(tagRegex)
    if (!match) {
      throw new Error(`Invalid catalog_items tag format: ${tagToken.getText()}`)
    }
    
    this.catalogType = match[1]
    this.postUid = match[2].trim()  // Store the raw expression
    console.log('Parsed UID:', this.postUid) // Debug log
  },
  render: async function (ctx, emitter) {
    try {
      const renderedCatalogType = await this.liquid.parseAndRender(this.catalogType, ctx.getAll())
      const renderedPostUid = await this.liquid.evalValue(this.postUid, ctx)
      
      console.log('Rendered UID:', renderedPostUid)

      if (!renderedPostUid) {
        throw new Error(`Failed to evaluate post UID: ${this.postUid}`)
      }

      const authToken = ctx.get(['braze_catalog_auth_token'])
      if (!authToken) {
        throw new Error('braze_catalog_auth_token not found in context')
      }

      const response = await rp({
        method: 'GET', 
        uri: `https://rest.iad-01.braze.com/catalogs/${renderedCatalogType}/items/${renderedPostUid}`,
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        json: true,
        timeout: 2000
      });

      if (response?.items) {
        ctx.push({ items: response.items })
      } else {
        ctx.push({ items: [] })
      }

      emitter.write('')

    } catch (error: unknown) {
      const err = error as Error
      console.error('Request failed:', err.message) 
      ctx.push({ items: [] })
      emitter.write('')
    }
  }
}