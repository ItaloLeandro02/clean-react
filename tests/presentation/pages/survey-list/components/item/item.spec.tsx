import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { IconName } from '@/presentation/components'
import { mockSurveyModel } from '@/domain/test'
import { type LoadSurveyList } from '@/domain/usecases'

const makeSut = (survey: LoadSurveyList.Model): void => {
  render(<SurveyItem survey={survey} />)
}

describe('SurveyItem Component', () => {
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
})
