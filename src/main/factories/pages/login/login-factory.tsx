import React from 'react'
import { Login } from '@/presentation/pages'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { ValidationComposite, ValidationBuilder } from '@/validation/validators'
import { RegexEmailValidator } from '@/infra/email-validator/regex-email-validator/regex-email-validator'

export const makeLogin: React.FC = () => {
  const url = 'http://localhost:5050/api/login'
  const axiosHppClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHppClient)
  const emailValidator = new RegexEmailValidator()
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email(emailValidator).build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite} />
  )
}
