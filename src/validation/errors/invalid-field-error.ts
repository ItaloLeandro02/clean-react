export class InvalidFieldValidation extends Error {
  constructor (fieldName: string) {
    super(`Campo ${fieldName} inválido!`)
    this.name = 'InvalidFieldValidation'
  }
}
