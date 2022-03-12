import React from 'react';
import {Icon} from 'galio-framework';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import nowConfig from '../assets/config/now.json';
const NowExtra = require('../assets/font/now.ttf');
const IconNowExtra = createIconSetFromIcoMoon(nowConfig, 'NowExtra');

class IconExtra extends React.Component {
  render() {
    const {name, family, ...rest} = this.props;

    if (name && family) {
      if (family === 'NowExtra') {
        return <IconNowExtra name={name} family={family} {...rest} />;
      }
      return <Icon name={name} family={family} {...rest} />;
    }

    return null;
  }
}

export default IconExtra;
