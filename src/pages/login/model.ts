import { login, getCaptcha, checkCaptcha, setAccountPassword } from '@/services/login';
import { Model, AnyAction } from '@/models/connect';

export interface ILoginModelState {}

const model: Model<ILoginModelState> = {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload = {}, callback }, { call, put }) {
      const res = yield call(login, payload.body);
      if (res.data) {
        yield put({ type: 'user/saveCurrentUser', payload: { currentUser: res.data } });
      }
      if (typeof callback === 'function') {
        callback(res);
      }
    },
    *getCaptcha({ payload = {}, callback }, { call }) {
      const res = yield call(getCaptcha, payload.query);
      if (typeof callback === 'function') {
        callback(res);
      }
    },
    *checkCaptcha({ payload = {}, callback }, { call }) {
      const res = yield call(checkCaptcha, payload.body);
      if (typeof callback === 'function') {
        callback(res);
      }
    },
  },

  reducers: {
    save(state, { payload }: AnyAction) {
      return { ...state, ...payload };
    },
  },
};

export default model;
