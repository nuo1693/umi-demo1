import React from 'react';
// import { Breadcrumb } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { router } from 'umi';
import { connect } from 'dva';
import { ConnectState, ConnectProps } from '@/models/connect';
import AvatarDropdown from './comps/AvatarDropdown';
import styles from './HeaderRight.less';

interface HeaderRightProps extends ConnectProps {
  breadcrumb?: any;
  user: ConnectState['user'];
}

const HeaderRight: React.FC<HeaderRightProps> = props => (
  // const pathComps = props.location!.pathname.split('/').filter(i => i);
  // const breadcrumbItems: React.ReactNode[] = [];
  // pathComps.forEach((item, index) => {
  //   const url = `/${pathComps.slice(0, index + 1).join('/')}`;
  //   if (props.breadcrumb[url]) {
  //     breadcrumbItems.push(
  //       <Breadcrumb.Item key={url}>
  //         <Link to={url}>{props.breadcrumb[url].name}</Link>
  //       </Breadcrumb.Item>,
  //     );
  //   }
  // });
  <div className={styles.header_right}>
    <div className={styles.left}>{/* <Breadcrumb>{breadcrumbItems}</Breadcrumb> */}</div>
    <div className={styles.right}>
      <AvatarDropdown
        user={props.user.currentUser}
        onDropdownItemClick={(event: ClickParam) => {
          if (event.key === 'logout') {
            props.dispatch!({
              type: 'user/logout',
              callback: () => {
                router.replace('/login');
              },
            });
          }
        }}
      />
    </div>
  </div>
);
export default connect(({ user }: ConnectState) => ({ user }))(HeaderRight);
