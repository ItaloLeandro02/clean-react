import { type HttpGetClient, type HttpGetParams, type HttpResponse } from '@/data/protocols/http'
import { type GetStorage } from '@/data/protocols/cache'

export class AuthorizeHttpClientDecorator implements HttpGetClient {
  constructor (
    private readonly getStorage: GetStorage
  ) {}

  async get (params: HttpGetParams): Promise<HttpResponse<any>> {
    this.getStorage.get('account')
    return await Promise.resolve(null)
  }
}
