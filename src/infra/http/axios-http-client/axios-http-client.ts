import axios from 'axios'
import { type AxiosResponse } from 'axios'
import { type HttpPostClient, type HttpPostParams, type HttpResponse } from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient {
  async post (params: HttpPostParams): Promise<HttpResponse> {
    let httpResponse: AxiosResponse
    try {
      httpResponse = await axios.post(params.url, params.body)
    } catch (error) {
      httpResponse = error.response
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
