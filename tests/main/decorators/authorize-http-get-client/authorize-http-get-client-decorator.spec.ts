import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { GetStorageSpy, mockGettRequest } from '@/data/test'

type SutTypes = {
  getStorageSpy: GetStorageSpy
  sut: AuthorizeHttpClientDecorator
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy)

  return {
    sut,
    getStorageSpy
  }
}

describe('AuthorizeHttpClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.get(mockGettRequest())
    expect(getStorageSpy.key).toBe('account')
  })
})
