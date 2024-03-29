import { faker } from '@faker-js/faker'
import {
  CompareFieldsValidation,
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationBuilder as sut
} from '@/validation/validators'
import { EmailValidatorSpy } from '@/tests/validation/mocks'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field)
    ])
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const emailValidatorSpy = new EmailValidatorSpy()
    const validations = sut.field(field).email(emailValidatorSpy).build()
    expect(validations).toEqual([
      new EmailValidation(field, emailValidatorSpy)
    ])
  })

  test('Should return CompareFieldsValidation', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const validations = sut.field(field).sameAs(fieldToCompare).build()
    expect(validations).toEqual([
      new CompareFieldsValidation(field, fieldToCompare)
    ])
  })

  test('Should return MinLengthValidation', () => {
    const field = faker.database.column()
    const length = faker.number.int()
    const validations = sut.field(field).min(length).build()
    expect(validations).toEqual([
      new MinLengthValidation(field, length)
    ])
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const emailValidatorSpy = new EmailValidatorSpy()
    const length = faker.number.int()
    const validations = sut.field(field).required().email(emailValidatorSpy).min(length).build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field, emailValidatorSpy),
      new MinLengthValidation(field, length)
    ])
  })
})
