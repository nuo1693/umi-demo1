/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend, RequestOptionsInit } from 'umi-request';
import { notification, message } from 'antd';
import CryptoJS, { DecryptedMessage } from 'crypto-js';

interface NewOptionsInit extends RequestOptionsInit {
  headers?: HeadersInit & {
    Authorization?: DecryptedMessage;
  };
}

const codeMessage: { [key: number]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): void => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  parseResponse: false, // 默认true，不对响应数据进行编译(导出时，在拦截器中判断是导出还是请求)
  // credentials: 'include', // 默认请求是否带上cookie
});

function stringToHex(str: string) {
  let val = '';
  for (let i = 0; i < str.length; i += 1) {
    if (val === '') val = str.charCodeAt(i).toString(16);
    else val = `${val},${str.charCodeAt(i).toString(16)}`;
  }
  return val;
}

function add_to_16(value: string) {
  let v = value;
  while (v.length % 16 !== 0) {
    v += '\0';
  }
  return v;
}

request.interceptors.request.use((url, options) => {
  const newOptions: NewOptionsInit = { ...options };
  // if (localStorage.currentuser && JSON.parse(localStorage.currentuser).token) {
  //   const currentuser = JSON.parse(localStorage.currentuser);
  //   let { token } = currentuser;

  //   token = token.replace(/[\r\n]/g, '').replace(/ +/g, '');

  //   const sendToken = CryptoJS.AES.decrypt(
  //     token,
  //     CryptoJS.enc.Utf8.parse(add_to_16('cbs_admin_auth_aes_key')),
  //     { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding },
  //   )
  //     .toString(CryptoJS.enc.Utf8)
  //     .replace(/\0+$/g, '');

  //   if (newOptions && newOptions.headers) {
  //     newOptions.headers.Authorization = sendToken;
  //   }
  // }
  return {
    url: `${url}`,
    // url: `${D_SERVER_URL}${url}`,
    newOptions,
  };
});

request.interceptors.response.use((res, req) => {
  if (res.url.includes('is_export=1')) {
    // 导出不编译，直接返回
    return res;
  }
  return res.json();
});

request.use(async (ctx, next) => {
  await next();
  if (ctx.res && +ctx.res.code === 20302) {
    // g_app在ts中无类型声明，将其忽略
    message.info('登录过期，请重新登录');
    // @ts-ignore
    window.g_app._store.dispatch({
      type: 'user/logout',
    });
  }
});

export default request;
