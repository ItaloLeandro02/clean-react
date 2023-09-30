import { InvalidFieldValidation } from '@/validation/errors'
import type { FieldValidation } from '@/validation/protocols'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return new InvalidFieldValidation(this.field)
  }
}
