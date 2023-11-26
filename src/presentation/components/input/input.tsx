import React, { useContext, useRef } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
> & { name?: string, placeholder?: string }

const Input: React.FC<Props> = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>()
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]
  const getTitle = (): string => error || 'Tudo certo!'
  const getStatus = (): string => error ? '🔴' : '🟢'
  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => setState({
    ...state,
    [event.currentTarget.name]: event.currentTarget.value
  })
  const labelClick = (): void => { inputRef.current.focus() }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} ref={inputRef} placeholder="" data-testid={props.name} onChange={handleChange} />
      <label onClick={labelClick}>{ props.placeholder }</label>
      <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
