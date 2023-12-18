import { faker } from '@faker-js/faker'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { GetStorageSpy, HttpGetClientSpy, mockGettRequest } from '@/data/test'
import { type HttpGetParams } from '@/data/protocols/http'

type SutTypes = {
  getStorageSpy: GetStorageSpy
  httpGetClientSpy: HttpGetClientSpy
  sut: AuthorizeHttpClientDecorator
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpGetClientSpy)

  return {
    sut,
    getStorageSpy,
    httpGetClientSpy
  }
}

describe('AuthorizeHttpClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.get(mockGettRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  test('Should not add headers if GetStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const params: HttpGetParams = {
      url: faker.internet.url()
    }
    await sut.get(params)
    expect(httpGetClientSpy.url).toBe(params.url)
    expect(httpGetClientSpy.headers).toBe(params.headers)
  })
})
