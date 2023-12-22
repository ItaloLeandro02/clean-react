import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'
import { AccessDeniedError } from '@/domain/errors'

type CallbackType = (error: Error) => void
type ResponseType = CallbackType

export const useErrorHandler = (callback: CallbackType): ResponseType => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(ApiContext)
  return (error: Error) => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined)
      navigate('/login', { replace: true })
      return
    }
    callback(error)
  }
}
