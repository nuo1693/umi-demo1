import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import React from 'react';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import { ConnectProps, ConnectState } from '@/models/connect';
import logo from '@/assets/logo.png';
import styles from './UserLayout.less';

interface UserLayoutProps extends ConnectProps {
  user: ConnectState['user'];
}

const UserLayout: React.FC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
    user,
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const isLogin = user.currentUser && user.currentUser.user_name;
  if (isLogin) {
    return <Redirect to="/home" />;
  }

  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        ...props,
      })}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <img alt="logo" className={styles.logo} src={logo} />
            <span className={styles.title}>new</span>
          </div>
          <div className={styles.btm}>{children}</div>
        </div>
        <DefaultFooter
          links={[
            { key: '帮助', title: '帮助', href: '#' },
            { key: '隐私', title: '隐私', href: '#' },
            { key: '条款', title: '条款', href: '#' },
          ]}
        />
      </div>
    </DocumentTitle>
  );
};

export default connect(({ settings, user }: ConnectState) => ({
  user,
  ...settings,
}))(UserLayout);
