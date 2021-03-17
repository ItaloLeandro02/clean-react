import faker from 'faker'
import 'jest-localstorage-mock'
import { cleanup } from '@testing-library/react'
import { LocalStorageAdpater } from './local-storage-adapter'

const makeSut = (): LocalStorageAdpater => new LocalStorageAdpater()

describe('LocalStorageAdapter', () => {
  afterEach(cleanup)
  beforeEach(() => localStorage.clear())

  test('Should call LocalStorage with correct values',async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.word()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
