import { useLogout } from '@/presentation/components/hooks'
import { AccessDeniedError } from '@/domain/errors'

type CallbackType = (error: Error) => void
type ResponseType = CallbackType

export const useErrorHandler = (callback: CallbackType): ResponseType => {
  const logout = useLogout()
  return (error: Error) => {
    if (error instanceof AccessDeniedError) {
      logout()
      return
    }
    callback(error)
  }
}
