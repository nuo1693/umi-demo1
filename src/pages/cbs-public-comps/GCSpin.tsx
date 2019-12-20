import React from 'react';
import { Spin, Icon } from 'antd';
import { SpinProps } from 'antd/lib/spin';

interface IProps extends Omit<SpinProps, 'indicator'> {
  children?: React.ReactNode;
}

const indicator = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default (props: IProps) => (
  <Spin tip="正在努力的加载数据中，请稍后..." {...props} indicator={indicator} />
);
