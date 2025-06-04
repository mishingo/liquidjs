import { TagImplOptions } from '../../template/tag-options-adapter'
// @ts-ignore
import * as rp_ from 'request-promise-cache'
const rp = rp_

interface RequestError {
  message?: string;
  statusCode?: number;
}

// Matches both direct URLs and Liquid variables/expressions
const re = new RegExp(`(\\{\\{.*?\\}\\}|https?://[^\\s]+)(\\s+(\\s|.)*)?$`)
const headerRegex = new RegExp(`:headers\\s+(\\{(.|\\s)*?[^\\}]\\}([^\\}]|$))`)

export default <TagImplOptions>{
  parse: function (tagToken) {
    const match = tagToken.args.match(re)
    if (!match) {
      throw new Error(`illegal token ${tagToken.getText()}`)
    }
    this.url = match[1]
    const options = match[2]
    this.options = {}
    if (options) {
      const headersMatch = options.match(headerRegex)
      if (headersMatch != null) {
        try {
          this.options.headers = JSON.parse(headersMatch[1])
        } catch (e) {
          console.error('Headers JSON parse error:', e)
          throw new Error(`Headers JSON malformed in token ${tagToken.getText()}`)
        }
      }
      options.replace(headerRegex, '').split(/\s+:/).forEach((optStr) => {
        if (optStr === '') return
        const opts = optStr.split(/\s+/)
        if (opts[0] === 'headers') {
          console.error('Headers JSON malformed. Check your headers value')
        }
        this.options[opts[0]] = opts.length > 1 ? opts[1] : true
      })
    }
  },
  render: async function (ctx, emitter) {
    try {
      // Parse any Liquid variables/expressions in the URL
      const renderedUrl = await this.liquid.parseAndRender(this.url, ctx.getAll())
      console.log('Rendered URL:', renderedUrl) // Debug log

      // Set up caching
      const method = (this.options.method || 'GET').toUpperCase()
      let cacheTTL = 300 * 1000
      if (method !== 'GET') {
        cacheTTL = 0
      } else {
        const cache = parseInt(this.options.cache, 10)
        if (cache > 0) {
          cacheTTL = cache * 1000
        } else if (cache === 0) {
          cacheTTL = 1
        }
      }

      // Set up content type
      let contentType = this.options.content_type
      if (method === 'POST') {
        contentType = this.options.content_type || 'application/x-www-form-urlencoded'
      }

      // Set up headers
      const headers = {
        'User-Agent': 'brazejs-client',
        'Content-Type': contentType,
        'Accept': this.options.content_type
      }
      
      // Handle custom headers if present
      if (this.options.headers) {
        for (const key of Object.keys(this.options.headers)) {
          headers[key] = await this.liquid.parseAndRender(this.options.headers[key], ctx.getAll())
        }
      }

      // Handle body if present
      let body = this.options.body
      if (this.options.body) {
        if (method.toUpperCase() === 'POST' && contentType && contentType.toLowerCase().includes('application/json')) {
          // Check if it contains form-data style parameters (key=value&key=value)
          if (this.options.body.includes('&') && this.options.body.includes('=') && !this.options.body.includes('{{')) {
            // Handle form-data style parsing
            const jsonBody = {}
            for (const element of this.options.body.split('&')) {
              const bodyElementSplit = element.split('=')
              jsonBody[bodyElementSplit[0]] = (await this.liquid.parseAndRender(bodyElementSplit[1], ctx.getAll())).replace(/(?:\r\n|\r|\n|)/g, '')
            }
            body = JSON.stringify(jsonBody)
          } else {
            // Render as Liquid template (handles both {{ variable }} and plain variable)
            body = await this.liquid.parseAndRender(this.options.body, ctx.getAll())
          }
        } else {
          body = await this.liquid.parseAndRender(this.options.body, ctx.getAll())
        }
      }

      const rpOption = {
        'resolveWithFullResponse': true,
        method,
        headers,
        body,
        uri: renderedUrl,
        cacheKey: renderedUrl,
        cacheTTL,
        timeout: 2000,
        followRedirect: true,
        followAllRedirects: true,
        simple: false,
        json: true,    // Auto-parse JSON
        gzip: true     // Auto-handle gzip
      }

      // Handle basic auth if present
      if (this.options.basic_auth) {
        const secrets = ctx.environments['__secrets']
        if (!secrets) throw new Error('No secrets defined in context!')
        const secret = secrets[this.options.basic_auth]
        if (!secret) throw new Error(`No secret found for ${this.options.basic_auth}`)
        if (!secret.username || !secret.password) throw new Error(`No username or password set for ${this.options.basic_auth}`)
        rpOption['auth'] = { user: secret.username, pass: secret.password }
      }

      console.log('Request options:', rpOption) // Debug log
      const res = await rp(rpOption)
      console.log('Response status:', res.statusCode) // Debug log
      
      if (res.statusCode >= 200 && res.statusCode <= 299) {
        const jsonRes = typeof res.body === 'object' ? res.body : { body: res.body }
        jsonRes.__http_status_code__ = res.statusCode
        ctx.environments[this.options.save || 'connected'] = jsonRes
      } else {
        ctx.environments[this.options.save || 'connected'] = {
          error: `Request failed with status ${res.statusCode}`,
          status: res.statusCode,
          body: res.body
        }
      }
      emitter.write('')
    } catch (error: unknown) {
      const requestError = error as RequestError
      console.error('Connected Content Error:', requestError) // Debug log
      ctx.environments[this.options.save || 'connected'] = {
        error: requestError.message || 'Request failed',
        status: requestError.statusCode
      }
      emitter.write('')
    }
  }
}