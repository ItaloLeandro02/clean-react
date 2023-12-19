import { type FieldValidation } from '@/validation/protocols'

export class FieldValidationSpy implements FieldValidation {
  error: Error

  constructor (readonly field: string) {}

  validate (input: object): Error {
    return this.error
  }
}
