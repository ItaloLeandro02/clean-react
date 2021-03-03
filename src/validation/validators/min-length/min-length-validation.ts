import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  fieldName: string

  validate (value: string): Error {
    this.fieldName = value
    return value.length < this.minLength ? new InvalidFieldError() : null
  }
}
