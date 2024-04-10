interface IRequestData<T> {
  status: number,
  msg: string,
  total?: number,
  data: T
}

interface IPayMe {
  create(apiKey: string, options: {
    testMode: boolean
  }): Promise<any>
}
const PayMe: IPayMe;
