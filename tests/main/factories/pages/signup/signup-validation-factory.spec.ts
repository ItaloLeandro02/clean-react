import { makeSignUpValidation } from '@/main/factories/pages'
import { makeRegexEmailValidator } from '@/main/factories/validators/email'
import { CompareFieldsValidation, EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

describe('SignUpValidationFactory', () => {
  test('Should make ValidationComposite with correct values', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('name'),
      new MinLengthValidation('name', 5),
      new RequiredFieldValidation('email'),
      new EmailValidation('email', makeRegexEmailValidator()),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 5),
      new RequiredFieldValidation('passwordConfirmation'),
      new CompareFieldsValidation('passwordConfirmation', 'password')
    ]))
  })
})
