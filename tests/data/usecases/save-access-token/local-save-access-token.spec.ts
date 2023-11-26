import { faker } from '@faker-js/faker'
import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token'
import { SetStorageMock } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMoSetStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMoSetStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMoSetStorageMock)
  return {
    sut,
    setStorageMoSetStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMoSetStorageMock } = makeSut()
    const accessToken = faker.string.uuid()
    await sut.save(accessToken)
    expect(setStorageMoSetStorageMock.key).toBe('accessToken')
    expect(setStorageMoSetStorageMock.value).toBe(accessToken)
  })

  test('Should throw if SetStorage throws', async () => {
    const { sut, setStorageMoSetStorageMock } = makeSut()
    jest.spyOn(setStorageMoSetStorageMock, 'set').mockRejectedValueOnce(new Error())
    const accessToken = faker.string.uuid()
    const promise = sut.save(accessToken)
    await expect(promise).rejects.toThrowError(new Error())
  })

  test('Should throw if accessToken is falsy', async () => {
    const { sut } = makeSut()
    const promise = sut.save(undefined)
    await expect(promise).rejects.toThrowError(new UnexpectedError())
  })
})
