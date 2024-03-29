import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter/local-storage-adapter'
import { mockAccountModel } from '@/tests/domain/mocks'

jest.mock('@/infra/cache/local-storage-adapter/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  test('Should call LocalStorageAdapter.get with correct values', () => {
    const account = mockAccountModel()
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(account)
    const result = getCurrentAccountAdapter()
    expect(getSpy).toHaveBeenCalledWith('account')
    expect(account).toEqual(result)
  })
})
