import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/v1/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/v1/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/v1/notices');
}
