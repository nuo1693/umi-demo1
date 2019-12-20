import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
// import { Row, Col, Icon, Button, Modal, Checkbox } from 'antd';
import moment from 'moment';
import { ConnectState, ConnectProps } from '@/models/connect';
import GCSpin from '../cbs-public-comps/GCSpin';
import styles from './index.less';

interface IProps extends ConnectProps {
}

interface IState {
}

// @ts-ignore
@connect(({ user, home, loading }: ConnectState) => ({ ...home, ...user, loading }))
// @connect(({ home, user }: ConnectState) => {
//   return { ...home, ...user };
// })
class Index extends Component<IProps, IState> {
  state: IState;

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    // const isLoading = this.props.loading && this.props.loading.effects['home/getTotalList'];
    return (
      <>
        {/* <GCSpin spinning={isLoading} style={{ height: '100%', width: '100%' }}>
        </GCSpin> */}
        <div>111</div>
      </>
    );
  }
}

export default Index;
