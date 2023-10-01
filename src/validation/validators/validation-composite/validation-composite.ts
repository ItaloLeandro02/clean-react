import type { Validation } from '@/presentation/protocols/validation'

export class CompositeValidation implements Validation {
  validate (fieldName: string, fieldValue: string): string {
    return 'First error message'
  }
}
