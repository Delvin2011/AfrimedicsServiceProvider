import React from 'react';
import {StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {Block, Text, theme} from 'galio-framework';

import Icon from '../components/Icon';
import nowTheme from '../constants/Theme';

class DrawerItem extends React.Component {
  renderIcon = () => {
    const {title, focused} = this.props;

    switch (title) {
      case 'Home':
        return (
          <Icon
            name="pin-3"
            family="Galio"
            //color={rgb(100, 120, 40)}
            size={14}
          />
        );
      case 'AppointmentRecords':
        return (
          <Icon
            name="pin-3"
            family="Galio"
            //color={rgb(100, 120, 40)}
            size={14}
          />
        );
      case 'Account':
        return (
          <Icon
            name="pin-3"
            family="Galio"
            //color={rgb(100, 120, 40)}
            size={14}
          />
        );
      case 'PharmacyOrders':
        return (
          <Icon
            name="pin-3"
            family="Galio"
            //color={rgb(100, 120, 40)}
            size={14}
          />
        );
      case 'Dependants':
        return (
          <Icon
            name="user-run2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{opacity: 0.5}}
          />
        );
      case 'MedicalRecords':
        return (
          <Icon
            name="user-run2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{opacity: 0.5}}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const {focused, title, navigation} = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null,
    ];

    return (
      <TouchableOpacity
        style={{height: 60}}
        onPress={() =>
          title == 'GETTING STARTED'
            ? Linking.openURL(
                'https://demos.creative-tim.com/now-ui-pro-react-native/docs/',
              ).catch(err => console.error('An error occurred', err))
            : navigation.navigate(title == 'LOGOUT' ? 'Onboarding' : title)
        }>
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{marginRight: 5}}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              style={{
                fontFamily: 'montserrat-regular',
                textTransform: 'uppercase',
                fontWeight: '300',
              }}
              size={12}
              bold={focused ? true : false}
              color={focused ? nowTheme.COLORS.PRIMARY : 'white'}>
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: 'white',
  },
  activeStyle: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 30,
    color: 'white',
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
});

export default DrawerItem;