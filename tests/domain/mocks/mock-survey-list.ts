import { faker } from '@faker-js/faker'
import { LoadSurveyList } from '@/domain/usecases'

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.string.uuid(),
  question: faker.lorem.words(10),
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean()
})

export const mockSurveyList = (): LoadSurveyList.Model[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
])

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyList()

  async loadAll (): Promise<LoadSurveyList.Model[]> {
    this.callsCount++
    return await Promise.resolve(this.surveys)
  }
}
