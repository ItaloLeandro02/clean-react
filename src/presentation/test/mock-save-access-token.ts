import type { UpdateCurrentAccount } from '@/domain/usecases'
import { type AccountModel } from '@/domain/models'

export class UpdateCurrentAccountMock implements UpdateCurrentAccount {
  account: AccountModel

  async save (account: AccountModel): Promise<void> {
    this.account = account
  }
}
