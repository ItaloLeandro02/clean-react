import faker from 'faker'
import 'jest-localstorage-mock'
import { cleanup } from '@testing-library/react'
import { LocalStorageAdpater } from './local-storage-adapter'

describe('LocalStorageAdapter', () => {
  afterEach(cleanup)
  beforeEach(() => localStorage.clear())

  test('Should call LocalStorage with correct values',async () => {
    const sut = new LocalStorageAdpater()
    const key = faker.database.column()
    const value = faker.random.word()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
