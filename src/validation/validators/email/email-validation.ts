import { InvalidFieldValidation } from '@/validation/errors'
import type { EmailValidator, FieldValidation } from '@/validation/protocols'

export class EmailValidation implements FieldValidation {
  constructor (
    readonly field: string,
    readonly emailValidator: EmailValidator
  ) {}

  validate (input: object): Error {
    return this.emailValidator.validate(input[this.field])
      ? null
      : new InvalidFieldValidation(this.field)
  }
}
