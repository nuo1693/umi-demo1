import React, { Component } from 'react';
import { Steps, Result, Form, Button, Input, Col, Row, Alert } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import router from 'umi/router';
import { connect } from 'dva';
import { ConnectState, ConnectProps } from '@/models/connect';
import styles from './forgot_password.less';
import { phoneReg, passwordReg } from '@/utils/utils';
import GCCaptchaInput from '@/pages/cbs-public-comps/GCCaptchaInput';

const { Step } = Steps;

interface IProps extends FormComponentProps, ConnectProps {}

interface IState {
  current: number;
  msg?: string;
}

// @ts-ignore
@Form.create()
// @ts-ignore
@connect(({ login }: ConnectState) => ({
  login,
}))
class ForgotPassword extends Component<IProps, IState> {
  currentInputPwd?: string;

  accountInfo?: {
    id: number;
    account_name: string;
    own_enterprise_id: number;
    own_enterprise_name: string;
    phone: string;
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      current: 0,
      msg: undefined,
    };
  }

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
              if (!res.code) {
                resolve();
              } else {
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

  onBtnClick = () => {
    const { current } = this.state;
    if (current === 2) {
      router.push('/login');
    } else {
      this.props.form.validateFieldsAndScroll((error: any, values: any) => {
        if (!error) {
          if (current === 0) {
            this.props.dispatch!({
              type: 'login/checkCaptcha',
              payload: {
                body: values,
              },
              callback: (res: any) => {
                if (!res.code) {
                  this.setState({ msg: undefined, current: 1 });
                } else {
                  this.setState({ msg: '验证码验证失败' });
                }
              },
            });
          } else if (current === 1) {
            this.props.dispatch!({
              type: 'user/setAccountPassword',
              payload: {
                body: values,
              },
              callback: (res: any) => {
                if (!res.code) {
                  this.accountInfo = res.data;
                  this.setState({ msg: undefined, current: 2 });
                } else {
                  this.setState({ msg: '密码设置失败' });
                }
              },
            });
          }
        }
      });
    }
  };

  renderContent = (current: number) => {
    const { getFieldDecorator, getFieldValue, validateFields } = this.props.form;
    if (current === 0) {
      return (
        <>
          <Form.Item>
            {getFieldDecorator('phone', {
              rules: [
                { required: true, message: '请输入手机号！' },
                { pattern: phoneReg, message: '手机号格式错误！' },
              ],
            })(<Input name="mobile" placeholder="手机号: 13412341234" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('captcha', {
              rules: [{ required: true, message: '请输入验证码' }],
            })(<GCCaptchaInput placeholder="验证码: 123456" onGetCaptcha={this.onGetCaptcha} />)}
          </Form.Item>
        </>
      );
    }
    if (current === 1) {
      return (
        <>
          <Form.Item>
            {getFieldDecorator('password', {
              validateFirst: true,
              rules: [
                { required: true, message: '请输入密码' },
                { pattern: passwordReg, message: '密码格式错误' },
                {
                  message: '两次密码不一致',
                  validator: (rule, value, cb) => {
                    const password = getFieldValue('repassword');
                    if (password === undefined) {
                      cb();
                    } else if (password === value) {
                      if (this.currentInputPwd === 'password') {
                        validateFields(['repassword'], { force: true });
                      }
                      cb();
                    } else {
                      cb(true);
                    }
                  },
                },
              ],
            })(
              <Input.Password
                placeholder="请输入密码"
                onFocus={() => {
                  this.currentInputPwd = 'password';
                }}
              />,
            )}
            <div style={{ lineHeight: '12px' }}>密码规则：6～16位任意字母数字组合，不支持中文</div>
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('repassword', {
              validateFirst: true,
              rules: [
                { required: true, message: '请再次输入密码' },
                { pattern: passwordReg, message: '密码格式错误' },
                {
                  validator: (rule, value, cb) => {
                    const password = getFieldValue('password');
                    if (password === undefined) {
                      cb();
                    } else if (password === value) {
                      if (this.currentInputPwd === 'repassword') {
                        validateFields(['password'], { force: true });
                      }
                      cb();
                    } else {
                      cb(true);
                    }
                  },
                  message: '两次密码不一致',
                },
              ],
            })(
              <Input.Password
                placeholder="请再次输入密码"
                onFocus={() => {
                  this.currentInputPwd = 'repassword';
                }}
              />,
            )}
          </Form.Item>
        </>
      );
    }
    return (
      <Result
        status="success"
        title="操作成功"
        subTitle="牢记下面信息，还可以用账号密码方式登录!"
        extra={
          <Row>
            <Col span={8}>账号：</Col>
            <Col span={16}>{this.accountInfo!.account_name}</Col>
            <Col span={8}>所属公司：</Col>
            <Col span={16}>{this.accountInfo!.own_enterprise_name}</Col>
            <Col span={8}>预留手机号：</Col>
            <Col span={16}>{this.accountInfo!.phone}</Col>
          </Row>
        }
      />
    );
  };

  render() {
    const { msg } = this.state;
    return (
      <Form className={styles.main}>
        <Steps current={this.state.current}>
          <Step title="填写账号信息" />
          <Step title="确认账号信息" />
          <Step title="完成" />
        </Steps>
        {this.renderContent(this.state.current)}
        <Button type="primary" className={styles.btn} onClick={this.onBtnClick}>
          {this.state.current === 2 ? '去登录' : '下一步'}
        </Button>
        {msg && <Alert message={msg} type="error" showIcon />}
      </Form>
    );
  }
}

export default ForgotPassword;
