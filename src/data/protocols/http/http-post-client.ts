export type HttpPostParams = {
  url: string
}
export interface HttpPostClient {
  post: (data: HttpPostParams) => Promise<void>
}
