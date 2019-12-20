// import { stringify } from 'qs';
// import { getPageQuery } from '@/utils/utils';
import { Model, AnyAction } from './connect.d';
import { setAccountPassword } from '@/services/login';

export type UserAuthorityType = undefined | string[];

export interface CurrentUser {
  user_name?: string;
  avatar?: string;
  authority?: UserAuthorityType;
  is_first?: boolean;
}

export interface PrevInfo {
  last_url?: string;
  last_params?: any;
  last_state?: any;
}

export interface IUserModelState {
  currentUser?: CurrentUser;
  prevInfo?: PrevInfo;
}

export function getCurrentUser(): CurrentUser | undefined {
  const user = localStorage.getItem('currentuser');
  if (user) {
    return JSON.parse(user);
  }
  return undefined;
}

export function setCurrentUser(user: CurrentUser) {
  if (user) {
    localStorage.setItem('currentuser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentuser');
  }
}

const model: Model<IUserModelState> = {
  namespace: 'user',

  state: {
    currentUser: getCurrentUser(),
    prevInfo: {},
  },

  effects: {
    *logout(_, { put }) {
      yield put({ type: 'saveCurrentUser', payload: {} });
    },
    *setAccountPassword({ payload = {}, callback }, { call }) {
      const res = yield call(setAccountPassword, payload.body);
      if (typeof callback === 'function') {
        callback(res);
      }
    },
  },

  reducers: {
    save(state, { payload }: AnyAction) {
      return { ...state, ...payload };
    },
    saveCurrentUser(state, { payload }: AnyAction) {
      setCurrentUser(payload.currentUser);
      return {
        ...state,
        currentUser: payload.currentUser,
      };
    },
    savePrevInfo(state, { payload }: AnyAction) {
      return { ...state, ...payload };
    },
  },
};

export default model;
