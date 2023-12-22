import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'

type ResponseType = () => void

export const useLogout = (): ResponseType => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(ApiContext)
  return () => {
    setCurrentAccount(undefined)
    navigate('/login', { replace: true })
  }
}
