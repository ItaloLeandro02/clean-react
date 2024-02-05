import React from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './result-styles.scss'
import { SurveyResultAnswer } from '@/presentation/pages/survey-result/components'
import { Calendar } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const navigate = useNavigate()
  const back = (): void => { navigate(-1) }

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <ul data-testid="answers" className={Styles.answersList}>
        {surveyResult.answers.map((answer) => <SurveyResultAnswer key={answer.answer} answer={answer} />)}
      </ul>
      <button data-testid="back-button" className={Styles.backButton} onClick={back}>Voltar</button>
    </>
  )
}

export default Result
