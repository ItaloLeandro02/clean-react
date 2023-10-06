import { makeLoginValidation } from '@/main/factories/pages/login'
import { makeRegexEmailValidator } from '@/main/factories/validators/email'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct values', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email(makeRegexEmailValidator()).build(),
      ...ValidationBuilder.field('password').required().min(5).build()
    ]))
  })
})
