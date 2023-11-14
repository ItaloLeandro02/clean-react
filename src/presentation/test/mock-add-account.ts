import { type AccountModel } from '@/domain/models'
import { type AddAccount, type AddAccountParams } from '@/domain/usecases'
import { mockAccountModel } from '@/domain/test'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AddAccountParams

  async add (params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    return await Promise.resolve(this.account)
  }
}
