import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import { type LoadSurveyList } from '@/domain/usecases'
import { type SurveyModel } from '@/domain/models'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount: number = 0

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return []
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
  return { loadSurveyListSpy }
}

describe('SurveyList Component', () => {
  test('Should present 4 empty items on start', () => {
    makeSut()
    const surveyList = screen.queryByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
  })

  test('Should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
