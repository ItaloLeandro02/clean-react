import { atom } from 'recoil'
import { AccountModel } from '@/domain/models'

export const currentAccountState = atom({
  key: 'currentAccountState',
  default: {
    setCurrentAccount: null as (account: AccountModel) => void,
    getCurrentAccount: null as () => AccountModel
  }
})
