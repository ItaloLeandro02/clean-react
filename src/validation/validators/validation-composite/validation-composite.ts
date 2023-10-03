import type { Validation } from '@/presentation/protocols/validation'
import type { FieldValidation } from '@/validation/protocols'

export class ValidationComposite implements Validation {
  private constructor (private readonly fieldValidators: FieldValidation[]) {}

  static build (fieldValidators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(fieldValidators)
  }

  validate (fieldName: string, fieldValue: string): string {
    const validators = this.fieldValidators.filter(({ field }) => field === fieldName)
    for (const validator of validators) {
      const error = validator.validate(fieldValue)
      if (error) {
        return error.message
      }
    }
  }
}