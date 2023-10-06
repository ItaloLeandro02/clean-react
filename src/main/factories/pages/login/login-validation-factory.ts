import { ValidationComposite, ValidationBuilder } from '@/validation/validators'
import { makeRegexEmailValidator } from '@/main/factories/validators/email'

export const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email(makeRegexEmailValidator()).build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
}
