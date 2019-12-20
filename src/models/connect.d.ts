import { Action, AnyAction, Reducer, ReducersMapObject } from 'redux';
import {
  Subscription,
  EffectsCommandMap,
  ReducersMapObjectWithEnhancer,
  EffectsMapObject,
  SubscriptionsMapObject,
} from 'dva';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';
import { SettingModelState } from './setting';
import { IUserModelState } from './user';
import { ISeleteModelState } from './select';
import { ILoginModelState } from '@/pages/login/model';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    select?: boolean;
    login?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: IUserModelState;
  login: ILoginModelState;
  select: ISeleteModelState;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectState) => T) => T },
) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Omit<Partial<RouterTypes<Route, T>>, 'location'> {
  loading?: Loading;
  dispatch?: Dispatch;
  location?: Location & {
    query: any;
    state: any;
  };
}

export interface Model<T> {
  namespace: string;
  state?: T;
  reducers?: ReducersMapObject | ReducersMapObjectWithEnhancer;
  effects?: EffectsMapObject;
  subscriptions?: SubscriptionsMapObject;
}

export { Reducer, Action, AnyAction, Subscription };

export { GlobalModelState, SettingModelState };
