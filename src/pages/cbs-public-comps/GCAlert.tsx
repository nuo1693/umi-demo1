import React, { Component } from 'react';
import { Alert } from 'antd';
import styles from './GCAlert.less';

/**
 * ###模块说明：接收一个数组，数组元素可传入组件或对象
 * 对象拥有3个可选属性：label，数量及后缀文字
 * 传入组件直接渲染
 */
interface IObj {
  label: string;
  number: number;
  afterTxt?: string;
}

interface IProps {
  listArr: (IObj | React.ReactElement)[];
}

class GCAlert extends Component<IProps> {
  msgRender = () =>
    this.props.listArr.map((item, index) => {
      if (React.isValidElement(item)) {
        return (
          <span key={index.toString()} className={styles.spanWrap}>
            {item}
          </span>
        );
      }
      return (
        <span key={index.toString()} className={styles.spanWrap}>
          {item.label}:<span className={styles.numTxt}>{item.number}</span>
          {item.afterTxt}
        </span>
      );
    });

  render() {
    return <Alert className={styles.alart} message={this.msgRender()} type="info" showIcon />;
  }
}

export default GCAlert;
