import { InvalidFieldValidation } from '@/validation/errors'
import type { EmailValidator, FieldValidation } from '@/validation/protocols'

export class EmailValidation implements FieldValidation {
  constructor (
    readonly field: string,
    readonly emailValidator: EmailValidator
  ) {}

  validate (value: string): Error {
    return this.emailValidator.validate(value)
      ? null
      : new InvalidFieldValidation(this.field)
  }
}
