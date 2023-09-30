import type { EmailValidator } from '@/validation/protocols'

export class EmailValidatorSpy implements EmailValidator {
  email: string
  result: boolean = true

  validate (email: string): boolean {
    this.email = email
    return this.result
  }
}
