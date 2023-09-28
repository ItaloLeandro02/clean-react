export class RequiredFieldValidationError extends Error {
  constructor () {
    super('Campo obrigatório')
    this.name = 'RequiredFieldValidationError'
  }
}
