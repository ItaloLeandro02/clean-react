import { faker } from '@faker-js/faker'
import { Validation } from '@/presentation/protocols/validation'

export class ValidationStub implements Validation {
  errorMessage = faker.word.words()

  validate (fieldName: string, input: object): string {
    return this.errorMessage
  }
}
