import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import Styles from './login-styles.scss'
import { Footer, LoginHeader, currentAccountState } from '@/presentation/components'
import { FormStatus, Input, loginState, SubmitButton } from '@/presentation/pages/login/components'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const navigate = useNavigate()
  const resetLoginState = useResetRecoilState(loginState)
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const [state, setState] = useRecoilState(loginState)
  let isLoading = false

  const validate = (field: string): void => {
    const formData = { email: state.email, password: state.password }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (isLoading || state.isLoading || state.isFormInvalid) {
        return
      }
      isLoading = true
      setState({ ...state, isLoading })
      const account = await authentication.auth({ email: state.email, password: state.password })
      setCurrentAccount(account)
      navigate('/', { replace: true })
    } catch (error) {
      isLoading = false
      setState({ ...state, isLoading, mainError: error.message })
    }
  }

  useEffect(() => { resetLoginState() }, [])
  useEffect(() => { validate('email') }, [state.email])
  useEffect(() => { validate('password') }, [state.password])

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder='Digite seu e-mail' />
        <Input type="password" name="password" placeholder='Digite sua senha' />
        <SubmitButton text="Entrar" />
        <Link data-testid="signup-link" to="/signup" className={Styles.link}>Criar conta</Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login
