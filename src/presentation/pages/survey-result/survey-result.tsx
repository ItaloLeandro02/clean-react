import React, { useState } from 'react'
import FlipMove from 'react-flip-move'
import Styles from './survey-result-styles.scss'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'

const SurveyResult: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>Qual é o seu framework web favorito? Qual é o seu framework web favorito? Qual é o seu framework web favorito?</h2>
            </hgroup>
            <FlipMove className={Styles.answersList}>
              <li>
                <img
                  src="https://www.logo.wine/a/logo/React_(web_framework)/React_(web_framework)-Logo.wine.svg"
                  alt=""
                />
                <span className={Styles.answer}>ReactJs</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li className={Styles.active}>
                <img
                  src="https://www.logo.wine/a/logo/React_(web_framework)/React_(web_framework)-Logo.wine.svg"
                  alt=""
                />
                <span className={Styles.answer}>ReactJs</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li>
                <img
                  src="https://www.logo.wine/a/logo/React_(web_framework)/React_(web_framework)-Logo.wine.svg"
                  alt=""
                />
                <span className={Styles.answer}>ReactJs</span>
                <span className={Styles.percent}>50%</span>
              </li>
            </FlipMove>
            <button>Voltar</button>
          </>
        )}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={() => {}} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
