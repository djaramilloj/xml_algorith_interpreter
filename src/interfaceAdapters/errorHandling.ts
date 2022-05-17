export enum HttpStatusCode {
  OK = 'OK',
  BAD_REQUEST = 'BAD REQUEST',
  INTERNAL_SERVER = 'INTERNAL ERROR'
}

export class ExceptionParsingAlgorithm extends Error {
  options
  constructor(name: HttpStatusCode, message: string, options?: any) {
    super(message)
    this.name = name
    this.options = options

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this)
    }
  }
}

export class ExceptionDateFormating extends Error {
  options
  constructor(name: HttpStatusCode, message: string, options?: any) {
    super(message)
    this.name = name
    this.options = options

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this)
    }
  }
}