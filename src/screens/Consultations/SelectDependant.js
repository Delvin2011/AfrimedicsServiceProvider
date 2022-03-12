import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Block, theme, Text} from 'galio-framework';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
//import SearchableDropdown component
import SearchableDropdown from 'searchable-dropdown-react-native';
import Button from '../../components/Button';
import {searchSpecialist} from '../../redux/user/user-actions';
import {selectUserDependants} from '../../redux/user/user-selectors';
//Item array for the dropdown
let items = [
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

const {width} = Dimensions.get('screen');
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

class SelectDependant extends React.Component {
  state = {
    index: 0,
    selectedDependantValues: [],
    depVal: 'Search Dependant',
    selectDependant: false,
  };
  constructor(props) {
    super(props);
    this._setDependantItem = this._setDependantItem.bind(this);
    this._renderSelectedDependant = this._renderSelectedDependant.bind(this);
  }

  //Not being used
  componentDidMount() {
    const {searchSpecialist} = this.props;
    const specialist = {};
    searchSpecialist(specialist);
    //this.setState({ bookForDependant: false });
  }
  componentWillUnmount() {
    const {searchSpecialist} = this.props;
    const specialist = {};
    searchSpecialist(specialist);
  }

  _setDependantItem(item) {
    let x =
      item.length == 0
        ? 'Search Dependant'
        : item.length == 1
        ? item[0]
        : item.length + ' Dependants Selected';
    this.setState({selectedDependantValues: item, depVal: x});
  }

  _renderSelectedDependant() {
    const buttonColor = 1;
    const buttonColors = buttonColor == 1 ? 'primary' : 'default';
    const {navigation, searchSpecialist, bookingDetails} = this.props;
    const specialist = {};
    const {title, code, selectedCities, bookDependant} = bookingDetails;

    return (
      <Block flex center>
        {this.state.selectedDependantValues.length > 1 ? (
          <>
            <Block row middle space="between">
              <Text
                style={{fontFamily: 'montserrat-regular'}}
                size={14}
                //color={nowTheme.COLORS.TEXT}
              >
                Select one dependant!!!
              </Text>
            </Block>
            <Button
              style={{
                width: 120,
                height: 44,
                marginHorizontal: 5,
                elevation: 0,
                marginTop: 70,
              }}
              textStyle={{fontSize: 14}}
              color="default">
              Find Doctors
            </Button>
          </>
        ) : (
          <Button
            onPress={() => {
              navigation.navigate('BookDoctor', {
                bookingFilters: {
                  title: title,
                  code: code,
                  bookDependant: bookDependant,
                  selectedCities: selectedCities,
                  selectedDependant: this.state.selectedDependantValues,
                },
              });
              searchSpecialist(specialist);
            }}
            style={{
              width: 120,
              height: 44,
              marginHorizontal: 5,
              elevation: 0,
              marginTop: 70,
            }}
            textStyle={{fontSize: 14}}
            color={buttonColors}>
            Find Doctors
          </Button>
        )}
      </Block>
    );
  }

  _renderDependantsList() {
    const {dependantsDetails} = this.props;
    return (
      <Block flex left style={styles.home}>
        <SearchableDropdown
          options={dependantsDetails}
          selectedValues={this.state.selectedDependantValues}
          setSelectedValues={this._setDependantItem}
          label=""
          placeholder={this.state.depVal}
          inputSize={300}
          addNewElementText="No"
        />
      </Block>
    );
  }

  render() {
    const selectedDependants = this.state.selectedDependantValues.length;
    return (
      <>
        {this._renderDependantsList()}
        {selectedDependants > 0 ? this._renderSelectedDependant() : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    // width: width - theme.SIZES.BASE * 2,
    marginLeft: '12.5%',
    height: 10,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
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
  carouselContainer: {
    marginTop: 25,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
  },
  itemLabel: {
    color: 'white',
    fontSize: 24,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

//export default SelectLocation;

const mapDispatchToProps = dispatch => ({
  searchSpecialist: specialist => dispatch(searchSpecialist(specialist)),
});

const mapStateToProps = createStructuredSelector({
  dependantsDetails: selectUserDependants,
});

//export default withNavigation(Header);
export default connect(mapStateToProps, mapDispatchToProps)(SelectDependant);
