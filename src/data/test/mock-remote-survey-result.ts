import { faker } from '@faker-js/faker'
import { type RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result'

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => ({
  question: faker.lorem.words(),
  date: faker.date.recent().toISOString(),
  answers: [{
    answer: faker.lorem.words(),
    count: faker.number.int(),
    percent: faker.number.int(100),
    image: faker.internet.url()
  }, {
    answer: faker.lorem.words(),
    count: faker.number.int(),
    percent: faker.number.int(100)
  }]
})
