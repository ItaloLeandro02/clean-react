import type { HttpPostClient } from '@/data/protocols/http'
import { HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import type { AccountModel } from '@/domain/models'
import type { AddAccount, AddAccountParams } from '@/domain/usecases'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
  ) {}

  async add (params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return null
      case HttpStatusCode.Forbidden: throw new EmailInUseError()
      default: throw new UnexpectedError()
    }
  }
}
