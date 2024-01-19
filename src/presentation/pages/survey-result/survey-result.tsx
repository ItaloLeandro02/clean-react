import React, { useEffect, useState } from 'react'
import Styles from './survey-result-styles.scss'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/components/hooks'
import { SurveyResultData } from './components'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, error: error.message })
  })
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })
  const reload = (): void => {
    setState({
      isLoading: false,
      error: '',
      surveyResult: null as LoadSurveyResult.Model,
      reload: !state.reload
    })
  }

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) => {
        setState({ ...state, surveyResult })
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
