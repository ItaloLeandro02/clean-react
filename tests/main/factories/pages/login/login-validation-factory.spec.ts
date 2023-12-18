import { makeLoginValidation } from '@/main/factories/pages'
import { makeRegexEmailValidator } from '@/main/factories/validators/email'
import { ValidationBuilder as Builder, ValidationComposite } from '@/validation/validators'

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct values', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('email').required().email(makeRegexEmailValidator()).build(),
      ...Builder.field('password').required().min(5).build()
    ]))
  })
})
