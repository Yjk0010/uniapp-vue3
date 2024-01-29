const baseUrl: string = import.meta.env.VITE_APP_API;
const timeout = 10000;


const httpInterceptor = {
  // 请求拦截器
  async invoke(options: UniApp.RequestOptions) {

    // args.url = baseUrl + args.url;
    if (options.url && options.url.indexOf('http') !== 0) {
      options.url = baseUrl + options.url;
    }
    if (options.header.params) {
      options.url = options.url + '?' + Object.keys(options.header.params).map(key => `${key}=${options.header.params[key]}`).join('&');
      delete options.header.params;
    }
    // 超时时间
    options.timeout = timeout;
    return options;
  },
}



uni.addInterceptor('request', httpInterceptor);

export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<IRequestData<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const data = res.data as IRequestData<T> || {}
          if (data.status === 403) {
            uni.showToast({
              title: '登录过期，请重新登录',
              icon: 'none',
              duration: 2000,
            });
            reject(data);
          } else {
            resolve(data)
          }
        } else {
          const data = res.data as IRequestData<T> || {}
          const error: IRequestData<null> = {
            status: res.statusCode,
            msg: data.msg || '请求失败',
            data: null
          }
          reject(error);
        }
      },
      fail(err) {
        const error: IRequestData<null> = {
          status: 500,
          msg: err.errMsg,
          data: null
        }
        reject(error);
      },
    });
  });
}
