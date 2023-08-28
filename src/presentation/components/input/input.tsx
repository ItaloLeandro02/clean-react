import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
> & { name?: string }

const Input: React.FC<Props> = (props: Props) => {
  const { state } = useContext(Context)
  const error = state[`${props.name}Error`]
  const getTitle = (): string => error
  const getStatus = (): string => '🔴'
  return (
    <div className={Styles.inputWrap}>
      <input {...props} />
      <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
