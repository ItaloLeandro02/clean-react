import { faker } from '@faker-js/faker'
import { HttpStatusCode, HttpResponse, HttpClient, HttpMethod, HttpRequest } from '@/data/protocols/http'

export const mockRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.helpers.arrayElement(['post', 'get', 'put', 'delete']),
  headers: { [faker.database.column()]: faker.lorem.words() },
  body: {
    name: faker.person.fullName()
  }
})

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async request (data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.method = data.method
    this.body = data.body
    this.headers = data.headers
    return await Promise.resolve(this.response)
  }
}
