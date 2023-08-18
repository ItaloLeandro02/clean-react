import type { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode, type HttpResponse } from '@/data/protocols/http/http-response'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    statuCode: HttpStatusCode.noContent
  }

  async post (params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }
}
