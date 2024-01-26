import axios from 'axios'
import { faker } from '@faker-js/faker'

export const mockHttpResponse = (): any => ({
  data: { name: faker.person.fullName() },
  status: faker.number.int()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse)
  return mockedAxios
}
