import React from 'react';
import {withNavigation} from '@react-navigation/compat';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {nowTheme} from '../../constants';
import Icon from '../Icon';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {removeUserDependant} from '../../redux/user/user-actions';
import {selectUserDependants} from '../../redux/user/user-selectors';

const {width, height} = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 15) / 3.2;
class DependantsCard extends React.Component {
  state = {
    paymentStatus: false,
    modalVisible: false,
  };
  constructor(props) {
    super(props);
  }

  render() {
    const {
      navigation,
      item,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle,
      horizontal,
      dependantsDetails,
      removeUserDependant,
    } = this.props;

    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle,
    ];
    const titleStyles = [styles.cardTitle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
    ];

    return (
      <Block card flex style={cardContainer}>
        <Block row={horizontal}>
          <TouchableWithoutFeedback>
            <Block flex style={styles.cardDescription}>
              <Block>
                <Text
                  style={{fontFamily: 'montserrat-regular'}}
                  size={14}
                  style={styles.appointment}
                  color={nowTheme.COLORS.SECONDARY}>
                  {item.name}
                </Text>
                <Text
                  style={{fontFamily: 'montserrat-regular'}}
                  size={14}
                  style={titleStyles}
                  color={nowTheme.COLORS.SECONDARY}>
                  {item.personal.phoneNumber}
                </Text>
                <Text
                  style={{fontFamily: 'montserrat-regular'}}
                  size={14}
                  style={titleStyles}
                  color={nowTheme.COLORS.SECONDARY}>
                  {item.personal.email}
                </Text>
              </Block>
            </Block>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Block flex style={styles.cardDescription}>
              <TouchableOpacity
                style={[styles.buttonDelete]}
                onPress={() =>
                  this.setState({modalVisible: !this.state.modalVisible})
                }>
                <Icon
                  family="NowExtra"
                  size={16}
                  name="simple-remove2x"
                  //color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
                />
              </TouchableOpacity>
              <Block middle>
                <Image
                  source={{uri: item.personal.profileImage}}
                  style={styles.avatar}
                />
              </Block>
            </Block>
          </TouchableWithoutFeedback>
        </Block>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({modalVisible: false})}>
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => this.setState({modalVisible: false})}>
            <TouchableOpacity style={styles.modal} activeOpacity={1}>
              <Text style={styles.modalText}>Confirm Delete?</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  removeUserDependant(item, dependantsDetails);
                  this.setState({modalVisible: false});
                }}>
                <Text style={styles.textStyle}>Proceed</Text>
              </Pressable>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </Block>
    );
  }
}

DependantsCard.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 120,
    marginBottom: 4,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 2,
    paddingBottom: 2,
  },
  cardDescription: {
    //padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 300,
    width: 'auto',
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  createButtonOptions: {
    width: width * 0.275,
    //marginTop: 10,
    //marginBottom: 40,
  },
  createButton: {
    width: width * 0.5,
    //marginTop: 25,
    //marginBottom: 40,
  },
  buttonDelete: {
    paddingRight: 12,
    position: 'absolute',
    marginLeft: 156,
    marginTop: 15,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatarContainer: {
    position: 'relative',
    //marginTop: -80,
    paddingTop: 2,
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0,
    marginTop: 'auto',
  },
  appointment: {
    fontWeight: '900',
    paddingHorizontal: 9,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

//export default withNavigation(DependantsCard);

const mapDispatchToProps = dispatch => ({
  removeUserDependant: (item, dependantsDetails) =>
    dispatch(removeUserDependant(item, dependantsDetails)),
});

const mapStateToProps = createStructuredSelector({
  dependantsDetails: selectUserDependants,
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(DependantsCard),
);
