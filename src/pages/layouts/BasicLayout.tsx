// 面包屑
import BasicLayout, { BasicLayoutProps, PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import router from 'umi/router';
import Link from 'umi/link';
import Redirect from 'umi/redirect';
import memoizeOne from 'memoize-one';
import lodash from 'lodash';
import { connect } from 'dva';
import { Breadcrumb, message } from 'antd';
import {
  ConnectState,
  Dispatch,
  GlobalModelState,
  SettingModelState,
  Route,
} from '@/models/connect';
import { UserAuthorityType } from '@/models/user';
import HeaderRight from '../header/HeaderRight';
import FirstLogin from '../login/first_login';
import logo from '@/assets/logo.png';
import './BasicLayout.less';
import IconFont from '@/pages/comps/GCIconFont';

interface LayoutProps extends BasicLayoutProps {
  settings: SettingModelState;
  global: GlobalModelState;
  user: ConnectState['user'];
  dispatch: Dispatch;
}

/**
 * @param userAuthority currentuser.authority
 * @param route config.ts routes
 */
const filterRoute = memoizeOne((userAuthority: UserAuthorityType, route: Route) => {
  if (!route) return route;
  // console.log(route);
  const newRoute = lodash.cloneDeep(route);
  const filter = (routeTemp: Route) => {
    if (!routeTemp.routes) return;
    routeTemp.routes.forEach((item: any, index) => {
      // router config authority 有真值 并且 用户权限对象有对应的path key
      if (
        item.authority &&
        (userAuthority === undefined || userAuthority[item.path] === undefined)
      ) {
        routeTemp.routes!.splice(index, 1); // 去除菜单按钮
      } else {
        filter(item);
      }
    });
  };
  filter(newRoute);
  // console.log(newRoute);
  return newRoute;
});

const hasRoute: (path: string, route: Route) => boolean = (path: string, route: Route) => {
  if (route.path === path) return true;
  if (!route.routes) return false;
  return route.routes.some(item => hasRoute(path, item));
};

const Layout: React.FC<LayoutProps> = props => {
  const { dispatch, settings, global, location, route, user, children } = props;

  let childrenTemp = children;

  const havePrevPage = [
    '/car/all/details',
    '/statistics/vehicle/wake_up_time_details',
    '/alarm/basics/details',
  ];

  const isLogin = user.currentUser && user.currentUser.user_name;
  console.log(user);
  console.log(user.currentUser && user.currentUser.user_name);
  console.log(isLogin);
  if (!isLogin) {
    return <Redirect to="/login" />;
  }

  const newRoute = filterRoute(user.currentUser && user.currentUser.authority, route!);

  // console.log(route, newRoute, location.pathname);
  const isHasRoute = hasRoute(location!.pathname!, newRoute);
  if (!isHasRoute) {
    childrenTemp = <div>无权限</div>;
  }

  const isFirst = user.currentUser && user.currentUser.is_first;
  if (isFirst) {
    childrenTemp = <FirstLogin />;
  }

  const pageHeaderRender = (subProps: any) => {
    let breadList: any = [];
    if (subProps.breadcrumb && subProps.breadcrumb.routes) {
      breadList = subProps.breadcrumb.routes;
    }
    return (
      <>
        <Breadcrumb style={{ padding: '10px 24px 4px', display: 'inline-block' }}>
          {breadList.map((item: any) => (
            <Breadcrumb.Item key={item.path}>
              {item.path === subProps.location.pathname ? (
                <span style={{ color: '#333', cursor: 'default' }}>{item.breadcrumbName}</span>
              ) : (
                <a
                  onClick={() => {
                    router.push(item.path);
                  }}
                >
                  {item.breadcrumbName}
                </a>
              )}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        {props.location &&
          props.location.pathname &&
          havePrevPage.indexOf(props.location.pathname) >= 0 && (
            <span
              className="goback"
              onClick={() => {
                if (props.history) {
                  router.push({
                    pathname:
                      props.user.prevInfo && props.user.prevInfo.last_url
                        ? props.user.prevInfo.last_url
                        : '/',
                  });
                }
              }}
            >
              <IconFont type="back" style={{ fontSize: 18 }} />
              返回上一页
            </span>
          )}
      </>
    );
  };

  return (
    <BasicLayout
      logo={logo}
      menuItemRender={(item, dom) => (item.isUrl ? dom : <Link to={item.path}>{dom}</Link>)}
      footerRender={false}
      rightContentRender={(rightProps: any) => <HeaderRight {...rightProps} />}
      route={route}
      {...settings}
    >
      <PageHeaderWrapper pageHeaderRender={pageHeaderRender} title={false}>
        {childrenTemp}
      </PageHeaderWrapper>
      {/* <PageHeaderWrapper title={false}>{childrenTemp}</PageHeaderWrapper> */}
    </BasicLayout>
  );
};

export default connect(({ global, settings, user }: ConnectState) => ({
  global,
  settings,
  user,
}))(Layout);
