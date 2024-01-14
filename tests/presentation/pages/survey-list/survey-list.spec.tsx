import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { RouteObject, RouterProvider, createMemoryRouter } from 'react-router-dom'
import { SurveyList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { LoadSurveyListSpy, mockAccountModel } from '@/domain/test'
import { disableFetchMocks } from 'jest-fetch-mock'

type Router = ReturnType<typeof createMemoryRouter>

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  setCurrentAccountMock: (account: AccountModel) => void
  router: Router
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const routes: RouteObject[] = [{
    path: '/',
    element: <SurveyList loadSurveyList={loadSurveyListSpy} />
  }, {
    path: '/login',
    element: <h2>Login</h2>
  }]
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0
  })
  const setCurrentAccountMock = jest.fn()
  render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
        <RouterProvider router={router} />
      </ApiContext.Provider>
  )
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
