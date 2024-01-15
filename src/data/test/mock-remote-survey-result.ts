import { faker } from '@faker-js/faker'
import { RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result'

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => ({
  question: faker.lorem.words(),
  date: faker.date.recent().toISOString(),
  answers: [{
    answer: faker.lorem.words(),
    count: faker.number.int(),
    percent: faker.number.int(100),
    image: faker.internet.url(),
    isCurrentAccountAnswer: faker.datatype.boolean()
  }, {
    answer: faker.lorem.words(),
    count: faker.number.int(),
    percent: faker.number.int(100),
    isCurrentAccountAnswer: faker.datatype.boolean()
  }]
})
