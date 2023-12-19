import { type EmailValidator } from '@/validation/protocols'

export class RegexEmailValidator implements EmailValidator {
  validate (email: string): boolean {
    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    return emailRegex.test(email)
  }
}
