import { TagImplOptions } from '../../template/tag-options-adapter'
// @ts-ignore
import * as rp_ from 'request-promise-cache'
const rp = rp_

interface RequestError {
  message?: string;
  statusCode?: number;
}

// Match the catalog_items tag syntax: catalog_items live-posts post_uid
const tagRegex = /^(live-posts)\s+(.+)$/

export default <TagImplOptions>{
  parse: function (tagToken) {
    const match = tagToken.args.match(tagRegex)
    if (!match) {
      throw new Error(`Invalid catalog_items tag format: ${tagToken.getText()}`)
    }
    
    this.catalogType = match[1]  // Should be 'live-posts'
    this.postUid = match[2]      // The post UID expression
  },

  render: async function (ctx, emitter) {
    try {
      // Parse any Liquid variables in the post UID
      const renderedPostUid = await this.liquid.parseAndRender(this.postUid, ctx.getAll())
      
      // Get the authorization token
      const authToken = ctx.get(['braze_catalog_auth_token'])
      if (!authToken) {
        throw new Error('braze_catalog_auth_token not found in context')
      }

      const rpOptions = {
        method: 'GET',
        uri: `https://rest.iad-01.braze.com/catalogs/${this.catalogType}/items`,
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        json: true,
        cacheKey: `catalog-${this.catalogType}-${renderedPostUid}`,
        cacheTTL: 300 * 1000, // 5 minute cache
        timeout: 2000,
        followRedirect: true,
        followAllRedirects: true,
        simple: false,
        resolveWithFullResponse: true
      }

      const response = await rp(rpOptions)

      if (response.statusCode >= 200 && response.statusCode <= 299) {
        // Store the items in the context using proper scope method
        ctx.push({ 
          items: response.body.items || []
        })
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