import React from 'react'
import { render, screen } from '@testing-library/react'
import { RouteObject, RouterProvider, createMemoryRouter } from 'react-router-dom'
import { SurveyResult } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/test'

const makeSut = (): void => {
  const routes: RouteObject[] = [{
    path: '/surveys',
    element: <SurveyResult />
  }]
  const router = createMemoryRouter(routes, {
    initialEntries: ['/surveys'],
    initialIndex: 0
  })
  render(
      <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
        <RouterProvider router={router} />
      </ApiContext.Provider>
  )
}

describe('SurveyResult Component', () => {
  test('Should present correct initial state', () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })
})
