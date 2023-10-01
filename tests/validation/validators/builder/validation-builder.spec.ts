import { faker } from '@faker-js/faker'
import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation'
import { ValidationBuilder as sut } from '@/validation/validators/builder/validation-builder'
import { EmailValidation } from '@/validation/validators/email/email-validation'
import { EmailValidatorSpy } from '@/validation/test'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).required().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName)
    ])
  })

  test('Should return EmailValidation', () => {
    const fieldName = faker.database.column()
    const emailValidatorSpy = new EmailValidatorSpy()
    const validations = sut.field(fieldName).email(emailValidatorSpy).build()
    expect(validations).toEqual([
      new EmailValidation(fieldName, emailValidatorSpy)
    ])
  })
})
