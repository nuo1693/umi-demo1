import request from '@/utils/request';

export async function getTotalList(params: any): Promise<any> {
  return request('/v1/getTotalList', { params });
}

export async function getAlarmList(params: any): Promise<any> {
  return request('/v1/getAlarmList', { params });
}

export async function getSurviveList(params: any): Promise<any> {
  return request('/v1/getSurviveList', { method: 'get', params });
}

export async function getInstalledList(params: any): Promise<any> {
  return request('/v1/getInstalledList', {
    method: 'post',
    data: params,
  });
}
