import React, { memo } from 'react'
import { useRecoilValue } from 'recoil'
import Styles from './header-styles.scss'
import { Logo, currentAccountState } from '@/presentation/components'
import { useLogout } from '@/presentation/components/hooks'

const Header: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  const logoutHandle = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    logout()
  }
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">
            {getCurrentAccount().name}
          </span>
          <a data-testid="logout" onClick={logoutHandle} href="#">Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
