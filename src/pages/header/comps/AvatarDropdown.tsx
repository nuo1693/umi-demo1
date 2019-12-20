import { Avatar, Icon, Menu, Spin, Dropdown } from 'antd';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import styles from './AvatarDropdown.less';

interface AvatarDropdownProps {
  user?: {
    user_name?: string;
    avatar?: string;
  };
  onDropdownItemClick?: (event: ClickParam) => void;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = props => {
  const { user = {}, onDropdownItemClick } = props;

  const menuHeaderDropdown = (
    <Menu className={styles.menu} onClick={onDropdownItemClick}>
      <Menu.Item key="logout">
        <Icon type="logout" />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return user && user.user_name ? (
    <Dropdown overlay={menuHeaderDropdown}>
      <span className={styles.avatar_dropdown}>
        <Avatar size="small" className={styles.avatar} src={user.avatar} alt="avatar" />
        <span className={styles.name}>{user.user_name}</span>
      </span>
    </Dropdown>
  ) : (
    <span className={styles.avatar_dropdown}>
      <Spin size="small" />
    </span>
  );
};

export default AvatarDropdown;
