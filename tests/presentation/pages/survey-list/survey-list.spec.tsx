import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { RouteObject, createMemoryRouter } from 'react-router-dom'
import { disableFetchMocks } from 'jest-fetch-mock'
import { SurveyList } from '@/presentation/pages'
import { AccountModel } from '@/domain/models'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { RouterType, renderWithMemoryRouter } from '@/tests/presentation/mocks'
import { LoadSurveyListSpy } from '@/tests/domain/mocks'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  setCurrentAccountMock: (account: AccountModel) => void
  router: RouterType
}
type MakeRouterParams = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeRouter = ({ loadSurveyListSpy }: MakeRouterParams): RouterType => {
  const routes: RouteObject[] = [{
    path: '/',
    element: <SurveyList loadSurveyList={loadSurveyListSpy} />
  }, {
    path: '/login',
    element: <h2>Login</h2>
  }]
  return createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0
  })
}
const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const router = makeRouter({ loadSurveyListSpy })
  const { setCurrentAccountMock } = renderWithMemoryRouter({ router })
  return {
    loadSurveyListSpy,
    router,
    setCurrentAccountMock
  }
}

describe('SurveyList Component', () => {
  beforeEach(() => {
    disableFetchMocks()
  })

  test('Should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    await waitFor(() => {
      expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    })
  })

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  test('Should render SurveyItems on sucess', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => {
      expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
      expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    })
  })

  test('Should render error on UnexpectedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)
    await waitFor(() => {
      expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
      expect(screen.getByTestId('error')).toHaveTextContent(error.message)
    })
  })

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
    const { router, setCurrentAccountMock } = makeSut(loadSurveyListSpy)
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(router.state.location.pathname).toBe('/login')
      expect(router.state.historyAction).toBe('REPLACE')
    })
  })

  test('Should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadSurveyListSpy)
    await waitFor(() => {
      fireEvent.click(screen.queryByTestId('reload'))
      expect(loadSurveyListSpy.callsCount).toBe(1)
    })
  })
})
