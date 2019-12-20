import request from '@/utils/request';

export async function login(params: {}) {
  return request('/v1/login', {
    method: 'post',
    data: params,
  });
}

export async function getCaptcha(params: any) {
  return request('/v1/getCaptcha', { params });
}

export async function checkCaptcha(params: any) {
  return request('/v1/checkCaptcha', { method: 'post', data: params });
}

export async function setAccountPassword(params: any) {
  return request('/v1/setAccountPassword', { method: 'put', data: params });
}
