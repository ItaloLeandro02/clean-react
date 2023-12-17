import React, { useEffect, useState } from 'react'
import Styles from './survey-list-styles.scss'
import { Header, Footer } from '@/presentation/components'
import { SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
import { type LoadSurveyList } from '@/domain/usecases'
import { type SurveyModel } from '@/domain/models'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })
  useEffect(() => {
    loadSurveyList.loadAll()
      .then((surveys) => { setState({ ...state, surveys }) })
      .catch((error) => { setState({ ...state, error: error.message }) })
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        { state.error
          ? <>
            <div className={Styles.errorWrap}>
              <span data-testid="error">{state.error}</span>
              <button>Reload</button>
            </div>
          </>
          : <ul data-testid="survey-list">
            { state.surveys.length
              ? state.surveys.map(survey => <SurveyItem key={survey.id} survey={survey} />)
              : <SurveyItemEmpty />
            }
          </ul>
        }
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
