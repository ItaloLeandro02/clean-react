import React from 'react'
import { SignUp } from '@/presentation/pages'
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      validation={makeSignUpValidation()}
      addAccount={makeRemoteAddAccount()}
    />
  )
}
