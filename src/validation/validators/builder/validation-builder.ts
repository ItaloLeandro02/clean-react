import { EmailValidator, FieldValidation } from '@/validation/protocols'
import {
  CompareFieldsValidation,
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation
} from '@/validation/validators'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly fieldValidations: FieldValidation[]
  ) {}

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required (): this {
    this.fieldValidations.push(
      new RequiredFieldValidation(this.fieldName)
    )
    return this
  }

  email (emailValidator: EmailValidator): this {
    this.fieldValidations.push(
      new EmailValidation(this.fieldName, emailValidator)
    )
    return this
  }

  min (length: number): this {
    this.fieldValidations.push(
      new MinLengthValidation(this.fieldName, length)
    )
    return this
  }

  sameAs (fieldToCompare: string): this {
    this.fieldValidations.push(
      new CompareFieldsValidation(this.fieldName, fieldToCompare)
    )
    return this
  }

  build (): FieldValidation[] {
    return this.fieldValidations
  }
}
