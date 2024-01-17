import { faker } from '@faker-js/faker'
import { LoadSurveyResult } from '@/domain/usecases'

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.lorem.words(10),
  date: faker.date.recent(),
  answers: [{
    answer: faker.lorem.words(),
    image: faker.internet.url(),
    count: faker.number.int(),
    percent: faker.number.int(100),
    isCurrentAccountAnswer: faker.datatype.boolean()
  }, {
    answer: faker.lorem.words(),
    count: faker.number.int(),
    percent: faker.number.int(100),
    isCurrentAccountAnswer: faker.datatype.boolean()
  }]
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0
  surveyResult = mockSurveyResultModel()

  async load (): Promise<LoadSurveyResult.Model> {
    this.callsCount++
    return await Promise.resolve(this.surveyResult)
  }
}
