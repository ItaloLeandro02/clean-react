import React from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presentation/components'

type Props = {
  state: any
}

const FormStatusBase: React.FC<Props> = ({ state }: Props) => {
  const { isLoading, mainError } = state

  return (
    <div data-testid='error-wrap' className={Styles.errorWrap}>
      { isLoading && <Spinner className={Styles.spinner}/> }
      { mainError && <span data-testid='main-error' className={Styles.error}>{ mainError }</span> }
    </div>
  )
}

export default FormStatusBase
