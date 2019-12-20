import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import { RangePickerValue, RangePickerPresetRange } from 'antd/lib/date-picker/interface';

const { RangePicker } = DatePicker;

interface IProps {
  style?: any;
  className?: string;
  format?: string;
  stepNum?: number;
  disabled?: boolean;
  startTime?: Moment;
  endTime?: Moment;

  value?: RangePickerValue;
  onChange?: (dates: RangePickerValue, dateStrings: [string, string]) => void;
  onCalendarChange?: (dates: RangePickerValue, dateStrings: [string, string]) => void;
  onOk?: (selectedTime: RangePickerPresetRange) => void;
}

interface IState {
  value?: RangePickerValue;
  clickTime?: string;
  clickFlag?: boolean;
  timeFlag?: boolean;
  clickNowTime: Moment;
}

export default class GCRangePicker extends Component<IProps, IState> {
  state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = {
      value: props.value,
      clickTime: undefined,
      clickFlag: false,
      timeFlag: false,
      clickNowTime: moment(),
    };
  }

  static getDerivedStateFromProps(props: IProps, state: IState) {
    let nextState: any = null;
    let { clickNowTime } = state;
    const { value, endTime, startTime } = props;
    // console.log(value);
    if (props.hasOwnProperty('value') && value !== state.value) {
      if (Array.isArray(value) && !state.timeFlag) {
        if (startTime && value[0] && value[0] > startTime) {
          value[0] = moment(value[0])
            .clone()
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        }
        if (value[0] && !startTime) {
          value[0] = moment(value[0])
            .clone()
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        }
        if (endTime && value[1] && value[1] < endTime) {
          value[1] = moment(value[1])
            .clone()
            .set({ hour: 23, minute: 59, second: 59, millisecond: 59 });
        }
        if (endTime && value[1] && value[1] >= endTime) {
          const data = moment();
          value[1] = data;
          clickNowTime = data;
        }
        if (endTime && value[0] && !value[1]) {
          const data = moment();
          value[1] = data;
          clickNowTime = data;
        }
      } else if (Array.isArray(value)) {
        if (value[1] && value[1] > clickNowTime) {
          value[1] = clickNowTime;
        }
      }

      nextState = { ...(nextState || {}), value, clickNowTime };
    }
    return nextState;
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    if (nextState !== this.state) {
      return true;
    }
    if (nextProps !== this.props) {
      return true;
    }
    return false;
  }

  range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i += 1) {
      result.push(i);
    }
    return result;
  };

  disabledDate = (current?: Moment | undefined) => {
    const { endTime, startTime, stepNum } = this.props;
    const { clickTime } = this.state;
    const timeStart = startTime ? moment(startTime).startOf('day') : moment('1970');
    const timeEnd = endTime ? moment(endTime).endOf('day') : moment();
    let currentStart: Moment | undefined;
    let currentEnd: Moment | undefined;
    if (clickTime) {
      currentStart = moment(clickTime).startOf('day');
      currentEnd = moment(clickTime).endOf('day');
    }
    if (currentStart && stepNum && currentEnd && moment(clickTime).add(stepNum, 'day') < moment()) {
      return (
        !!current &&
        (current <
          moment(clickTime)
            .startOf('day')
            .subtract(stepNum, 'day') ||
          current >
            moment(clickTime)
              .endOf('day')
              .add(stepNum, 'day'))
      );
    }
    if (currentStart && stepNum && currentEnd && moment(clickTime) < moment()) {
      return (
        !!current && (current < moment(clickTime).subtract(stepNum, 'day') || current > moment())
      );
    }
    if (
      currentStart &&
      stepNum &&
      currentEnd &&
      moment(clickTime) > currentStart.add(stepNum, 'day')
    ) {
      return (
        !!current &&
        (current < moment(clickTime).subtract(stepNum, 'day') ||
          current > moment(clickTime).add(stepNum, 'day'))
      );
    }
    if (
      currentStart &&
      stepNum &&
      currentEnd &&
      moment(clickTime) < currentStart.add(stepNum, 'day')
    ) {
      return (
        !!current &&
        (current < moment(clickTime).subtract(stepNum, 'day') || current > moment(clickTime))
      );
    }
    if (endTime && startTime) {
      return !!current && (current < timeStart || current > timeEnd);
    }
    if (startTime) {
      return !!current && current < timeStart;
    }
    if (endTime) {
      return !!current && current > timeEnd;
    }
    return false;
  };

  disabledTime = (current: Moment | undefined | Moment[], type: string) => {
    if (Array.isArray(current) && current.length === 2) {
      this.state.timeFlag = true;
      const { clickNowTime } = this.state;
      if (type === 'start' && this.props.startTime) {
        /* eslint-disable no-nested-ternary */
        const tag =
          current[0] >= this.props.startTime
            ? current[0].isSame(this.props.startTime, 'day')
              ? current[0].isSame(this.props.startTime, 'hour')
                ? current[0].isSame(this.props.startTime, 'minute')
                  ? 3
                  : 2
                : 1
              : 0
            : -1;
        /* eslint-enable no-nested-ternary */
        if (tag === -1) {
          return {
            disabledHours: () => this.range(0, 24),
            disabledMinutes: () => this.range(0, 60),
            disabledSeconds: () => this.range(0, 60),
          };
        }
        return {
          disabledHours: () =>
            this.range(0, 24).splice(0, tag > 0 ? this.props.startTime!.hour() : 0),
          disabledMinutes: () =>
            this.range(0, 60).splice(0, tag > 1 ? this.props.startTime!.minute() : 0),
          disabledSeconds: () =>
            this.range(0, 60).splice(0, tag > 2 ? this.props.startTime!.second() : 0),
        };
      }
      if (type === 'end' && this.props.endTime) {
        /* eslint-disable no-nested-ternary */
        const tag =
          current[0] <= clickNowTime
            ? current[1].isSame(clickNowTime, 'day')
              ? current[1].isSame(clickNowTime, 'hour')
                ? current[1].isSame(clickNowTime, 'minute')
                  ? 3
                  : 2
                : 1
              : 0
            : -1;
        /* eslint-enable no-nested-ternary */
        if (tag === -1) {
          return {
            disabledHours: () => this.range(0, 24),
            disabledMinutes: () => this.range(0, 60),
            disabledSeconds: () => this.range(0, 60),
          };
        }
        return {
          disabledHours: () =>
            this.range(0, 24)
              .reverse()
              .splice(0, tag > 0 ? 23 - clickNowTime.hour() : 0),
          disabledMinutes: () =>
            this.range(0, 60)
              .reverse()
              .splice(0, tag > 1 ? 59 - clickNowTime.minute() : 0),
          disabledSeconds: () =>
            this.range(0, 60)
              .reverse()
              .splice(0, tag > 2 ? 59 - clickNowTime.second() : 0),
        };
      }
    }
    this.state.timeFlag = false;
    return {};
  };

  onOpenChange = (status: boolean) => {
    if (!status) {
      this.setState({ clickTime: undefined, clickFlag: false });
    }
    this.state.timeFlag = false;
  };

  onChange = (dates: RangePickerValue, dateStrings: [string, string]) => {
    const value: any = dates.slice();
    this.setState({ clickFlag: false });
    if (Array.isArray(dates) && dates.length === 2) {
      if (this.props.startTime && dates[0] && dates[0] < this.props.startTime) {
        value[0] = moment(this.props.startTime);
      }
      if (this.props.endTime && dates[1] && dates[1] > this.props.endTime) {
        value[1] = moment(this.props.endTime);
      }
      if (!this.props.hasOwnProperty('value')) {
        this.setState({ value });
      }
    }
    if (this.props.onChange) this.props.onChange(dates, dateStrings);
  };

  onCalendarChange = (dates: RangePickerValue) => {
    let clickTime: any;
    const { clickFlag } = this.state;
    const { stepNum } = this.props;
    if (clickFlag) return;
    if (dates[0]) {
      clickTime = dates[0].format('YYYY-MM-DD HH:mm:ss');
    }
    // if (!stepNum) return;
    this.setState({ clickTime, clickFlag: true });
  };

  render() {
    return (
      <RangePicker
        {...this.props}
        format={this.props.format ? this.props.format : 'YYYY-MM-DD HH:mm:ss'}
        disabledDate={
          this.props.startTime || this.props.endTime || this.props.stepNum
            ? this.disabledDate
            : undefined
        }
        disabledTime={this.props.startTime || this.props.endTime ? this.disabledTime : undefined}
        onOpenChange={this.onOpenChange}
        showTime={
          this.props.format === 'YYYY-MM-DD'
            ? false
            : {
                defaultValue: [this.props.startTime || moment(), this.props.endTime || moment()],
              }
        }
        value={this.state.value}
        onChange={this.onChange}
        onCalendarChange={this.onCalendarChange}
        onOk={this.props.onOk}
      />
    );
  }
}
