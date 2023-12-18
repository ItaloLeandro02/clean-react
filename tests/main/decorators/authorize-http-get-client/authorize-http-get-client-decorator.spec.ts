import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { GetStorageSpy, mockGettRequest } from '@/data/test'

describe('AuthorizeHttpClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const getStorageSpy = new GetStorageSpy()
    const sut = new AuthorizeHttpClientDecorator(getStorageSpy)
    await sut.get(mockGettRequest())
    expect(getStorageSpy.key).toBe('account')
  })
})
