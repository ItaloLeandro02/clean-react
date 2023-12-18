import { type HttpGetClient, type HttpGetParams, type HttpResponse } from '@/data/protocols/http'
import { type GetStorage } from '@/data/protocols/cache'

export class AuthorizeHttpClientDecorator implements HttpGetClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async get (params: HttpGetParams): Promise<HttpResponse<any>> {
    const account = this.getStorage.get('account')
    if (account?.accessToken) {
      Object.assign(params, {
        headers: {
          'x-access-token': account.accessToken
        }
      })
    }
    await this.httpGetClient.get(params)
    return await Promise.resolve(null)
  }
}
