import { parse, stringify } from 'qs';
import moment from 'moment';

export const phoneReg = /^[1]([3-9])[0-9]{9}$/;
export const usernameReg = /^[a-zA-Z][a-zA-Z0-9]{3,19}$/;
export const passwordReg = /^[a-zA-Z0-9]{4,20}/;
export const rolenameReg = /^[^\s]{4,20}$/;
export const outerAccountPasswordReg = /^[\dA-Za-z]{8,12}$/;

export const outerAccountPasswordMsg = '格式：8-12位，英文/数字/英文数字组合';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function Stringify(params: any) {
  return stringify(params, { addQueryPrefix: true });
}

export function formatTimestamp(timestamp: number) {
  return moment.unix(timestamp).format('YYYY-MM-DD HH:mm:ss');
}

export function uniqueString(array: any): any {
  return [...new Set(array)];
}
