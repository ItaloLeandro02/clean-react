import { HttpClient } from '@/data/protocols/http'
import { RemoteSurveyResultModel } from '@/data/models'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save (): Promise<LoadSurveyResult.Model> {
    await this.httpClient.request({
      url: this.url,
      method: 'put'
    })
    return null
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}
