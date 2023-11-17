import { makeSignUpValidation } from '@/main/factories/pages/signup'
import { makeRegexEmailValidator } from '@/main/factories/validators/email'
import { ValidationBuilder as Builder, ValidationComposite } from '@/validation/validators'

describe('SignUpValidationFactory', () => {
  test('Should make ValidationComposite with correct values', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('name').required().min(5).build(),
      ...Builder.field('email').required().email(makeRegexEmailValidator()).build(),
      ...Builder.field('password').required().min(5).build(),
      ...Builder.field('passwordConfirmation').required().sameAs('password').build()
    ]))
  })
})
