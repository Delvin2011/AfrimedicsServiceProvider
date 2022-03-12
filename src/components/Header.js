import React from 'react';
import {withNavigation} from '@react-navigation/compat';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Keyboard,
} from 'react-native';
import {
  Button,
  Block,
  NavBar,
  Text,
  theme,
  Button as GaButton,
} from 'galio-framework';
import {Picker} from '@react-native-picker/picker';
import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import nowTheme from '../constants/Theme';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  selectAddRecordHidden,
  selectViewDoctorsOnMap,
  selectSeachedSpecialist,
  selectSpecialistLocation,
  selectUserDependants,
  selectDependant,
} from '../redux/user/user-selectors';
import {selectCartItemsCount} from '../redux/cart/cart-selectors';
import {selectWishListItemsCount} from '../redux/wishList/wishList-selectors';

import {
  toggleAddRecord,
  viewDoctorsOnMap,
  searchSpecialist,
  headerTabOptionChange,
  specialistLocation,
  dependantSelection,
} from '../redux/user/user-actions';

const {height, width} = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate('Map')}>
    <Icon
      family="NowExtra"
      size={16}
      name="bulb"
      //color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block
      middle
      style={[
        styles.notify,
        {backgroundColor: nowTheme.COLORS[isWhite ? 'WHITE' : 'PRIMARY']},
      ]}
    />
  </TouchableOpacity>
);

const AddRecordButton = ({isWhite, style, navigation, toggleAddRecord}) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => toggleAddRecord()}>
    <Icon
      family="NowExtra"
      size={16}
      name="simple-add2x"
      //color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block
      middle
      style={[
        styles.notify,
        {backgroundColor: nowTheme.COLORS[isWhite ? 'WHITE' : 'PRIMARY']},
      ]}
    />
  </TouchableOpacity>
);

const ViewDoctorsOnMap = ({isWhite, style, viewDoctorsOnMap}) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => viewDoctorsOnMap()}>
    <Icon
      family="NowExtra"
      size={16}
      name="world2x"
      //color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block
      middle
      style={[
        styles.notify,
        {backgroundColor: nowTheme.COLORS[isWhite ? 'WHITE' : 'PRIMARY']},
      ]}
    />
  </TouchableOpacity>
);

const AddDependantButton = ({isWhite, style, navigation, toggleAddRecord}) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate('AddDependants')}>
    <Icon
      family="NowExtra"
      size={16}
      name="simple-add2x"
      //color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block
      middle
      style={[
        styles.notify,
        {backgroundColor: nowTheme.COLORS[isWhite ? 'WHITE' : 'PRIMARY']},
      ]}
    />
  </TouchableOpacity>
);

const ViewTextDoctorsOnMap = ({viewDoctorsOnMap, viewMap}) => (
  <TouchableOpacity onPress={() => viewDoctorsOnMap()}>
    <Text>{viewMap ? 'Close List' : 'View List'}</Text>
  </TouchableOpacity>
);

const BasketButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate('Pro')}>
    <Icon
      family="NowExtra"
      size={16}
      name="basket2x"
      //color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const Cart = ({isWhite, style, navigation, cartItemsCount}) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate('PharmacyCart')}>
    <Icon
      family="NowExtra"
      size={16}
      name="cart-simple2x"
      //color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block
      middle
      style={[
        styles.phamarcyNotify,
        {backgroundColor: nowTheme.COLORS[isWhite ? 'WHITE' : 'PRIMARY']},
      ]}>
      <Text style={styles.phamarcyCount}>{cartItemsCount}</Text>
    </Block>
  </TouchableOpacity>
);

const Wishlist = ({isWhite, style, navigation, wishListItemsCount}) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate('Pro')}>
    <Icon
      family="NowExtra"
      size={16}
      name="like-22x"
      //color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block
      middle
      style={[
        styles.phamarcyNotify,
        {backgroundColor: nowTheme.COLORS[isWhite ? 'WHITE' : 'PRIMARY']},
      ]}>
      <Text style={styles.phamarcyCount}>{wishListItemsCount}</Text>
    </Block>
  </TouchableOpacity>
);

let items = [
  {
    id: 1,
    name: 'Location?',
    value: 'Location?',
  },
  {
    id: 1,
    name: 'Harare',
    value: 'Harare',
    geometry: {
      lat: -17.823875,
      lng: 31.035886,
    },
  },
  {
    id: 2,
    name: 'Masvingo',
    value: 'Masvingo',
    geometry: {
      lat: -20.072217,
      lng: 30.829824,
    },
  },
  {
    id: 3,
    name: 'Gweru',
    value: 'Gweru',
    geometry: {
      lat: -19.456382,
      lng: 29.811787,
    },
  },
  {
    id: 4,
    name: 'Bulawayo',
    value: 'Bulawayo',
    geometry: {
      lat: -20.148393,
      lng: 28.575895,
    },
  },
  {
    id: 5,
    name: 'Norton',
    value: 'Norton',
    geometry: {
      lat: -17.885514,
      lng: 30.675703,
    },
  },
  {
    id: 6,
    name: 'Chivhu',
    value: 'Chivhu',
    geometry: {
      lat: -19.011037,
      lng: 30.897197,
    },
  },
  {
    id: 7,
    name: 'Marondera',
    value: 'Marondera',
    geometry: {
      lat: -18.190432,
      lng: 31.5378,
    },
  },
  {
    id: 8,
    name: 'Kwekwe',
    value: 'Kwekwe',
    geometry: {
      lat: -18.920995,
      lng: 29.82316,
    },
  },
];
const LocationPicker = ({specialistLocation, selectedLocation}) => (
  <Picker
    selectedValue={selectedLocation}
    onValueChange={(value, index) => specialistLocation(value)}
    mode="dropdown" // Android only
    style={styles.picker}>
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
    style={styles.picker}>
    {dependantsDetails.map((item, index) => {
      return <Picker.Item label={item.name} value={item.id} key={index} />;
    })}
  </Picker>
);

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      specialistSearch: '',
      region: 'unknown',
    };
  }
  handleLeftPress = () => {
    const {back, navigation} = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };

  handleSearchInput = searchInput => {
    const {searchSpecialist, title} = this.props;
    const specialist = {};
    specialist.name = searchInput;
    specialist.screen =
      title == 'Book a Doctor' ? 'bd' : 'Find a Doctor' ? 'fd' : '';
    searchSpecialist(specialist);
  };

  renderRight = () => {
    const {
      white,
      title,
      navigation,
      toggleAddRecord,
      viewDoctorsOnMap,
      viewMap,
      cartItemsCount,
      wishListItemsCount,
      searchSpecialist,
      selectedLocation,
      specialistLocation,
      dependantsDetails,
      dependantSelection,
      selectedDependant,
    } = this.props;
    if (title === 'Title') {
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
      case 'Home':
        return [
          <BellButton
            key="chat-home"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-home"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case 'Categories':
        return [
          <BellButton
            key="chat-categories"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-categories"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case 'Category':
        return [
          <BellButton
            key="chat-deals"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-deals"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case 'Profile':
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
      case 'Account':
        return [
          <BellButton key="chat-profile" navigation={navigation} />,
          <BasketButton key="basket-deals" navigation={navigation} />,
        ];
      case 'Product':
        return [
          <BellButton
            key="chat-profile"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-product"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case 'Search':
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
      case 'Book a Doctor':
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
          />,
          ,
        ];
      case 'Find a Doctor':
        return [
          <LocationPicker
            key="map-open-close"
            specialistLocation={specialistLocation}
            selectedLocation={selectedLocation}
            isWhite={white}
          />,
        ];
      case 'Medical Records':
        return [
          <AddRecordButton
            key="chat-search"
            navigation={navigation}
            isWhite={white}
            toggleAddRecord={toggleAddRecord}
          />,
        ];
      case 'Dependants':
        return [
          <AddDependantButton
            key="chat-search"
            navigation={navigation}
            isWhite={white}
            toggleAddRecord={toggleAddRecord}
          />,
        ];
      case 'Pharmacy':
        return [
          <Cart
            key="chat-search"
            navigation={navigation}
            isWhite={white}
            cartItemsCount={cartItemsCount}
          />,
          <Wishlist
            key="basket-search"
            navigation={navigation}
            isWhite={white}
            wishListItemsCount={wishListItemsCount}
          />,
        ];
      case 'Your Cart Details':
        let details = [];
        let contains = false;
        const promptSelectDependant = {
          name: 'Dependant?',
          id: 0,
        };
        if (dependantsDetails) {
          for (var a = 0; a < dependantsDetails.length; a++) {
            if (Object.values(dependantsDetails[a]).includes('Dependant?')) {
              contains = true;
            }
          }
          if (contains) {
            details = dependantsDetails;
          } else {
            details = dependantsDetails;
            details.unshift(promptSelectDependant);
          }
        } else details.unshift(promptSelectDependant);

        return [
          <DependantPicker
            key="map-open-close"
            dependantsDetails={details}
            dependantSelection={dependantSelection}
            selectedDependant={selectedDependant}
            isWhite={white}
          />,
        ];
      default:
        break;
    }
  };
  renderSearch = () => {
    const {navigation, title} = this.props;
    var searchOption = '';
    if (title === 'Find a Doctor') searchOption = 'Search for specialist';
    else if (title === 'Book a Doctor')
      searchOption = 'Search favourites or Dr';
    else if (title === 'Pharmacy') searchOption = 'What are you looking for?';
    else searchOption = 'What is your Location?';

    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder={searchOption}
        name="specialistSearch"
        value={this.state.specialistSearch}
        placeholderTextColor={'#8898AA'}
        iconContent={
          <Icon
            size={16}
            color={theme.COLORS.MUTED}
            name="zoom-bold2x"
            family="NowExtra"
          />
        }
        onChangeText={specialistSearch => {
          this.setState({specialistSearch});
          this.handleSearchInput(specialistSearch);
        }}
      />
    );
  };
  renderOptions = () => {
    const {navigation, optionLeft, optionRight} = this.props;

    return (
      <Block row style={styles.options}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => navigation.navigate('Map')}>
          <Block row middle>
            <Icon
              name="bulb"
              family="NowExtra"
              size={18}
              style={{paddingRight: 8}}
              color={nowTheme.COLORS.HEADER}
            />
            <Text
              style={{fontFamily: 'montserrat-regular'}}
              size={16}
              style={styles.tabTitle}>
              {optionLeft || 'Beauty'}
            </Text>
          </Block>
        </Button>
        <Button
          shadowless
          style={styles.tab}
          onPress={() => navigation.navigate('Map')}>
          <Block row middle>
            <Icon
              size={18}
              name="bag-162x"
              family="NowExtra"
              style={{paddingRight: 8}}
              color={nowTheme.COLORS.HEADER}
            />
            <Text
              style={{fontFamily: 'montserrat-regular'}}
              size={16}
              style={styles.tabTitle}>
              {optionRight || 'Fashion'}
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };

  handleTabOption = tabOption => {
    const {headerTabOptionChange} = this.props;
    headerTabOptionChange(tabOption);
  };
  renderTabs = () => {
    const {tabs, tabIndex, navigation, navigateTo} = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;
    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        navigation={navigation}
        navigateTo={navigateTo}
        onChange={id => this.handleTabOption(id)}
      />
    );
  };
  renderHeader = () => {
    const {search, options, tabs, searchedSpecialist} = this.props;
    //console.log(searchedSpecialist);
    if (search || tabs || options) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
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
      'Search',
      'Categories',
      'Deals',
      'Pro',
      'Profile',
    ].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? {backgroundColor: 'rgba(0,0,0,0)'} : null,
    ];

    const navbarStyles = [styles.navbar, bgColor && {backgroundColor: bgColor}];
    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{alignItems: 'center'}}
          left={
            <Icon
              name={back ? 'minimal-left2x' : 'align-left-22x'}
              family="NowExtra"
              size={16}
              onPress={this.handleLeftPress}
              color={
                iconColor ||
                (white ? nowTheme.COLORS.WHITE : nowTheme.COLORS.ICON)
              }
            />
          }
          leftStyle={{paddingVertical: 12, flex: 0.2}}
          titleStyle={[
            styles.title,
            {color: nowTheme.COLORS[white ? 'WHITE' : 'HEADER']},
            titleColor && {color: titleColor},
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
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'montserrat-regular',
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
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 6,
  },
  phamarcyCount: {
    fontSize: 12,
    fontFamily: 'montserrat-regular',
    color: theme.COLORS.WHITE,
  },
  phamarcyNotify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 12,
    height: theme.SIZES.BASE * 1.5,
    width: theme.SIZES.BASE * 1.5,
    position: 'absolute',
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
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
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
    fontWeight: '400',
    color: nowTheme.COLORS.HEADER,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  picker: {
    //marginVertical: 30,
    width: 150,
    padding: 10,
    borderWidth: 1,
    borderColor: '#666',
  },
});

const mapDispatchToProps = dispatch => ({
  toggleAddRecord: () => dispatch(toggleAddRecord()),
  viewDoctorsOnMap: () => dispatch(viewDoctorsOnMap()),
  searchSpecialist: specialist => dispatch(searchSpecialist(specialist)),
  specialistLocation: location => dispatch(specialistLocation(location)),
  dependantSelection: dependant => dispatch(dependantSelection(dependant)),
  headerTabOptionChange: tabOption =>
    dispatch(headerTabOptionChange(tabOption)),
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
});

//export default withNavigation(Header);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Header));
