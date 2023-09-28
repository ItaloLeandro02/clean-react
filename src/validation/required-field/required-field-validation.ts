import type { FieldValidation } from '@/validation/protocols'
import { RequiredFieldValidationError } from '@/validation/errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return value ? null : new RequiredFieldValidationError()
  }
}