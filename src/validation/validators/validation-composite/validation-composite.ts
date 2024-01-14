import { Validation } from '@/presentation/protocols/validation'
import { FieldValidation } from '@/validation/protocols'

export class ValidationComposite implements Validation {
  private constructor (private readonly fieldValidators: FieldValidation[]) {}

  static build (fieldValidators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(fieldValidators)
  }

  validate (fieldName: string, input: object): string {
    const validators = this.fieldValidators.filter(({ field }) => field === fieldName)
    for (const validator of validators) {
      const error = validator.validate(input)
      if (error) {
        return error.message
      }
    }
  }
}
