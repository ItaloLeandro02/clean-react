import React, { useRef } from 'react'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
> & {
  state: any
  setState: any
  name?: string
  placeholder?: string
}

const InputBase: React.FC<Props> = ({ state, setState, ...props }: Props) => {
  const inputRef = useRef<HTMLInputElement>()
  const error = state[`${props.name}Error`]
  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => setState({
    ...state,
    [event.currentTarget.name]: event.currentTarget.value
  })
  const labelClick = (): void => { inputRef.current.focus() }

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        ref={inputRef}
        placeholder=""
        title={error}
        data-testid={props.name}
        onChange={handleChange}
      />
      <label
        data-testid={`${props.name}-label`}
        title={error}
        onClick={labelClick}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export default InputBase
