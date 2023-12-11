import { makeLocalStorageAdapter } from '@/main/factories/cache'
import { type AccountModel } from '@/domain/models'
import { UnexpectedError } from '@/domain/errors'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError()
  }
  makeLocalStorageAdapter().set('account', account)
}
