import type { EmailValidator } from '@/validation/protocols'

export class RegexEmailValidator implements EmailValidator {
  validate (email: string): boolean {
    return false
  }
}
