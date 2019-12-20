import { getCurrentUser } from '@/models/user';

export function checkAuthority(key: string): boolean {
  if (getCurrentUser() && JSON.stringify(getCurrentUser()!.authority).indexOf(`"${key}"`) > -1) {
    return true;
  }
  return false;
}

export function filterColumns(listArr: any[]): any[] {
  const filter = listArr.filter(item => {
    if (!item.key) {
      return item;
    }
    return checkAuthority(item.key);
  });
  return filter;
}
