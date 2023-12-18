import React, { useContext } from 'react'
import Styles from './styles-error.scss'
import { SurveyContext } from '@/presentation/pages/survey-list/components'

export const Error: React.FC = () => {
  const { state, setState } = useContext(SurveyContext)
  const reload = (): void => {
    setState({ surveys: [], error: '', reload: !state.reload })
  }
  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{state.error}</span>
      <button data-testid="reload" onClick={reload}>Try again</button>
    </div>
  )
}

export default Error
