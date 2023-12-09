import { LocalUpdateCurrentAccount } from '@/data/usecases/update-current-account/local-update-current-account'
import { SetStorageMock } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  sut: LocalUpdateCurrentAccount
  setStorageMoSetStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMoSetStorageMock = new SetStorageMock()
  const sut = new LocalUpdateCurrentAccount(setStorageMoSetStorageMock)
  return {
    sut,
    setStorageMoSetStorageMock
  }
}

describe('LocalUpdateCurrentAccount', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMoSetStorageMock } = makeSut()
    const account = mockAccountModel()
    await sut.save(account)
    expect(setStorageMoSetStorageMock.key).toBe('account')
    expect(setStorageMoSetStorageMock.value).toBe(JSON.stringify(account))
  })

  test('Should throw if SetStorage throws', async () => {
    const { sut, setStorageMoSetStorageMock } = makeSut()
    jest.spyOn(setStorageMoSetStorageMock, 'set').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.save(mockAccountModel())
    await expect(promise).rejects.toThrowError(new Error())
  })

  test('Should throw if accessToken is falsy', async () => {
    const { sut } = makeSut()
    const promise = sut.save(undefined)
    await expect(promise).rejects.toThrowError(new UnexpectedError())
  })
})
