import React from 'react'
import { RouteObject, createMemoryRouter } from 'react-router-dom'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { disableFetchMocks } from 'jest-fetch-mock'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { IconName } from '@/presentation/components'
import { RouterType, renderWithMemoryRouter } from '@/presentation/test'
import { mockSurveyModel } from '@/domain/test'
import { LoadSurveyList } from '@/domain/usecases'

type SutTypes = {
  router: RouterType
}
type MakeRouterParams = {
  survey: LoadSurveyList.Model
}

const makeRouter = ({ survey }: MakeRouterParams): RouterType => {
  const routes: RouteObject[] = [{
    path: '/',
    element: <SurveyItem survey={survey} />
  }, {
    path: 'surveys/:id',
    element: <h2>Survey Result</h2>
  }]
  return createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0
  })
}
const makeSut = (survey: LoadSurveyList.Model): SutTypes => {
  const router = makeRouter({ survey })
  renderWithMemoryRouter({ router })
  return {
    router
  }
}

describe('SurveyItem Component', () => {
  beforeEach(() => {
    disableFetchMocks()
  })

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2022-12-17T00:00:00')
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveAttribute('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('17')
    expect(screen.getByTestId('month')).toHaveTextContent('dez')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
  })

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2021-11-03T00:00:00')
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveAttribute('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('nov')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })

  test('Should go to SurveyResult', async () => {
    const survey = mockSurveyModel()
    const { router } = makeSut(survey)
    fireEvent.click(screen.queryByTestId('link'))
    await waitFor(() => {
      expect(router.state.location.pathname).toBe(`/surveys/${survey.id}`)
      expect(router.state.historyAction).toBe('PUSH')
    })
  })
})
