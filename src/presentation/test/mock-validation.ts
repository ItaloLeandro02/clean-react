import { type Validation } from '@/presentation/protocols/validation'

export class ValidationSpy implements Validation {
  errorMessage: ''
  input: object

  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}
