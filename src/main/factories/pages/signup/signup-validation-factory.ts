import { ValidationComposite, ValidationBuilder as Builder } from '@/validation/validators'
import { makeRegexEmailValidator } from '@/main/factories/validators/email'

export const makeSignUpValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('name').required().min(5).build(),
    ...Builder.field('email').required().email(makeRegexEmailValidator()).build(),
    ...Builder.field('password').required().min(5).build(),
    ...Builder.field('passwordConfirmation').required().sameAs('password').build()
  ])
}
