import { type LoadSurveyList } from '@/domain/usecases'
import { type SurveyModel } from '@/domain/models'
import { mockSurveyList } from '@/domain/test'

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyList()

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return await Promise.resolve(this.surveys)
  }
}
