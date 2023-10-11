import { faker } from '@faker-js/faker'
import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token'
import { SetStorageMock } from '@/data/test'

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
})
