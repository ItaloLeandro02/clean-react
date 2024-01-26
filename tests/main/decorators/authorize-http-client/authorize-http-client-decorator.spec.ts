import { faker } from '@faker-js/faker'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { GetStorageSpy, HttpClientSpy, mockRequest } from '@/data/test'
import { HttpRequest } from '@/data/protocols/http'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  getStorageSpy: GetStorageSpy
  httpClientSpy: HttpClientSpy
  sut: AuthorizeHttpClientDecorator
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpClientSpy = new HttpClientSpy()
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy)

  return {
    sut,
    getStorageSpy,
    httpClientSpy
  }
}

describe('AuthorizeHttpClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.request(mockRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  test('Should not add headers if GetStorage is invalid', async () => {
    const { sut, httpClientSpy } = makeSut()
    const data: HttpRequest = {
      url: faker.internet.url(),
      method: faker.helpers.arrayElement(['get', 'post', 'put', 'delete'])
    }
    await sut.request(data)
    expect(httpClientSpy.url).toBe(data.url)
    expect(httpClientSpy.headers).toEqual(data.headers)
    expect(httpClientSpy.method).toEqual(data.method)
  })

  test('Should add headers to HttpClient', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const data: HttpRequest = {
      url: faker.internet.url(),
      method: faker.helpers.arrayElement(['get', 'post', 'put', 'delete'])
    }
    await sut.request(data)
    expect(httpClientSpy.url).toBe(data.url)
    expect(httpClientSpy.method).toBe(data.method)
    expect(httpClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('Should merge headers to HttpClient', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const field = faker.lorem.word()
    const data: HttpRequest = {
      url: faker.internet.url(),
      method: faker.helpers.arrayElement(['get', 'post', 'put', 'delete']),
      headers: {
        field
      }
    }
    await sut.request(data)
    expect(httpClientSpy.url).toBe(data.url)
    expect(httpClientSpy.method).toBe(data.method)
    expect(httpClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('Should return the same result as HttpClient', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.body = mockAccountModel()
    const httpReponse = await sut.request(mockRequest())
    expect(httpReponse).toBe(httpClientSpy.response)
  })
})
