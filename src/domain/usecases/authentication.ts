import { AccountModel } from '@/domain/models/account-model'

export type AuthenthicationParams = {
  email: string
  password: string
}

export interface Authentication {
  auth (params: AuthenthicationParams): Promise<AccountModel>
}
