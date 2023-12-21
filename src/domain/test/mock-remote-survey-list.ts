import { faker } from '@faker-js/faker'
import { type RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list'

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.string.uuid(),
  question: faker.lorem.words(10),
  date: faker.date.recent().toISOString(),
  didAnswer: faker.datatype.boolean()
})

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => ([
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel()
])
