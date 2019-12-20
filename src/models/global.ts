import { Effect, Reducer, Subscription } from './connect.d';

export interface GlobalModelState {
  collapsed: boolean;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects?: {
    [effect: string]: Effect;
  };
  reducers?: {
    setCollapsed: Reducer<GlobalModelState>;
  };
  subscriptions?: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
  },

  reducers: {
    setCollapsed(state = { collapsed: true }, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
  },
};

export default GlobalModel;
