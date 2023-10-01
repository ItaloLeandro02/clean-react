import { InvalidFieldValidation } from '@/validation/errors'
import type { FieldValidation } from '@/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly minLength: number
  ) {}

  validate (value: string): Error {
    return new InvalidFieldValidation(this.field)
  }
}
