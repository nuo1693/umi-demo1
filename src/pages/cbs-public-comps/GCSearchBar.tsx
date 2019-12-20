import React, { Component, ReactNode } from 'react';
import { Form, Button, Icon } from 'antd';
import { GetFieldDecoratorOptions, FormComponentProps } from 'antd/lib/form/Form';
import styles from './GCSearchBar.less';

interface IItemOption extends GetFieldDecoratorOptions {
  id: string;
  label?: ReactNode;
  colon?: boolean;
  style?: any;
}

interface IProps extends FormComponentProps<any> {
  id?: string; // 用于diff销毁组件下所有元素，刷新onsubmit后自动填充内容
  style?: any;
  hasReset?: boolean;
  hasAdvance?: boolean;
  onSearch?: (value: any) => void;
  onExport?: () => void | undefined;
}

interface IState {
  showAdvance: boolean;
}

class GCSearchBar extends Component<IProps, IState> {
  static createBasicItem = (option: IItemOption) => (ele: React.ReactElement) => (
    <span data-type="basic" data-option={option}>
      {ele}
    </span>
  );

  static createAdvanceItem = (option: IItemOption) => (ele: React.ReactElement) => (
    <span data-type="advance" data-option={option}>
      {ele}
    </span>
  );

  constructor(props: IProps) {
    super(props);
    this.state = {
      showAdvance: false,
    };
  }

  onSearch = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (!err && this.props.onSearch) this.props.onSearch(value);
    });
  };

  onReset = () => {
    this.props.form.resetFields();
  };

  onShowAdvance = () => {
    this.setState(prevState => ({
      showAdvance: !prevState.showAdvance,
    }));
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { children } = this.props;
    const basicItems: React.ReactElement[] = [];
    const advanceItems: React.ReactElement[] = [];
    const btns: React.ReactElement[] = [];
    React.Children.forEach(children, (child: React.ReactNode) => {
      if (!React.isValidElement(child)) return;
      const type = child.props['data-type'];
      if (type) {
        const { id, label, colon, style, ...other }: IItemOption = child.props['data-option'];
        (type === 'advance' ? advanceItems : basicItems).push(
          <Form.Item key={id} label={label} colon={colon} style={style}>
            {getFieldDecorator(id, other)(child.props.children)}
          </Form.Item>,
        );
      } else {
        btns.push(child);
      }
    });
    return (
      <Form
        layout="inline"
        id={this.props.id}
        className={styles.searchBar}
        onSubmit={this.onSearch}
      >
        {basicItems}
        {this.props.hasAdvance && this.state.showAdvance && advanceItems}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            <Icon type="search" />
            查询
          </Button>
          {this.props.hasReset && <Button onClick={this.onReset}>重置</Button>}
          {this.props.hasAdvance && (
            <Button onClick={this.onShowAdvance}>{this.state.showAdvance ? '收起' : '展开'}</Button>
          )}
          {this.props.onExport && <Button onClick={this.props.onExport}>导出</Button>}
          {btns}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create<IProps>()(GCSearchBar);
