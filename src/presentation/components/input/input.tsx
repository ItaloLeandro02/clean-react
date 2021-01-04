import React from 'react'
import Styles from './input-styles.scss'
import Dot from '@/presentation/components/dot/dot'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.inputWrap}>
      <input {...props}/>
      <span className={Styles.status}>
        <Dot className="danger"/>
      </span>
    </div>
  )
}

export default Input
