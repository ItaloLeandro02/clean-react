import faker from 'faker'
import { AuthenthicationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

export const mockAuthentication = (): AuthenthicationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid()
})
