import { faker } from '@faker-js/faker'
import { type Validation } from '@/presentation/protocols/validation'

export class ValidationStub implements Validation {
  errorMessage = faker.word.words()

  validate (fieldName: string, fieldValue: string): string {
    return this.errorMessage
  }
}
