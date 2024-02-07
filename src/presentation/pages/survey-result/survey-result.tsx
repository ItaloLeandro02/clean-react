import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Styles from './survey-result-styles.scss'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { SurveyResultData, surveyResultState, onSurveyAnswerState } from '@/presentation/pages/survey-result/components'
import { useErrorHandler } from '@/presentation/components/hooks'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const [state, setState] = useRecoilState(surveyResultState)
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)

  let isLoading = false

  const handleError = useErrorHandler((error: Error) => {
    isLoading = false
    setState(old => ({
      ...old,
      isLoading,
      surveyResult: null,
      error: error.message
    }))
  })
  const reload = (): void => {
    isLoading = false
    setState({
      isLoading,
      error: '',
      surveyResult: null as LoadSurveyResult.Model,
      reload: !state.reload
    })
  }
  const onAnswer = (answer: string): void => {
    if (isLoading || state.isLoading) {
      return
    }
    isLoading = true
    setState(old => ({ ...old, isLoading }))
    saveSurveyResult.save({ answer })
      .then((surveyResult) => {
        isLoading = false
        setState(old => ({ ...old, isLoading, surveyResult }))
      })
      .catch(handleError)
  }

  useEffect(() => {
    setOnAnswer({ onAnswer })
  }, [])
  useEffect(() => {
    loadSurveyResult.load()
      .then((surveyResult) => {
        setState(old => ({ ...old, surveyResult }))
      })
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
