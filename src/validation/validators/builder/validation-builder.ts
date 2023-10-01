import type { EmailValidator, FieldValidation } from '@/validation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation'
import { EmailValidation } from '@/validation/validators/email/email-validation'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly fieldValidations: FieldValidation[]
  ) {}

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required (): ValidationBuilder {
    this.fieldValidations.push(
      new RequiredFieldValidation(this.fieldName)
    )
    return this
  }

  email (emailValidator: EmailValidator): ValidationBuilder {
    this.fieldValidations.push(
      new EmailValidation(this.fieldName, emailValidator)
    )
    return this
  }

  min (length: number): ValidationBuilder {
    this.fieldValidations.push(
      new MinLengthValidation(this.fieldName, length)
    )
    return this
  }

  build (): FieldValidation[] {
    return this.fieldValidations
  }
}
