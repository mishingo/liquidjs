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
const tagRegex = /^(\S+)\s+(.+)$/

export default <TagImplOptions>{
  parse: function (tagToken) {
    const match = tagToken.args.match(tagRegex)
    if (!match) {
      throw new Error(`Invalid catalog_items tag format: ${tagToken.getText()}. Expected format: catalog_items catalog_type post_uid`)
    }
    
    this.catalogType = match[1]  // The catalog type (e.g., 'live-posts', 'products', etc.)
    this.postUid = match[2]      // The post UID expression
  },

  render: async function (ctx, emitter) {
    try {
      // Parse the catalog type and post UID
      const renderedCatalogType = await this.liquid.parseAndRender(this.catalogType, ctx.getAll())
      const renderedPostUid = await this.liquid.parseAndRender(this.postUid, ctx.getAll())
      
      // Get the authorization token
      const authToken = ctx.get(['braze_catalog_auth_token'])
      if (!authToken) {
        throw new Error('braze_catalog_auth_token not found in context')
      }

      const rpOptions = {
        method: 'GET',
        uri: `https://rest.iad-01.braze.com/catalogs/${renderedCatalogType}/items/${renderedPostUid}`,
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        json: true,
        cacheKey: `catalog-${renderedCatalogType}-${renderedPostUid}`,
        cacheTTL: 300 * 1000, // 5 minute cache
        timeout: 2000,
        followRedirect: true,
        followAllRedirects: true,
        simple: false,
        resolveWithFullResponse: true
      }

      const response = await rp(rpOptions)

      if (response.statusCode >= 200 && response.statusCode <= 299 && response.body) {
        const catalogResponse = response.body as CatalogResponse
        if (catalogResponse.items && catalogResponse.items.length > 0) {
          ctx.push({ items: catalogResponse.items })
        } else {
          ctx.push({ items: [] })
        }
      } else {
        ctx.push({ items: [] })
        console.error(`Catalog items request failed with status ${response.statusCode}:`, response.body)
      }

      // The tag doesn't output anything directly
      emitter.write('')

    } catch (error: unknown) {
      const requestError = error as RequestError
      console.error('Error fetching catalog items:', requestError.message)
      ctx.push({ items: [] })
      emitter.write('')
    }
  }
}