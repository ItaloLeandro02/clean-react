import React from 'react'
import FlipMove from 'react-flip-move'
import Styles from './survey-result-styles.scss'
import { Calendar, Footer, Header, Loading } from '@/presentation/components'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <hgroup>
          <Calendar date={new Date()} className={Styles.calendarWrap} />
          <h2>Qual é o seu framework web favorito</h2>
        </hgroup>
        <FlipMove className={Styles.answersList}>
          <li>
            <img src="https://www.logo.wine/a/logo/React_(web_framework)/React_(web_framework)-Logo.wine.svg" alt="" />
            <span className={Styles.answer}>ReactJs</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li className={Styles.active}>
            <img src="https://www.logo.wine/a/logo/React_(web_framework)/React_(web_framework)-Logo.wine.svg" alt="" />
            <span className={Styles.answer}>ReactJs</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li>
            <img src="https://www.logo.wine/a/logo/React_(web_framework)/React_(web_framework)-Logo.wine.svg" alt="" />
            <span className={Styles.answer}>ReactJs</span>
            <span className={Styles.percent}>50%</span>
          </li>
        </FlipMove>
        <button>Voltar</button>
        { false && <Loading /> }
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
