import 'jest-localstorage-mock'
import { faker } from '@faker-js/faker'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter/local-storage-adapter'

type SutTypes = {
  sut: LocalStorageAdapter
}

const makeSut = (): SutTypes => {
  const sut = new LocalStorageAdapter()
  return {
    sut
  }
}

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage with correct values', async () => {
    const { sut } = makeSut()
    const key = faker.database.column()
    const value = faker.word.verb()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
