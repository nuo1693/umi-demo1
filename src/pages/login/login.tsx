import { Alert, Checkbox, Tabs, Form, Input, Icon, Button, message } from 'antd';
import React, { Component } from 'react';
import { FormComponentProps } from 'antd/es/form';
import router from 'umi/router';
import Link from 'umi/link';
import { connect } from 'dva';
import md5 from 'md5';
import { ConnectState, ConnectProps } from '@/models/connect';
import GCCaptchaInput from '@/pages/cbs-public-comps/GCCaptchaInput';
import styles from './login.less';
import { phoneReg } from '@/utils/utils';

const { TabPane } = Tabs;

interface LoginProps extends ConnectProps, FormComponentProps {
  login: ConnectState['login'];
  submitting: boolean;
}
interface LoginState {
  type: 'account' | 'captcha';
  msg?: string;
}

// @ts-ignore
@Form.create()
// @ts-ignore
@connect(({ login, loading }: ConnectState) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class Login extends Component<LoginProps, LoginState> {
  state: LoginState = {
    type: 'account',
  };

  Mounted?: boolean;

  componentDidMount() {
    this.Mounted = true;
  }

  componentWillUnmount() {
    this.Mounted = false;
  }

  onTabChange = (type: any) => {
    this.setState({ type });
  };

  onSubmit = () => {
    const fieldNames =
      this.state.type === 'captcha'
        ? ['phone', 'captcha', 'remember']
        : ['user_name', 'password', 'remember'];
    this.props.form.validateFieldsAndScroll(fieldNames, (error: any, values: any) => {
      if (!error) {
        const type = this.state.type === 'captcha' ? { is_phone: true } : {};
        this.props.dispatch!({
          type: 'login/login',
          payload: { body: { ...values, ...type, password: md5(`${values.password}`) } },
          callback: (res: any) => {
            if (res.data && res.data.code === 1) {
              router.push('/home');
            }
            if (res.code === 5) {
              this.setState({ msg: res.message });
            }
          },
        });
      }
    });
  };

  onGetCaptcha = async () => {
    const r = await new Promise((resolve, reject) => {
      this.props.form.validateFields(['phone'], (error: any, values: any) => {
        if (!error) {
          this.props.dispatch!({
            type: 'login/getCaptcha',
            payload: {
              query: values,
            },
            callback: (res: any) => {
              if (!res.data.code) {
                resolve();
              } else {
                this.setState({ msg: '获取验证码失败' });
                reject();
              }
            },
          });
        } else {
          reject();
        }
      });
    })
      .then(() => true)
      .catch(() => false);
    return r;
  };

  render() {
    const { submitting } = this.props;
    const { type, msg } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className={styles.main}>
        <Tabs
          activeKey={type}
          animated={{
            inkBar: true,
            tabPane: false,
          }}
          onChange={this.onTabChange}
        >
          <TabPane tab="帐号密码登录" key="account">
            {/* {this.state.type === 'account' ? (
              <> */}
            <Form.Item>
              {getFieldDecorator('user_name', {
                rules: [{ required: true, message: '请输入账号' }],
              })(<Input prefix={<Icon type="user" />} placeholder="账号：admin、user、first" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input prefix={<Icon type="lock" />} type="password" placeholder="密码：123456" />,
              )}
            </Form.Item>
            {/* </>
            ) : null} */}
          </TabPane>
          <TabPane tab="手机验证码登录" key="captcha">
            {/* {this.state.type === 'captcha' ? (
              <> */}
            <Form.Item>
              {getFieldDecorator('phone', {
                rules: [
                  { required: true, message: '请输入手机号' },
                  { pattern: phoneReg, message: '号码格式错误' },
                ],
              })(<Input prefix={<Icon type="user" />} placeholder="手机号：13412341234" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '请输入验证码' }],
              })(
                <GCCaptchaInput
                  prefix={<Icon type="mail" />}
                  placeholder="验证码：123456"
                  onGetCaptcha={this.onGetCaptcha}
                  count={5}
                />,
              )}
            </Form.Item>
            {/* </>
            ) : null} */}
          </TabPane>
        </Tabs>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住密码</Checkbox>)}
          <Link to="/login/forgot_password" className={styles.forgot}>
            忘记密码？
          </Link>
          <Button
            type="primary"
            loading={submitting}
            className={styles.submitBtn}
            onClick={this.onSubmit}
          >
            登录
          </Button>
        </Form.Item>
        <Form.Item>{msg && <Alert message={msg} type="error" showIcon />}</Form.Item>
      </Form>
    );
  }
}
