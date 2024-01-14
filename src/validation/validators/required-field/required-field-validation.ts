import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldValidationError } from '@/validation/errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    return input[this.field] ? null : new RequiredFieldValidationError()
  }
}
