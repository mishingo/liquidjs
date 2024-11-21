import { Value, Liquid, TopLevelToken, TagToken, Context, Tag } from '../..'
import { FilteredValueToken } from '../../tokens'
// @ts-ignore
import * as rp_ from 'request-promise-cache'
const rp = rp_

const headerRegex = new RegExp(`:headers\\s+(\\{(.|\\s)*?[^\\}]\\}([^\\}]|$))`)

interface RequestResponse {
  statusCode: number;
  body: string;
  headers?: {
    'content-type'?: string;
    [key: string]: string | undefined;
  };
}

export default class extends Tag {
  private value: Value
  private options: Record<string, any> = {}

  constructor (token: TagToken, remainTokens: TopLevelToken[], liquid: Liquid) {
    super(token, remainTokens, liquid)

    const valueName = this.tokenizer.readFilteredValue()
    if (!valueName) {
      throw new Error(`missing URL in ${token.getText()}`)
    }
    this.value = new Value(valueName as FilteredValueToken, this.liquid)

    // Parse remaining options
    this.tokenizer.skipBlank()
    const remaining = this.tokenizer.remaining()
    if (remaining) {
      const headersMatch = remaining.match(headerRegex)
      if (headersMatch != null) {
        this.options.headers = JSON.parse(headersMatch[1])
      }
      remaining.replace(headerRegex, '').split(/\s+:/).forEach((optStr) => {
        if (optStr === '') return
        const opts = optStr.split(/\s+/)
        this.options[opts[0]] = opts.length > 1 ? opts[1] : true
      })
    }
  }

  * render (ctx: Context): Generator<unknown, void | string, unknown> {
    const urlResult = yield this.value.value(ctx)
    const url = String(urlResult)
    
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

    const headers: Record<string, string> = {
      'User-Agent': 'brazejs-client',
      'Content-Type': contentType,
      'Accept': this.options.content_type
    }

    if (this.options.headers) {
      for (const key of Object.keys(this.options.headers)) {
        const headerValue = yield this.liquid.parseAndRender(this.options.headers[key], ctx.getAll())
        headers[key] = String(headerValue)
      }
    }

    let body: string | undefined = this.options.body
    if (body) {
      if (method === 'POST' && contentType?.toLowerCase().includes('application/json')) {
        const jsonBody: Record<string, string> = {}
        for (const element of body.split('&')) {
          const [key, value] = element.split('=')
          const renderedValue = yield this.liquid.parseAndRender(value, ctx.getAll())
          jsonBody[key] = String(renderedValue).replace(/(?:\r\n|\r|\n)/g, '')
        }
        body = JSON.stringify(jsonBody)
      } else {
        const renderedBody = yield this.liquid.parseAndRender(body, ctx.getAll())
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

    let res: RequestResponse
    try {
      res = (yield rp(rpOption)) as RequestResponse
    } catch (e) {
      res = e as RequestResponse
    }

    if (res.statusCode >= 200 && res.statusCode <= 299) {
      try {
        const jsonRes = JSON.parse(res.body)
        jsonRes.__http_status_code__ = res.statusCode
        ctx.environments[this.options.save || 'connected'] = jsonRes
        return
      } catch (error) {
        if (res.headers?.['content-type']?.includes('json')) {
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