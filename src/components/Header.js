import React from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Keyboard,
  PermissionsAndroid,
} from "react-native";
import {
  Button,
  Block,
  NavBar,
  Text,
  theme,
  Button as GaButton,
} from "galio-framework";
import { Picker } from "@react-native-picker/picker";
import Icon from "./Icon";
import Input from "./Input";
import Tabs from "./Tabs";
import nowTheme from "../constants/Theme";
import Ionicons from "react-native-vector-icons/Ionicons";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectAddRecordHidden,
  selectViewDoctorsOnMap,
  selectSeachedSpecialist,
  selectSpecialistLocation,
  selectUserDependants,
  selectDependant,
} from "../redux/user/user-selectors";
import { selectCartItemsCount } from "../redux/cart/cart-selectors";
import { selectWishListItemsCount } from "../redux/wishList/wishList-selectors";

import {
  toggleAddRecord,
  viewDoctorsOnMap,
  searchSpecialist,
  headerTabOptionChange,
  specialistLocation,
  dependantSelection,
} from "../redux/user/user-actions";

//Phamarcy
import {
  selectedPhamarcyLocation,
  selectSearchedPhamarcy,
} from "../redux/pharmacy/pharmacy-selectors";
import {
  phamarcyLocation,
  searchPhamarcy,
} from "../redux/pharmacy/pharmacy-actions";

import {
  setPickupLocation,
  setDestinationLocation,
} from "../redux/ambulance/ambulance-actions";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geolocation from "react-native-geolocation-service";

navigator.geolocation = require("react-native-geolocation-service");

const { height, width } = Dimensions.get("window");
const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate("Map")}
  >
    <Icon
      family="NowExtra"
      size={16}
      name="bulb"
    /> //color={nowTheme.COLORS[isWhite ? "WHITE" : "ICON"]}
    <Block
      middle
      style={[
        styles.notify,
        { backgroundColor: nowTheme.COLORS[isWhite ? "WHITE" : "PRIMARY"] },
      ]}
    />
  </TouchableOpacity>
);

const AddRecordButton = ({ isWhite, style, navigation, toggleAddRecord }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => toggleAddRecord()}
  >
    <Ionicons
      name="md-add"
      color="rgb(0,0,0)"
      size={24}
      style={{ backgroundColor: "transparent" }}
    />
    <Block
      middle
      style={[
        styles.notify,
        { backgroundColor: nowTheme.COLORS[isWhite ? "WHITE" : "PRIMARY"] },
      ]}
    />
  </TouchableOpacity>
);

const ViewDoctorsOnMap = ({ style, viewDoctorsOnMap, viewMap }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => {
      viewDoctorsOnMap(viewMap);
      console.log(viewMap);
    }}
  >
    <Block
      middle
      style={[
        styles.availabilityStatus,
        {
          backgroundColor:
            nowTheme.COLORS[viewMap == true ? "SUCCESS" : "ERROR"],
        },
      ]}
    />
  </TouchableOpacity>
);

const ViewTextDoctorsOnMap = ({ viewDoctorsOnMap, viewMap }) => (
  <TouchableOpacity
    onPress={() => {
      viewDoctorsOnMap(viewMap);
      console.log(viewMap);
    }}
  >
    <Text>{viewMap ? "ONLINE" : "OFFLINE"}</Text>
  </TouchableOpacity>
);

const BasketButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate("Pro")}
  >
    <Icon
      family="NowExtra"
      size={16}
      name="basket2x"
    /> //color={nowTheme.COLORS[isWhite ? "WHITE" : "ICON"]}
  </TouchableOpacity>
);

let items = [
  {
    id: 0,
    name: "Location?",
    value: "Location?",
  },
  {
    id: 1,
    name: "Harare",
    value: "Harare",
    geometry: {
      lat: -17.823875,
      lng: 31.035886,
    },
  },
  {
    id: 2,
    name: "Masvingo",
    value: "Masvingo",
    geometry: {
      lat: -20.072217,
      lng: 30.829824,
    },
  },
  {
    id: 3,
    name: "Gweru",
    value: "Gweru",
    geometry: {
      lat: -19.456382,
      lng: 29.811787,
    },
  },
  {
    id: 4,
    name: "Bulawayo",
    value: "Bulawayo",
    geometry: {
      lat: -20.148393,
      lng: 28.575895,
    },
  },
  {
    id: 5,
    name: "Mutare",
    value: "Mutare",
    geometry: {
      lat: -17.885514,
      lng: 30.675703,
    },
  },
  {
    id: 6,
    name: "Chinhoyi",
    value: "Chinhoyi",
    geometry: {
      lat: -19.011037,
      lng: 30.897197,
    },
  },
];

const PhamarcyLocationPicker = ({
  phamarcyLocation,
  selectedPhamarcyLocation,
}) => (
  <Picker
    selectedValue={selectedPhamarcyLocation}
    onValueChange={(value, index) => phamarcyLocation(value)}
    mode="dropdown" // Android only
    style={styles.picker}
  >
    {items.map((item, index) => {
      return <Picker.Item label={item.name} value={item.value} key={index} />;
    })}
  </Picker>
);

const DependantPicker = ({
  dependantsDetails,
  dependantSelection,
  selectedDependant,
}) => (
  <Picker
    selectedValue={selectedDependant}
    onValueChange={(value, index) => dependantSelection(value)}
    mode="dropdown" // Android only
    style={styles.picker}
  >
    {dependantsDetails.map((item, index) => {
      return <Picker.Item label={item.name} value={item} key={index} />;
    })}
  </Picker>
);

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      specialistSearch: "",
      phamarcySearch: "",
      region: "unknown",
      ambulanceRequest: "",
      showDestinationSearch: true,
      currentLocationEnable: false,
    };
    this.showOff = this.showOff.bind(this);
    this.show = this.show.bind(this);
  }

  async requestGPSPermissions() {
    /*if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization();
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
     authorizationLevel: 'whenInUse',
   });
  }*/

    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return;
      }
    }
  }

  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };

  handleSearchInput = (searchInput) => {
    const { searchSpecialist, searchPhamarcy, title } = this.props;
    const specialist = {};
    specialist.name = searchInput;
    specialist.screen = title == "Book a Doctor"
      ? "bd"
      : "Find a Doctor"
      ? "fd"
      : "New Phamarcy"
      ? "ph"
      : "";
    if (title == "Book a Doctor") {
      specialist.screen = "bd";
      searchSpecialist(specialist);
      this.setState({ specialistSearch: searchInput });
    } else if (title == "New Phamarcy") {
      specialist.screen = "ph";
      searchPhamarcy(specialist);
      this.setState({ phamarcySearch: searchInput });
    }
    //else
  };

  showOff = () => {
    this.setState({ showDestinationSearch: false });
  };

  show = () => {
    this.setState({ showDestinationSearch: true });
  };

  renderRight = () => {
    const {
      white,
      title,
      navigation,
      toggleAddRecord,
      viewDoctorsOnMap,
      viewMap,
      phamarcyLocation,
      selectedPhamarcyLocation,
    } = this.props;
    if (title === "Title") {
      return [
        <BellButton key="chat-title" navigation={navigation} isWhite={white} />,
        <BasketButton
          key="basket-title"
          navigation={navigation}
          isWhite={white}
        />,
      ];
    }

    switch (title) {
      case "Home":
        return [
          <ViewTextDoctorsOnMap
            key="map-open-close"
            viewMap={viewMap}
            isWhite={white}
            viewDoctorsOnMap={viewDoctorsOnMap}
          />,
          <ViewDoctorsOnMap
            key="chat-search"
            isWhite={white}
            viewDoctorsOnMap={viewDoctorsOnMap}
            viewMap={viewMap}
          />,
          ,
        ];
      case "Profile":
        return [
          <BellButton
            key="chat-profile"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-deals"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Account":
        return [
          <BellButton key="chat-profile" navigation={navigation} />,
          <BasketButton key="basket-deals" navigation={navigation} />,
        ];
      case "Search":
        return [
          <BellButton
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "New Phamarcy":
        return [
          <PhamarcyLocationPicker
            key="map-open-close"
            phamarcyLocation={phamarcyLocation}
            selectedPhamarcyLocation={selectedPhamarcyLocation}
            isWhite={white}
          />,
        ];
      case "Medical Records":
        return [
          <AddRecordButton
            key="chat-search"
            navigation={navigation}
            isWhite={white}
            toggleAddRecord={toggleAddRecord}
          />,
        ];
      default:
        break;
    }
  };
  renderSearch = () => {
    const { navigation, title, selectedDependant } = this.props;
    var searchOption = "";
    var name = "";
    var value = "";
    searchOption = "What are you looking for?";

    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder={searchOption}
        name={name}
        value={value}
        placeholderTextColor={"#8898AA"}
        iconContent={<Icon
          size={16}
          color={theme.COLORS.MUTED}
          name="zoom-bold2x"
          family="NowExtra"
        />}
        onChangeText={(searchInput) => {
          this.handleSearchInput(searchInput);
        }}
      />
    );
  };

  renderPickupLocation = () => {
    const { dependantsDetails, setPickupLocation } = this.props;
    var details = [];
    for (var a = 0; a < dependantsDetails.length; a++) {
      if (Object.values(dependantsDetails[a]).includes("Dependant?")) {
        continue;
      } else {
        var obj = {
          description: dependantsDetails[a].description,
          geometry: dependantsDetails[a].geometry,
        };
        details.unshift(obj);
      }
    }
    //this.requestGPSPermissions();
    return (
      <GooglePlacesAutocomplete
        placeholder="Search pickup location"
        onFail={(error) => console.error(error)}
        textInputProps={{
          onChangeText: this.showOff,
        }}
        onPress={(data, details = null) => {
          this.show();
          setPickupLocation({
            location: details.geometry.location,
            description: data.description,
          });
        }}
        fetchDetails={true}
        styles={{
          container: {
            flex: 0,
            width: width - 36,
            marginHorizontal: 16,
            marginBottom: 5,
          },

          textInputContainer: {
            borderWidth: 1,
            borderColor: nowTheme.COLORS.BORDER,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 36,
            color: "#5d5d5d",
            fontSize: 14,
            //borderRadius: 30,
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
        }}
        enablePoweredByContainer={false}
        minLength={2}
        debounce={400}
        returnKeyType={"search"}
        currentLocation={true}
        currentLocationLabel="Current location"
        query={{
          key: "AIzaSyAHWKeSs8x2QSp9E8OE88X34G1XtvpZZfk",
          language: "en",
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        predefinedPlaces={details}
      />
    );
  };

  renderDestinationSearch = () => {
    const { setDestinationLocation } = this.props;
    return (
      <GooglePlacesAutocomplete
        placeholder="Search destination clinic/hospital"
        onFail={(error) => console.error(error)}
        onPress={(data, details = null) => {
          setDestinationLocation({
            location: details.geometry.location,
            description: data.description,
          });
        }}
        fetchDetails={true}
        styles={{
          container: {
            flex: 0,
            width: width - 36,
            marginHorizontal: 16,
            marginTop: 5,
            marginBottom: 10,
          },

          textInputContainer: {
            borderWidth: 1,
            borderColor: nowTheme.COLORS.BORDER,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 36,
            color: "#5d5d5d",
            fontSize: 14,
            //borderRadius: 30,
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
        }}
        enablePoweredByContainer={false}
        minLength={2}
        debounce={400}
        returnKeyType={"search"}
        query={{
          key: "AIzaSyAHWKeSs8x2QSp9E8OE88X34G1XtvpZZfk",
          language: "en",
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
      />
    );
  };

  renderOptions = () => {
    const { navigation, optionLeft, optionRight } = this.props;

    return (
      <Block row style={styles.options}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => navigation.navigate("Map")}
        >
          <Block row middle>
            <Icon
              name="bulb"
              family="NowExtra"
              size={18}
              style={{ paddingRight: 8 }}
              color={nowTheme.COLORS.HEADER}
            />
            <Text
              style={{ fontFamily: "montserrat-regular" }}
              size={16}
              style={styles.tabTitle}
            >
              {optionLeft || "Beauty"}
            </Text>
          </Block>
        </Button>
        <Button
          shadowless
          style={styles.tab}
          onPress={() => navigation.navigate("Map")}
        >
          <Block row middle>
            <Icon
              size={18}
              name="bag-162x"
              family="NowExtra"
              style={{ paddingRight: 8 }}
              color={nowTheme.COLORS.HEADER}
            />
            <Text
              style={{ fontFamily: "montserrat-regular" }}
              size={16}
              style={styles.tabTitle}
            >
              {optionRight || "Fashion"}
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };

  handleTabOption = (tabOption) => {
    const { headerTabOptionChange } = this.props;
    headerTabOptionChange(tabOption);
  };
  renderTabs = () => {
    const { tabs, tabIndex, navigation, navigateTo } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;
    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        navigation={navigation}
        navigateTo={navigateTo}
        onChange={(id) => this.handleTabOption(id)}
      />
    );
  };
  renderHeader = () => {
    const {
      search,
      options,
      tabs,
      searchedSpecialist,
      searchDestination,
      searchPickupLocation,
    } = this.props;
    if (
      search ||
      tabs ||
      options ||
      searchPickupLocation ||
      searchDestination
    ) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
          {searchPickupLocation
            ? this.renderPickupLocation(searchPickupLocation)
            : null}
          {searchDestination && this.state.showDestinationSearch
            ? this.renderDestinationSearch()
            : null}

          {options ? this.renderOptions() : null}
          {tabs ? this.renderTabs() : null}
        </Block>
      );
    }
  };
  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      hidden,
      cartItemsCount,
      ...props
    } = this.props;

    const noShadow = [
      "Search",
      "Categories",
      "Deals",
      "Pro",
      "Profile",
    ].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: "rgba(0,0,0,0)" } : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor },
    ];
    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: "center" }}
          left={<Ionicons
            name={back ? "md-chevron-back-outline" : "md-reorder-four"}
            //family="NowExtra"
            size={18}
            onPress={this.handleLeftPress}
            color={iconColor ||
              (white ? nowTheme.COLORS.WHITE : nowTheme.COLORS.ICON)}
          />}
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: nowTheme.COLORS[white ? "WHITE" : "HEADER"] },
            titleColor && { color: titleColor },
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    position: "relative",
  },
  title: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "montserrat-regular",
  },
  navbar: {
    paddingVertical: 0,
    marginRight: 20,
    //paddingBottom: theme.SIZES.BASE * 0.1,
    //paddingTop: iPhoneX ? theme.SIZES.BASE * 3 : theme.SIZES.BASE * 0,
    bottom: 0,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: "absolute",
    top: 8,
    right: 6,
  },
  availabilityStatus: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 6,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: "absolute",
    top: 0,
    right: 80,
  },
  phamarcyCount: {
    fontSize: 12,
    fontFamily: "montserrat-regular",
    color: theme.COLORS.WHITE,
  },
  phamarcyNotify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 12,
    height: theme.SIZES.BASE * 1.5,
    width: theme.SIZES.BASE * 1.5,
    position: "absolute",
    top: -3,
    right: -3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 40,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    marginTop: -5,
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "400",
    color: nowTheme.COLORS.HEADER,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
  },
  picker: {
    //marginVertical: 30,
    width: 150,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
  },
});

const mapDispatchToProps = (dispatch) => ({
  toggleAddRecord: () => dispatch(toggleAddRecord()),
  viewDoctorsOnMap: (status) => dispatch(viewDoctorsOnMap(status)),
  searchSpecialist: (specialist) => dispatch(searchSpecialist(specialist)),
  searchPhamarcy: (phamarcy) => dispatch(searchPhamarcy(phamarcy)),
  specialistLocation: (location) => dispatch(specialistLocation(location)),
  phamarcyLocation: (location) => dispatch(phamarcyLocation(location)),
  dependantSelection: (dependant) => dispatch(dependantSelection(dependant)),
  headerTabOptionChange: (tabOption) =>
    dispatch(headerTabOptionChange(tabOption)),
  setPickupLocation: (location) => dispatch(setPickupLocation(location)),
  setDestinationLocation: (location) =>
    dispatch(setDestinationLocation(location)),
});

const mapStateToProps = createStructuredSelector({
  hidden: selectAddRecordHidden, //to show or hide the cart.
  viewMap: selectViewDoctorsOnMap,
  searchedSpecialist: selectSeachedSpecialist,
  cartItemsCount: selectCartItemsCount,
  wishListItemsCount: selectWishListItemsCount,
  selectedLocation: selectSpecialistLocation,
  dependantsDetails: selectUserDependants,
  selectedDependant: selectDependant,
  selectedPhamarcyLocation: selectedPhamarcyLocation,
  searchedPhamarcy: selectSearchedPhamarcy,
});

//export default withNavigation(Header);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Header));
