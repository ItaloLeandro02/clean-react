import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { currentAccountState } from '@/presentation/components'

type ResponseType = () => void

export const useLogout = (): ResponseType => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  return () => {
    setCurrentAccount(undefined)
    navigate('/login', { replace: true })
  }
}
