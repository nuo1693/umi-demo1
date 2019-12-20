import React from 'react';
import classNames from 'classnames';
import styles from './GCAButton.less';

const GCAButton = (props: any) => (
  <span {...props} className={classNames(styles.GCAButton, props.className)}>
    {props.children}
  </span>
);

export default GCAButton;
