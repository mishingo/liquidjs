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

interface RequestError {
  name: string;
  statusCode?: number;
  message: string;
  error?: string;
}

export default class extends Tag {
  private url: string = ''
  private options: Record<string, any> = {}

  constructor(token: TagToken, remainTokens: TopLevelToken[], liquid: Liquid) {
    super(token, remainTokens, liquid)
    this.tokenizer.skipBlank()

    // Read all characters until a space or colon for the URL
    const begin = this.tokenizer.p
    let inHandlebars = false

    while (this.tokenizer.p < this.tokenizer.N) {
      const char = this.tokenizer.peek()
      
      if (!inHandlebars && (char === ' ' || char === ':')) {
        break
      }

      if (char === '{' && this.tokenizer.peek(1) === '{') {
        inHandlebars = true
        this.tokenizer.p += 2
        continue
      }

      if (char === '}' && this.tokenizer.peek(1) === '}') {
        inHandlebars = false
        this.tokenizer.p += 2
        break
      }

      this.tokenizer.p++
    }

    this.url = this.tokenizer.input.slice(begin, this.tokenizer.p).trim()
    if (!this.url) throw new Error('missing URL')

    // Parse remaining options
    this.tokenizer.skipBlank()
    const args = this.tokenizer.remaining().trim()
    
    if (args) {
      const headersMatch = args.match(headerRegex)
      if (headersMatch != null) {
        this.options.headers = JSON.parse(headersMatch[1])
      }
      
      const optionsStr = args.replace(headerRegex, '').trim()
      const optionPairs = optionsStr.match(/:\w+\s+[^\s:]+/g) || []
      
      optionPairs.forEach(pair => {
        const [key, value] = pair.slice(1).split(/\s+/)
        this.options[key] = value
      })
    }
  }

  * render(ctx: Context): Generator<unknown, void, unknown> {
    let resolvedUrl = this.url

    // If URL is wrapped in handlebars
    if (resolvedUrl.startsWith('{{') && resolvedUrl.endsWith('}}')) {
      const varName = resolvedUrl.slice(2, -2).trim()
      const value = new Value(varName, this.liquid)
      resolvedUrl = String(yield value.value(ctx))
    }

    if (!resolvedUrl) {
      throw new Error(`Invalid URL: ${resolvedUrl}`)
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
      uri: resolvedUrl,
      cacheKey: resolvedUrl,
      cacheTTL,
      timeout: 2000,
      followRedirect: true,
      followAllRedirects: true,
      simple: false
    }

    try {
      const res = (yield rp(rpOption)) as RequestResponse
      
      if (res.statusCode >= 200 && res.statusCode <= 299) {
        try {
          if (this.options.content_type === 'application/json') {
            const jsonRes = JSON.parse(res.body)
            jsonRes.__http_status_code__ = res.statusCode
            ctx.bottom()[this.options.save || 'connected'] = jsonRes
          } else {
            ctx.bottom()[this.options.save || 'connected'] = res.body
          }
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError)
          ctx.bottom()[this.options.save || 'connected'] = res.body
        }
      } else {
        ctx.bottom()[this.options.save || 'connected'] = {
          status: res.statusCode,
          body: res.body
        }
      }
    } catch (error) {
      const requestError = error as RequestError
      console.error('Request Error:', requestError)
      ctx.bottom()[this.options.save || 'connected'] = {
        error: requestError.message || 'Request failed',
        code: requestError.statusCode
      }
    }
  }
}