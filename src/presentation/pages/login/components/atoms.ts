import { atom } from 'recoil'

export const loginState = atom({
  key: 'loginState',
  default: {
    isLoading: false,
    email: '',
    isFormInvalid: true,
    emailError: '',
    password: '',
    passwordError: '',
    mainError: ''
  }
})
