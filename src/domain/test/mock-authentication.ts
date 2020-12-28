import faker from 'faker'
import { AuthenthicationParams } from '../usecases/authentication'

export const mockAuthentication = (): AuthenthicationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
