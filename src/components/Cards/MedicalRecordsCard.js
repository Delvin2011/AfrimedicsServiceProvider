import React from "react";
import { withNavigation } from "@react-navigation/compat";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { Block, Text, theme, Button, Checkbox } from "galio-framework";
import { nowTheme } from "../../constants";
import Icon from "../../components/Icon";
import { connect } from "react-redux";
import {
  removeMedicalRecord,
  addQuotationRequest,
} from "../../redux/user/user-actions";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStructuredSelector } from "reselect";
import ImageView from "react-native-image-viewing";

import { selectUserQuotations } from "../../redux/user/user-selectors";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3.75;
class MedicalRecordsCard extends React.Component {
  state = {
    paymentStatus: false,
    modalVisible: false,
    alertStatus: true,
    showImage: false,
  };
  constructor(props) {
    super(props);
  }

  paramsOptionCheck(details) {
    var checkbox = "";
    if (typeof details !== "undefined") {
      if (typeof details.option !== "undefined") {
        checkbox = details.option;
      }
    }
    return checkbox;
  }
  paramsPhamarcyCheck(details) {
    var phamarcyName = "";
    if (typeof details !== "undefined") {
      if (typeof details.phamarcyDetails !== "undefined") {
        phamarcyName = details.phamarcyDetails.name;
      }
    }
    return phamarcyName;
  }

  handleShowImage(status) {
    this.setState({ showImage: !status });
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
      details,
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

    const checkbox = this.paramsOptionCheck(details);
    const phamarcyName = this.paramsPhamarcyCheck(details);

    const images = [{ uri: item.PrescriptionUrl }];

    return (
      <Block card flex style={cardContainer}>
        <Block row={horizontal}>
          <TouchableWithoutFeedback>
            <Block flex style={styles.cardDescription}>
              <Block style={imgContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({ showImage: true })}
                >
                  <Image
                    resizeMode="cover"
                    source={{
                      uri: item.PrescriptionUrl,
                    }}
                    style={imageStyles}
                  />
                </TouchableOpacity>
              </Block>
            </Block>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Block flex style={styles.cardDescription}>
              <TouchableOpacity
                style={[styles.buttonRemove]}
                onPress={() =>
                  this.setState({ modalVisible: !this.state.modalVisible })}
              >
                <Ionicons
                  name="md-close-outline"
                  color="rgb(0,0,0)"
                  size={18}
                  style={{ backgroundColor: "transparent" }}
                />
              </TouchableOpacity>

              <Text
                //style={{fontFamily: 'montserrat-regular'}}
                size={14}
                style={styles.cardTitle}
                color={nowTheme.COLORS.SECONDARY}
              >
                {item.PatientName}
              </Text>
              <Text
                //style={{fontFamily: 'montserrat-regular'}}
                size={14}
                style={styles.cardCaptions}
                color={nowTheme.COLORS.SECONDARY}
              >
                {item.Caption}
              </Text>
              <Text
                //style={}
                size={14}
                style={styles.cardCaptions}
                color={nowTheme.COLORS.SECONDARY}
              >
                {new Date(item.Creation).toString().replace("GMT+0200", "")}
              </Text>
            </Block>
          </TouchableWithoutFeedback>
        </Block>

        <ImageView
          images={images}
          imageIndex={0}
          visible={this.state.showImage}
          onRequestClose={() => this.handleShowImage(this.state.showImage)}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => this.setState({ modalVisible: false })}
          >
            <TouchableOpacity style={styles.modal} activeOpacity={1}>
              <Text style={styles.modalText}>Confirm Delete?</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  removeMedicalRecord(item, items);
                  this.setState({ modalVisible: false });
                }}
              >
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
    fontWeight: "900",
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
    overflow: "hidden",
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: "auto",
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
    width: "auto",
  },
  shadow: {
    shadowColor: "#8898AA",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  articleButton: {
    fontFamily: "montserrat-bold",
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
    position: "absolute",
    marginLeft: 165,
    marginTop: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 5,
    backgroundColor: "#2196F3",
  },
  buttonView: {
    position: "absolute",
    width: width - theme.SIZES.BASE * 15,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

//export default withNavigation(MedicalRecordsCard);

const mapDispatchToProps = (dispatch) => ({
  removeMedicalRecord: (itemToRemove, items) =>
    dispatch(removeMedicalRecord(itemToRemove, items)),
  addQuotationRequest: (itemToAdd, quotations) =>
    dispatch(addQuotationRequest(itemToAdd, quotations)),
});

const mapStateToProps = createStructuredSelector({
  quotations: selectUserQuotations,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(MedicalRecordsCard));

/*                onPress={() => {
                  navigation.navigate('DigitalRecord', {digitalRecord: item});
                }}*/
