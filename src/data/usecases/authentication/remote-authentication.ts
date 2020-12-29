import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { AccountModel } from '@/domain/models'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { AuthenthicationParams, Authentication } from '@/domain/usecases'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenthicationParams, AccountModel>
  ) {}

  async auth (params: AuthenthicationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
