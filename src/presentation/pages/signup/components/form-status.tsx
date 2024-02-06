import React from 'react'
import { useRecoilState } from 'recoil'
import { signUpState } from './atoms'
import { FormStatusBase } from '@/presentation/components'

const FormStatus: React.FC = () => {
  const [state] = useRecoilState(signUpState)
  return (
    <FormStatusBase state={state} />
  )
}

export default FormStatus
