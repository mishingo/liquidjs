import { TagImplOptions } from '../../template/tag-options-adapter'
// @ts-ignore
import * as rp_ from 'request-promise-cache'
const rp = rp_
import * as zlib from 'zlib'
import { promisify } from 'util'

interface RequestError {
  message?: string;
  statusCode?: number;
}

const gunzip = promisify(zlib.gunzip)
const inflate = promisify(zlib.inflate)
const re = new RegExp(`(\\{\\{.*?\\}\\}|https?://[^\\s]+)(\\s+(\\s|.)*)?$`)
const headerRegex = new RegExp(`:headers\\s+(\\{(.|\\s)*?[^\\}]\\}([^\\}]|$))`)

// Helper function to detect if content is gzipped
function isGzipped(buffer: Buffer): boolean {
  return buffer[0] === 0x1f && buffer[1] === 0x8b && buffer[2] === 0x08;
}

async function handleResponse(body: Buffer | string, contentEncoding: string, contentType: string): Promise<string> {
  // Handle binary buffer
  if (Buffer.isBuffer(body)) {
    // Check for gzipped content either by header or content inspection
    if (contentEncoding === 'gzip' || isGzipped(body)) {
      try {
        const decompressed = await gunzip(body)
        return decompressed.toString('utf-8')
      } catch (error) {
        console.error('Gunzip decompression failed:', error)
        return body.toString('utf-8')
      }
    }
    return body.toString('utf-8')
  }
  
  // Handle string content
  return String(body)
}

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
        this.options.headers = JSON.parse(headersMatch[1])
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
      const renderedUrl = await this.liquid.parseAndRender(this.url, ctx.getAll())

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

      let contentType = this.options.content_type
      if (method === 'POST') {
        contentType = this.options.content_type || 'application/x-www-form-urlencoded'
      }

      const headers = {
        'User-Agent': 'brazejs-client',
        'Content-Type': contentType,
        'Accept': this.options.content_type,
        'Accept-Encoding': 'gzip'
      }
      if (this.options.headers) {
        for (const key of Object.keys(this.options.headers)) {
          headers[key] = await this.liquid.parseAndRender(this.options.headers[key], ctx.getAll())
        }
      }

      let body = this.options.body
      if (this.options.body) {
        if (method.toUpperCase() === 'POST' && contentType.toLowerCase().includes('application/json')) {
          const jsonBody = {}
          for (const element of this.options.body.split('&')) {
            const bodyElementSplit = element.split('=')
            jsonBody[bodyElementSplit[0]] = (await this.liquid.parseAndRender(bodyElementSplit[1], ctx.getAll())).replace(/(?:\r\n|\r|\n|)/g, '')
          }
          body = JSON.stringify(jsonBody)
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
        encoding: null  // Important: Get response as Buffer
      }

      if (this.options.basic_auth) {
        const secrets = ctx.environments['__secrets']
        if (!secrets) throw new Error('No secrets defined in context!')
        const secret = secrets[this.options.basic_auth]
        if (!secret) throw new Error(`No secret found for ${this.options.basic_auth}`)
        if (!secret.username || !secret.password) throw new Error(`No username or password set for ${this.options.basic_auth}`)
        rpOption['auth'] = { user: secret.username, pass: secret.password }
      }

      const res = await rp(rpOption)
      
      if (res.statusCode >= 200 && res.statusCode <= 299) {
        try {
          const responseText = await handleResponse(
            res.body,
            res.headers['content-encoding'],
            res.headers['content-type']
          )
          
          const jsonRes = JSON.parse(responseText)
          jsonRes.__http_status_code__ = res.statusCode
          ctx.environments[this.options.save || 'connected'] = jsonRes
          emitter.write('')
        } catch (error) {
          console.error('Response handling error:', error)
          if (res.headers['content-type']?.includes('json')) {
            ctx.environments[this.options.save || 'connected'] = { 
              error: 'JSON parse error',
              body: res.body.toString('base64')  // Safely encode binary data
            }
          } else {
            ctx.environments[this.options.save || 'connected'] = res.body.toString('utf-8')
          }
          emitter.write('')
        }
      } else {
        ctx.environments[this.options.save || 'connected'] = {
          error: `Request failed with status ${res.statusCode}`,
          status: res.statusCode,
          body: res.body.toString('utf-8')
        }
        emitter.write('')
      }
    } catch (error: unknown) {
      const requestError = error as RequestError
      ctx.environments[this.options.save || 'connected'] = {
        error: requestError.message || 'Request failed',
        status: requestError.statusCode
      }
      emitter.write('')
    }
  }
}