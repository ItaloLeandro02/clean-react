import { faker } from '@faker-js/faker'
import { type AddAccountParams } from '@/domain/usecases'

export const mockAddAccount = (): AddAccountParams => {
  const password = faker.internet.password()

  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}
