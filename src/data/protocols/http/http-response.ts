export enum HttpStatusCode {
  noContent = 204,
  unauthorized = 401
}

export type HttpResponse = {
  statuCode: HttpStatusCode
  body?: any
}
