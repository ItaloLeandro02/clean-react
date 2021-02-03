import { Authentication, AuthenthicationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenthicationParams
  async auth (params: AuthenthicationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  }
}
