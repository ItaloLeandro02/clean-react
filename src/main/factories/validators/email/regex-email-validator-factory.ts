import { RegexEmailValidator } from '@/infra/email-validator/regex-email-validator/regex-email-validator'
import { type EmailValidator } from '@/validation/protocols'

export const makeRegexEmailValidator = (): EmailValidator => {
  return new RegexEmailValidator()
}
