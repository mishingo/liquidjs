import { Value, Liquid, TopLevelToken, TagToken, Context, Tag } from '../..'
// @ts-ignore
import * as rp_ from 'request-promise-cache'
const rp = rp_

const headerRegex = new RegExp(`:headers\\s+(\\{(.|\\s)*?[^\\}]\\}([^\\}]|$))`)

export default class extends Tag {
  value: Value
  options: Record<string, any> = {}

  constructor (token: TagToken, remainTokens: TopLevelToken[], liquid: Liquid) {
    super(token, remainTokens, liquid)
    const filteredValue = this.tokenizer.readFilteredValue()
    this.value = new Value(filteredValue, this.liquid)

    // Get any remaining content after the URL for options
    const remainingContent = this.tokenizer.remaining()
    if (remainingContent) {
      const headersMatch = remainingContent.match(headerRegex)
      if (headersMatch != null) {
        this.options.headers = JSON.parse(headersMatch[1])
      }
      remainingContent.replace(headerRegex, '').split(/\s+:/).forEach((optStr) => {
        if (optStr === '') return
        const opts = optStr.split(/\s+/)
        this.options[opts[0]] = opts.length > 1 ? opts[1] : true
      })
    }
  }

  async * render (ctx: Context): AsyncGenerator<unknown, void | string, unknown> {
    const urlValue = await this.value.value(ctx)
    const url = String(urlValue)
    
    if (!url) {
      throw new Error(`Invalid URL: ${url}`)
    }

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

    const contentType = method === 'POST' 
      ? (this.options.content_type || 'application/x-www-form-urlencoded')
      : this.options.content_type

    const headers = {
      'User-Agent': 'brazejs-client',
      'Content-Type': contentType,
      'Accept': this.options.content_type
    }

    if (this.options.headers) {
      for (const key of Object.keys(this.options.headers)) {
        const headerValue = await this.liquid.parseAndRender(this.options.headers[key], ctx.getAll())
        headers[key] = String(headerValue)
      }
    }

    let body = this.options.body
    if (body) {
      if (method === 'POST' && contentType?.toLowerCase().includes('application/json')) {
        const jsonBody: Record<string, string> = {}
        for (const element of body.split('&')) {
          const [key, value] = element.split('=')
          const renderedValue = await this.liquid.parseAndRender(value, ctx.getAll())
          jsonBody[key] = String(renderedValue).replace(/(?:\r\n|\r|\n)/g, '')
        }
        body = JSON.stringify(jsonBody)
      } else {
        const renderedBody = await this.liquid.parseAndRender(body, ctx.getAll())
        body = String(renderedBody)
      }
    }

    const rpOption = {
      'resolveWithFullResponse': true,
      method,
      headers,
      body,
      uri: url,
      cacheKey: url,
      cacheTTL,
      timeout: 2000
    }

    if (this.options.basic_auth) {
      const secrets = ctx.environments['__secrets']
      if (!secrets) {
        throw new Error('No secrets defined in context!')
      }
      const secret = secrets[this.options.basic_auth]
      if (!secret) {
        throw new Error(`No secret found for ${this.options.basic_auth}`)
      }
      if (!secret.username || !secret.password) {
        throw new Error(`No username or password set for ${this.options.basic_auth}`)
      }
      rpOption['auth'] = {
        user: secret.username,
        pass: secret.password
      }
    }

    let res
    try {
      res = await rp(rpOption)
    } catch (e) {
      res = e
    }

    if (res.statusCode >= 200 && res.statusCode <= 299) {
      try {
        const jsonRes = JSON.parse(res.body)
        jsonRes.__http_status_code__ = res.statusCode
        ctx.environments[this.options.save || 'connected'] = jsonRes
        return
      } catch (error) {
        if (res.headers['content-type']?.includes('json')) {
          console.error(`Failed to parse body as JSON: "${res.body}"`)
        } else {
          return res.body
        }
      }
    } else {
      console.error(`${url} responded with ${res.statusCode}:\n${res.body}`)
    }
  }
}