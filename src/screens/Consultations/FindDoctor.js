import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  selectSeachedSpecialist,
  selectSpecialistLocation,
} from '../../redux/user/user-selectors';
import {fetchUserDependants} from '../../redux/user/user-actions';

import {Block, Text, Button as GaButton, theme} from 'galio-framework';

// Now UI themed components
import {Images, nowTheme} from '../../constants';

const {width} = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

class FindDoctor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSelected: [],
      'switch-1': true,
      'switch-2': false,
    };
  }

  createTwoButtonAlert = () =>
    Alert.alert('Alert!!!', 'Please select location', [{text: 'OK'}]);

  componentDidMount() {
    const {fetchUserDependants} = this.props;
    fetchUserDependants();
  }
  componentWillUnmount() {
    const {fetchUserDependants} = this.props;
    fetchUserDependants();
  }

  handleSpecialist(title, code) {
    const {navigation, selectedLocation} = this.props;
    if (selectedLocation === 'Location?') {
      this.createTwoButtonAlert();
    } else {
      navigation.navigate('BookDoctor', {
        selectedSpecialist: {
          title: title,
          code: code,
        },
      });
    }
  }

  toggleSwitch = switchId => this.setState({[switchId]: !this.state[switchId]});

  renderAlbums = () => {
    const {navigation, specialist, selectedLocation} = this.props;
    /*const x =
      typeof specialist != 'undefined' &&
      typeof specialist.specialist != 'undefined'
        ? specialist.specialist.name
        : 'X';
    const prevScreen =
      typeof specialist != 'undefined' && typeof specialist.specialist
        ? specialist.specialist.screen
        : 'M';*/

    return (
      <Block flex style={[styles.group, {paddingBottom: theme.SIZES.BASE * 5}]}>
        <Block style={{marginHorizontal: theme.SIZES.BASE * 2}}>
          <Block row space="between">
            <Text bold size={16} color="#333" style={{marginTop: 2}}>
              Specialists
            </Text>
          </Block>
          {
            //x === 'X' || prevScreen === 'bd' ? (
            <Block
              row
              space="between"
              style={{marginTop: theme.SIZES.BASE, flexWrap: 'wrap'}}>
              {Images.Viewed.map((img, index) => (
                <Block key={index} style={styles.shadow}>
                  <TouchableOpacity
                    onPress={() => this.handleSpecialist(img.title, img.code)}>
                    <Image
                      resizeMode="cover"
                      source={img.image}
                      style={styles.albumThumb}
                    />
                  </TouchableOpacity>

                  <Block middle>
                    <Text
                      style={{fontFamily: 'montserrat-regular'}}
                      size={12}
                      color={nowTheme.COLORS.TEXT}>
                      {img.title}
                    </Text>
                  </Block>
                </Block>
              ))}
            </Block>
            //) :
            /*(
            <Block
              row
              space="between"
              style={{marginTop: theme.SIZES.BASE, flexWrap: 'wrap'}}>
              {Images.Viewed.filter(item =>
                item.code.includes(x.toString().toLowerCase()),
              ).map((img, index) => (
                <Block key={index} style={styles.shadow}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('SelectLocation', {
                        routeName: {
                          title: img.title,
                          code: img.code,
                        },
                      })
                    }>
                    <Image
                      resizeMode="cover"
                      source={img.image}
                      style={styles.albumThumb}
                    />
                  </TouchableOpacity>
                  <Block middle>
                    <Text
                      style={{fontFamily: 'montserrat-regular'}}
                      size={12}
                      color={nowTheme.COLORS.TEXT}>
                      {img.title}
                    </Text>
                  </Block>
                </Block>
              ))}
            </Block>
          )*/
          }
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex center>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 30, width}}>
          {this.renderAlbums()}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
    marginHorizontal: 10,
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: 'center',
    fontFamily: 'montserrat-bold',
    fontSize: 18,
  },
});

const mapDispatchToProps = dispatch => ({
  fetchUserDependants: () => dispatch(fetchUserDependants()),
});

const mapStateToProps = createStructuredSelector({
  specialist: selectSeachedSpecialist,
  selectedLocation: selectSpecialistLocation,
});

//export default withNavigation(Header);
export default connect(mapStateToProps, mapDispatchToProps)(FindDoctor);
