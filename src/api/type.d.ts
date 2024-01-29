export declare interface IResponse<T = any> {
  code: string | number
  msg: string
  total_num?: number | void
  data: T extends any ? T : T & any
}

export declare interface IRequest<T = any> {
  [string]: any
}

export declare interface IOptions {
  params?: IRequest
  data?: IRequest
  header?: IRequest
}
