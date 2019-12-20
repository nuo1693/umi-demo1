import { IConfig } from 'umi-types';

const login = {
  name: '登录',
  path: '/login',
  component: './login/login',
};

const forgot = {
  name: '找回密码',
  path: '/login/forgot_password',
  component: './login/forgot_password',
};

const home = {
  name: '首页',
  path: '/home',
  component: './home',
};

const system = {
  name: '系统管理',
  path: '/system',
  routes: [
    {
      name: '报告管理',
      path: '/system/notice',
      component: './system_mgmt/notice',
    },
    {
      name: '日志查询',
      path: '/system/log',
      component: './system_mgmt/log',
    },
    {
      redirect: '/system/notice',
    },
  ],
};

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  define: {
    // "process.env.ENV": process.env.ENV,
    // D_SERVER_URL: 'http://cbs.nnuo.top:3000/mock/17',
  },
  // proxy: {
  //   '/v1': {
  //     target: 'http://172.17.202.121:50030',
  //     changeOrigin: true,
  //   },
  // },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'new',
        dll: true,
        locale: {
          enable: true,
          default: 'zh-CN',
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  disableRedirectHoist: true,
  routes: [
    {
      path: '/',
      routes: [
        {
          path: '/login',
          component: './layouts/UserLayout',
          routes: [login, forgot],
        },
        {
          path: '/',
          component: './layouts/BasicLayout',
          routes: [
            home,
            system,
            {
              redirect: '/home',
            },
          ],
        },
      ],
    },
  ],
  hash: true,
};

export default config;
