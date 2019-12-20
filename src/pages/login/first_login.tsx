import React, { useState } from 'react';
import { Result, Button, Form, Input, Alert } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/lib/form';
import router from 'umi/router';
import { ConnectState, ConnectProps } from '@/models/connect';
import styles from './first_login.less';
import { passwordReg } from '@/utils/utils';

interface IProps extends ConnectProps, FormComponentProps {
  user: ConnectState['user'];
}

let currentInputPwd = '';

const FirstLogin: React.FC<IProps> = ({ user, form, dispatch }) => {
  const { getFieldDecorator, getFieldValue, validateFields } = form;
  const [msg, setMsg] = useState<undefined | string>(undefined);
  return (
    <Result
      className={styles.firstLogin}
      status="info"
      title="首次登录修改密码"
      subTitle="请核对并修改原始密码，为了安全首次必须自己修改密码!"
      extra={
        <Form className={styles.main}>
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
                      if (currentInputPwd === 'password') {
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
                  currentInputPwd = 'password';
                }}
              />,
            )}
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
                      if (currentInputPwd === 'repassword') {
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
                  currentInputPwd = 'repassword';
                }}
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                validateFields((error: any, values: any) => {
                  if (!error) {
                    dispatch!({
                      type: 'user/setAccountPassword',
                      payload: {
                        body: values,
                      },
                      callback: (res: any) => {
                        if (!res.code) {
                          dispatch!({
                            type: 'user/save',
                            payload: { currentUser: { ...user.currentUser, is_first: false } },
                          });
                        } else {
                          setMsg('密码设置失败');
                        }
                      },
                    });
                  }
                });
              }}
            >
              提交
            </Button>
            {/* <Button style={{ marginLeft: 20 }} onClick={() => {}}>
              取消
            </Button> */}
          </Form.Item>
          {msg && <Alert message={msg} type="error" showIcon />}
        </Form>
      }
    />
  );
};

export default Form.create()(
  connect(({ user }: ConnectState) => ({
    user,
  }))(FirstLogin),
);
