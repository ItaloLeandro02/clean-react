import { faker } from '@faker-js/faker'
import { type GetStorage } from '@/data/protocols/cache'

export class GetStorageSpy implements GetStorage {
  key: string
  value: any = faker.lorem.word()

  get (key: string): any {
    this.key = key
    return this.value
  }
}
