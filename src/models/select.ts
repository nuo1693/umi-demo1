import {
  getEnterpriseSelect,
  getRoleSelect,
  getInstallCitySelect,
  getOuterEnterpriseSelect,
  getCarInstallCitySelect,
  getAlarmTypeList,
  getAllOuterEnterpriseSelect,
} from '@/services/select';
import { Model, AnyAction } from '@/models/connect';

export interface Iprovince {
  id: number;
  省名: Icity[];
}

export interface Icity {
  id: number;
  name: string;
  pid: number;
}

export interface ISeleteModelState {
  enterprise_select_list: { id: number; name: string }[];
  role_select_list: { id: number; name: string }[];
  city_select_list: Iprovince[];
  outer_enterprise_select_list: { id: number; name: string }[];
  car_install_city_select_list: any;
  alarm_type_select_list: any;
}

const model: Model<ISeleteModelState> = {
  namespace: 'select',

  state: {
    enterprise_select_list: [],
    role_select_list: [],
    city_select_list: [],
    outer_enterprise_select_list: [],
    car_install_city_select_list: [],
    alarm_type_select_list: [],
  },

  effects: {
    *getEnterpriseSelect({ payload = {} }, { call, put }) {
      const res = yield call(getEnterpriseSelect, payload.query);
      if (res.data) {
        yield put({
          type: 'save',
          payload: {
            enterprise_select_list: res.data.list,
          },
        });
      }
    },
    *getRoleSelect({ payload = {} }, { call, put }) {
      const res = yield call(getRoleSelect, payload.query);
      if (res.data) {
        yield put({
          type: 'save',
          payload: {
            role_select_list: res.data.list,
          },
        });
      }
    },
    *getInstallCitySelect(_, { call, put }) {
      const res = yield call(getInstallCitySelect);
      const list = res && res.data;
      if (res.data) {
        yield put({
          type: 'save',
          payload: {
            city_select_list: list,
          },
        });
      }
    },
    // 仅返回状态启用的委外公司数据
    *getOuterEnterpriseSelect({ payload = {} }, { call, put }) {
      const res = yield call(getOuterEnterpriseSelect, payload.query);
      if (res.data) {
        yield put({
          type: 'save',
          payload: {
            outer_enterprise_select_list: res.data.list,
          },
        });
      }
    },
    // 返回所有状态的委外公司数据
    *getAllOuterEnterpriseSelect({ payload = {} }, { call, put }) {
      const res = yield call(getAllOuterEnterpriseSelect, payload.query);
      if (res.data) {
        yield put({
          type: 'save',
          payload: {
            outer_enterprise_select_list: res.data.list,
          },
        });
      }
    },
    *getCarInstallCitySelect(_, { call, put }) {
      const res = yield call(getCarInstallCitySelect);
      const list = res && res.data;
      if (res.data) {
        yield put({
          type: 'save',
          payload: {
            car_install_city_select_list: list.list,
          },
        });
      }
    },
    *getAlarmTypeList(_, { call, put }) {
      const res = yield call(getAlarmTypeList);
      const list = res && res.data;
      if (res.data) {
        yield put({
          type: 'save',
          payload: {
            alarm_type_select_list: list.list,
          },
        });
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
