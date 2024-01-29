import { http } from './request'
import type { IOptions } from './type'


interface IGetTest {
  version: string,
  wxpayserver: string,
  id: number,
}

export const getTest = async (options: IOptions) => {
  return await http<IGetTest>({
    url: '/charge-app-server/app/app/12',
    method: 'GET',
    data: options?.data,
    header: {
      ...options?.header,
      params: options?.params,
    },
  })
}

