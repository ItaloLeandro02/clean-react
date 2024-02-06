import React from 'react'
import { useRecoilState } from 'recoil'
import { loginState } from './atoms'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const [state] = useRecoilState(loginState)
  return (
    <button data-testid="submit" disabled={state.isFormInvalid} type="submit">{ text }</button>
  )
}

export default SubmitButton
