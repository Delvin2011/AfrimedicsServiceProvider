import React from 'react';
import {withNavigation} from '@react-navigation/compat';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {Block, Text, theme, Button} from 'galio-framework';
import {nowTheme} from '../../constants';
import Icon from '../../components/Icon';
import {connect} from 'react-redux';
import {removeMedicalRecord} from '../../redux/user/user-actions';

const {width, height} = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3.75;
class MedicalRecordsCard extends React.Component {
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
      items,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle,
      horizontal,
      digital,
      physical,
      remove,
      removeMedicalRecord,
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
        {digital ? (
          <>
            <Block row={horizontal}>
              <TouchableWithoutFeedback>
                <Block flex space="between" style={styles.cardDescription}>
                  <Text
                    style={{fontFamily: 'montserrat-regular'}}
                    size={14}
                    style={styles.cardTitle}
                    color={nowTheme.COLORS.SECONDARY}>
                    {item.Dependent}
                  </Text>
                  <Text
                    style={{fontFamily: 'montserrat-regular'}}
                    size={14}
                    style={styles.cardCaptions}
                    color={nowTheme.COLORS.SECONDARY}>
                    {new Date(item.creation._seconds * 1000)
                      .toString()
                      .replace(':00 GMT+0200 (SAST)', '')}
                  </Text>
                </Block>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <Block flex space="between" style={styles.cardDescription}>
                  <Block middle>
                    <Image
                      source={{uri: item.Practice_Logo_Url}}
                      style={styles.avatar}
                    />
                  </Block>
                </Block>
              </TouchableWithoutFeedback>
            </Block>
            <Block row={horizontal}>
              <TouchableWithoutFeedback>
                <Block flex space="between" style={styles.cardDescription}>
                  <Text
                    style={{fontFamily: 'montserrat-regular'}}
                    size={14}
                    style={styles.cardCaptions}
                    color={nowTheme.COLORS.SECONDARY}>
                    {item.Prescription_Status}
                  </Text>
                </Block>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <Block
                  flex
                  middle
                  space="between"
                  style={styles.cardDescription}>
                  <Text
                    size={14}
                    style={styles.cardCaptions}
                    color={nowTheme.COLORS.SECONDARY}>
                    {item.Practice_Doctors} - {item.Practice_Name}
                  </Text>
                </Block>
              </TouchableWithoutFeedback>
            </Block>
          </>
        ) : (
          <Block row={horizontal}>
            <TouchableWithoutFeedback>
              <Block flex style={styles.cardDescription}>
                <Block style={imgContainer}>
                  <Image
                    resizeMode="cover"
                    source={{uri: item.downLoadURL}}
                    style={imageStyles}
                  />
                </Block>
              </Block>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Block flex style={styles.cardDescription}>
                <TouchableOpacity
                  style={[styles.buttonRemove]}
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

                <Text
                  //style={{fontFamily: 'montserrat-regular'}}
                  size={14}
                  style={styles.cardTitle}
                  color={nowTheme.COLORS.SECONDARY}>
                  Dependant Name
                </Text>
                <Text
                  //style={{fontFamily: 'montserrat-regular'}}
                  size={14}
                  style={styles.cardCaptions}
                  color={nowTheme.COLORS.SECONDARY}>
                  {item.caption}
                </Text>
                <Text
                  //style={}
                  size={14}
                  style={styles.cardCaptions}
                  color={nowTheme.COLORS.SECONDARY}>
                  {new Date(item.creation._seconds * 1000)
                    .toString()
                    .replace(':00 GMT+0200 (SAST)', '')}
                </Text>
              </Block>
            </TouchableWithoutFeedback>
          </Block>
        )}

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
                  removeMedicalRecord(item, items);
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

MedicalRecordsCard.propTypes = {
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
  avatar: {
    marginTop: 5,
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0,
    marginBottom: 5,
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 140,
    marginBottom: 4,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 2,
    paddingBottom: 2,
    marginTop: 20,
    fontWeight: '900',
  },
  cardCaptions: {
    paddingHorizontal: 9,
    paddingTop: 2,
    paddingBottom: 2,
    marginTop: 5,
  },
  cardDescription: {
    //padding: 5,
    //paddingTop: 10,
    //paddingBottom: 10,
    //paddingLeft: 5,
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
  buttonRemove: {
    paddingRight: 12,
    position: 'absolute',
    marginLeft: 165,
    marginTop: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 5,
    backgroundColor: '#2196F3',
  },
  buttonView: {
    position: 'absolute',
    width: width - theme.SIZES.BASE * 15,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

//export default withNavigation(MedicalRecordsCard);

const mapDispatchToProps = dispatch => ({
  removeMedicalRecord: (itemToRemove, items) =>
    dispatch(removeMedicalRecord(itemToRemove, items)),
});

//export default withNavigation(Header);
export default connect(
  null,
  mapDispatchToProps,
)(withNavigation(MedicalRecordsCard));

/*                onPress={() => {
                  navigation.navigate('DigitalRecord', {digitalRecord: item});
                }}*/