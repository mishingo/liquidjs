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
  private inputString: string = ''
  private isVariable: boolean = false
  private options: Record<string, any> = {}

  constructor(token: TagToken, remainTokens: TopLevelToken[], liquid: Liquid) {
    super(token, remainTokens, liquid)
    this.tokenizer.skipBlank()

    // Check if we're dealing with a variable
    if (this.tokenizer.peek() === '{' && this.tokenizer.peek(1) === '{') {
      this.isVariable = true
      this.tokenizer.p += 2
      this.tokenizer.skipBlank()
      const urlToken = this.tokenizer.readIdentifier()
      this.inputString = urlToken.getText()
      this.tokenizer.skipBlank()
      if (this.tokenizer.peek() === '}' && this.tokenizer.peek(1) === '}') {
        this.tokenizer.p += 2
      }
    } else {
      // Direct URL case - read until space or colon
      const begin = this.tokenizer.p
      while (this.tokenizer.p < this.tokenizer.N && 
             this.tokenizer.input[this.tokenizer.p] !== ' ' && 
             this.tokenizer.input[this.tokenizer.p] !== ':') {
        this.tokenizer.p++
      }
      this.inputString = this.tokenizer.input.slice(begin, this.tokenizer.p)
    }

    if (!this.inputString) throw new Error('missing URL')

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
    let url: string
    if (this.isVariable) {
      const value = new Value(this.inputString, this.liquid)
      url = String(yield value.value(ctx))
    } else {
      url = this.inputString
    }

    // Rest of the render method stays the same
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