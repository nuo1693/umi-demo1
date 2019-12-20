import request from '@/utils/request';

export async function getEnterpriseSelect(params: any) {
  return request('/client/getEnterpriseSelect', {
    params,
  });
}

export async function getRoleSelect(params: any) {
  return request('/client/getRoleSelect', {
    params,
  });
}

export async function getInstallCitySelect(params: any) {
  return request('/client/getInstallCitySelect');
}

export async function getOuterEnterpriseSelect(params: any) {
  return request('/client/getOuterEnterpriseSelect', {
    params,
  });
}

export async function getAllOuterEnterpriseSelect(params: any) {
  return request('/client/getAllOuterEnterpriseSelect', {
    params,
  });
}

export async function getCarInstallCitySelect(params: any) {
  return request('/client/getCarInstallCityList', {
    params,
  });
}

export async function getAlarmTypeList(params: any) {
  return request('/client/getAlarmTypeList', {
    params,
  });
}
