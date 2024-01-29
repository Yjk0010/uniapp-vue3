interface IRequestData<T> {
  status: number,
  msg: string,
  total?: number,
  data: T
}