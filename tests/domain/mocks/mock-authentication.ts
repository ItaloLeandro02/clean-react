import { faker } from '@faker-js/faker'
import { Authentication } from '@/domain/usecases'
import { mockAccountModel } from '@/tests/domain/mocks'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = (): Authentication.Model => mockAccountModel()

export class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel()
  params: Authentication.Params
  callsCount = 0

  async auth (params: Authentication.Params): Promise<Authentication.Model> {
    this.params = params
    this.callsCount++
    return await Promise.resolve(this.account)
  }
}
