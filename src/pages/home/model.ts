import { Model, AnyAction } from '../../models/connect.d';
import { getTotalList, getAlarmList, getSurviveList, getInstalledList } from '@/services/home';

export interface IHomeModelState {}

const home: Model<IHomeModelState> = {
  namespace: 'home',

  state: {},

  effects: {
    *getXX({ payload = {}, callback }, { call, put }) {
      const res = yield call(getTotalList, payload.query);
      const { data } = res;
      yield put({
        type: 'save',
        payload: { xxx: data },
      });
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

export default home;
