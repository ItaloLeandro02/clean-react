import type { Validation } from '@/presentation/protocols/validation'
import type { FieldValidation } from '@/validation/protocols'

export class CompositeValidation implements Validation {
  constructor (private readonly fieldValidators: FieldValidation[]) {}

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
