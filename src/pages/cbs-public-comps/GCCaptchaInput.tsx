import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'antd';
import { InputProps } from 'antd/lib/input';

interface IProps extends InputProps {
  onGetCaptcha?: () => Promise<boolean>;
  count?: number;
}

interface IState {
  count: number;
}

export default class GCCaptchaInput extends Component<IProps, IState> {
  interval?: number;

  constructor(props: IProps) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onClick = async () => {
    if (this.props.onGetCaptcha) {
      const r = await this.props.onGetCaptcha();
      if (r) {
        this.onStartTimer();
      }
    }
  };

  onStartTimer = () => {
    let { count = 120 } = this.props;
    this.setState({ count });
    clearInterval(this.interval);
    this.interval = window.setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  render() {
    const { count, onGetCaptcha, ...other } = this.props;
    return (
      <Row gutter={8}>
        <Col span={16}>
          <Input {...other} />
        </Col>
        <Col span={8}>
          <Button disabled={!!this.state.count} onClick={this.onClick} style={{ width: '100%' }}>
            {this.state.count ? `${this.state.count}秒后获取` : '获取验证码'}
          </Button>
        </Col>
      </Row>
    );
  }
}
