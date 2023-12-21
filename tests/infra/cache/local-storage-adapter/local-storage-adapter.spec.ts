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

  test('Should call localStorage.setItem with correct values', () => {
    const { sut } = makeSut()
    const key = faker.database.column()
    const value = {
      [faker.database.column()]: faker.lorem.word()
    }
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  test('Should call localStorage.removeItem if calue is null', () => {
    const { sut } = makeSut()
    const key = faker.database.column()
    sut.set(key, undefined)
    expect(localStorage.removeItem).toHaveBeenCalledWith(key)
  })

  test('Should call localStorage.getItem with correct value', () => {
    const { sut } = makeSut()
    const key = faker.database.column()
    const value = { [faker.database.column()]: faker.lorem.words() }
    const getSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
    const obj = sut.get(key)
    expect(obj).toEqual(value)
    expect(getSpy).toHaveBeenCalledWith(key)
  })
})
