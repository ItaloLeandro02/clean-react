import React from 'react'
import { render, screen } from '@testing-library/react'
import { Calendar } from '@/presentation/components'

const makeSut = (date: Date): void => {
  render(<Calendar date={date} />)
}

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    makeSut(new Date('2022-12-17T00:00:00'))
    expect(screen.getByTestId('day')).toHaveTextContent('17')
    expect(screen.getByTestId('month')).toHaveTextContent('dez')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
  })

  test('Should render with correct values', () => {
    makeSut(new Date('2021-11-03T00:00:00'))
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('nov')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })
})