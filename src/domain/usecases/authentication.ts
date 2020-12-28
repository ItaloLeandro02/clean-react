import { AccountModel } from '../models/account-model'

type AuthenthicationParams = {
  email: string
  password: string
}

export interface Authentication {
  auth (params: AuthenthicationParams): Promise<AccountModel>
}
