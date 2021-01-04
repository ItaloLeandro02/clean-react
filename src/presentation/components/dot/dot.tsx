import React from 'react'
import Styles from './dot-styles.scss'

type Props = React.HTMLAttributes<HTMLElement>

const Dot: React.FC<Props> = (props: Props) => {
  return (
    <span {...props} className={[Styles.dot, Styles[props.className]].join(' ')}></span>
  )
}

export default Dot
