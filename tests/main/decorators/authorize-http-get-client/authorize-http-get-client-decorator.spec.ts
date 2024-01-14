import { faker } from '@faker-js/faker'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { GetStorageSpy, HttpGetClientSpy, mockGettRequest } from '@/data/test'
import { HttpGetParams } from '@/data/protocols/http'
import { mockAccountModel } from '@/domain/test'

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
    expect(httpGetClientSpy.headers).toEqual(params.headers)
  })

  test('Should add headers to HttpGetclient', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const params: HttpGetParams = {
      url: faker.internet.url()
    }
    await sut.get(params)
    expect(httpGetClientSpy.url).toBe(params.url)
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('Should merge headers to HttpGetclient', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const field = faker.lorem.word()
    const params: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field
      }
    }
    await sut.get(params)
    expect(httpGetClientSpy.url).toBe(params.url)
    expect(httpGetClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('Should return the same result as HttpGetclient', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.body = mockAccountModel()
    const httpReponse = await sut.get(mockGettRequest())
    expect(httpReponse).toBe(httpGetClientSpy.response)
  })
})
