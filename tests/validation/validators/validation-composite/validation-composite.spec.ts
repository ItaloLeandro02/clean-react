import { faker } from '@faker-js/faker'
import { CompositeValidation } from '@/validation/validators/validation-composite/validation-composite'
import { FieldValidationSpy } from '@/validation/test'

type SutTypes = {
  sut: CompositeValidation
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = new CompositeValidation(fieldValidationsSpy)

  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    const validationError = new Error(faker.word.words())
    fieldValidationsSpy[0].error = validationError
    const error = sut.validate(fieldName, faker.word.adjective())
    expect(error).toBe(validationError.message)
  })

  test('Should return first error if more validations fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    const firstError = new Error(faker.word.words())
    fieldValidationsSpy[0].error = firstError
    const secondError = new Error(faker.word.words())
    fieldValidationsSpy[1].error = secondError
    const error = sut.validate(fieldName, faker.word.adjective())
    expect(error).toBe(firstError.message)
  })

  test('Should return falsy if no one validation fails', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, faker.word.adjective())
    expect(error).toBeFalsy()
  })
})
