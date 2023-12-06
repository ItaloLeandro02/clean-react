import { HttpStatusCode, type HttpGetClient } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { type SurveyModel } from '@/domain/models'
import { type LoadSurveyList } from '@/domain/usecases'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<SurveyModel[]>
  ) {}

  async loadAll (): Promise<SurveyModel[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      default: throw new UnexpectedError()
    }
  }
}
