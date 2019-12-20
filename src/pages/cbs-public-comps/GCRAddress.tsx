// 点击经纬度转换地址
import React, { Component } from 'react';
import coordtransform from 'coordtransform';
import GCAButton from '@/pages/cbs-public-comps/GCAButton';
import GCSpin from '@/pages/cbs-public-comps/GCSpin';

interface IProps {
  style?: any;
  longitude: string;
  latitude: string;
  lnglat?: string | undefined;
}

interface IState {
  lnglat: string | undefined;
  longitude: string;
  latitude: string;
  flag: boolean;
  loading: boolean;
}

export default class GCRangePicker extends Component<IProps, IState> {
  state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = {
      lnglat: undefined,
      longitude: '',
      latitude: '',
      flag: false,
      loading: false,
    };
  }

  static getDerivedStateFromProps(props: IProps, state: IState) {
    let nextState: any = null;
    const { longitude, latitude } = props;
    if (
      props.hasOwnProperty('longitude') &&
      props.hasOwnProperty('latitude') &&
      longitude !== state.longitude &&
      latitude !== state.latitude
    ) {
      nextState = { ...(nextState || {}), longitude, latitude, lnglat: '' };
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

  onClick = async () => {
    if (!this.state.lnglat) {
      if (this.props.lnglat) {
        this.setState({
          lnglat: this.props.lnglat,
        });
      } else {
        const value: any = await this.getAdresse();
        if (!value) return;
        this.setState({
          lnglat: value,
        });
      }
    }
  };

  getAdresse = () => {
    this.setState({ loading: true, lnglat: '', flag: false });
    return new Promise((resolve, reject) => {
      this.setState({ loading: false });
      const coord = coordtransform.wgs84togcj02(+this.props.longitude, +this.props.latitude);
      fetch(
        `//restapi.amap.com/v3/geocode/regeo?key=caeb2ecd55690d364d3b2eb4a0f24b0c&location=${coord[0]},${coord[1]}`,
      )
        .then(res => res.json())
        .then(result => {
          if (result.infocode === '10000') {
            resolve(result.regeocode.formatted_address);
          } else {
            resolve(0);
          }
          this.setState({ loading: false });
        });
    });
  };

  render() {
    return (
      <GCAButton {...this.props} onClick={this.onClick}>
        {`${(+this.props.longitude).toFixed(8)},${(+this.props.latitude).toFixed(8)}`}
        <span style={{ color: '#555', fontWeight: 400, display: 'block' }}>
          {!this.state.flag && this.state.lnglat}
        </span>
        <GCSpin spinning={this.state.loading} />
      </GCAButton>
    );
  }
}
