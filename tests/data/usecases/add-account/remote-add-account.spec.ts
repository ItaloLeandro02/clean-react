import { faker } from '@faker-js/faker'
import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'
import { HttpClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { mockAddAccountModel, mockAddAccount } from '@/domain/test'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteAddAccount
  httpClientSpy: HttpClientSpy<RemoteAddAccount.Model>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAddAccount.Model>()
  const sut = new RemoteAddAccount(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAddAccount', () => {
  test('Should call HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url()
    const { httpClientSpy, sut } = makeSut(url)
    await sut.add(mockAddAccount())
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
  })

  test('Should call HttpClient with correct body', async () => {
    const { httpClientSpy, sut } = makeSut()
    const params = mockAddAccount()
    await sut.add(params)
    expect(httpClientSpy.body).toEqual(params)
  })

  test('Should throw EmailInUseError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.add(mockAddAccount())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.add(mockAddAccount())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.add(mockAddAccount())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.add(mockAddAccount())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an RemoteAddAccount.Model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockAddAccountModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.add(mockAddAccount())
    expect(account).toEqual(httpResult)
  })
})
