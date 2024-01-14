import { faker } from '@faker-js/faker'
import { AddAccount } from '@/domain/usecases'
import { mockAccountModel } from '@/domain/test'

export const mockAddAccount = (): AddAccount.Params => {
  const password = faker.internet.password()

  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel()

export class AddAccountSpy implements AddAccount {
  account = mockAddAccountModel()
  params: AddAccount.Params
  callsCount = 0

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params
    this.callsCount++
    return await Promise.resolve(this.account)
  }
}
