import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import Styles from './signup-styles.scss'
import { Footer, LoginHeader, currentAccountState } from '@/presentation/components'
import { FormStatus, Input, signUpState, SubmitButton } from '@/presentation/pages/signup/components'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const navigate = useNavigate()
  const resetSignUpState = useResetRecoilState(signUpState)
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const [state, setState] = useRecoilState(signUpState)
  let isLoading = false

  const validate = (field: string): void => {
    const formData = { name: state.name, email: state.email, password: state.password, passwordConfirmation: state.passwordConfirmation }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.nameError || !!old.emailError || !!old.passwordError || !!old.passwordConfirmationError }))
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault()
      if (isLoading || state.isLoading || state.isFormInvalid) {
        return
      }
      isLoading = true
      setState({
        ...state,
        isLoading
      })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      setCurrentAccount(account)
      navigate('/', { replace: true })
    } catch (error) {
      isLoading = false
      setState({
        ...state,
        isLoading,
        mainError: error.message
      })
    }
  }

  useEffect(() => { resetSignUpState() }, [])
  useEffect(() => { validate('name') }, [state.name])
  useEffect(() => { validate('email') }, [state.email])
  useEffect(() => { validate('password') }, [state.password])
  useEffect(() => { validate('passwordConfirmation') }, [state.passwordConfirmation])

  return (
    <div className={Styles.signupWrap}>
      <LoginHeader />
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>
        <Input type="text" name="name" placeholder='Digite seu nome' />
        <Input type="email" name="email" placeholder='Digite seu e-mail' />
        <Input type="password" name="password" placeholder='Digite sua senha' />
        <Input type="password" name="passwordConfirmation" placeholder='Repita sua senha' />
        <SubmitButton text="Cadastrar" />
        <Link data-testid="login-link" to="/login" replace className={Styles.link}>Voltar Para Login</Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default SignUp
