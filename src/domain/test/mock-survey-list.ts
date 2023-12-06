import { faker } from '@faker-js/faker'
import { type SurveyModel } from '@/domain/models'

export const mockSurveyList = (): SurveyModel[] => ([{
  id: faker.string.uuid(),
  question: faker.lorem.words(10),
  answers: [{
    answer: faker.lorem.words(5),
    image: faker.internet.url()
  }, {
    answer: faker.lorem.words(4)
  }],
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean()
}])
