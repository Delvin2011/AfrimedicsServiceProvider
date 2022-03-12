import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Block, theme, Text} from 'galio-framework';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Button from '../../components/Button';
import Switch from '../../components/Switch';
import {searchSpecialist} from '../../redux/user/user-actions';
import {selectUserDependants} from '../../redux/user/user-selectors';
import {Picker} from '@react-native-picker/picker';
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

class SelectLocation extends React.Component {
  state = {
    index: 0,
    selectedValues: [],
    val: 'Search Location/s',
    bookForDependant: false,
    selectDependant: false,
    country: 'unknown',
    dependant: '',
  };
  constructor(props) {
    super(props);
    //this._setItem = this._setItem.bind(this);
    this._renderDrsInSelectedCities =
      this._renderDrsInSelectedCities.bind(this);
    this.toggleBookForDependant = this.toggleBookForDependant.bind(this);
  }

  //Not being used
  componentDidMount() {
    const {searchSpecialist} = this.props;
    const specialist = {};
    searchSpecialist(specialist);
    this.setState({bookForDependant: false});
  }
  componentWillUnmount() {
    const {searchSpecialist} = this.props;
    const specialist = {};
    searchSpecialist(specialist);
    this.setState({bookForDependant: false});
  }

  /* _setItem(item) {
    let x =
      item.length == 0
        ? 'Search Location/s'
        : item.length == 1
        ? item[0]
        : item.length + ' Locations Selected';
    this.setState({selectedValues: item, val: x});
  }*/

  toggleBookForDependant() {
    this.setState({bookForDependant: !this.state.bookForDependant});
  }

  _renderDrsInSelectedCities() {
    const buttonColor = 1;
    const buttonColors = buttonColor == 1 ? 'primary' : 'default';
    const {title, code} = this.props.specialist;
    const {navigation, searchSpecialist} = this.props;
    const specialist = {};
    return (
      <Block flex center>
        <Block row middle space="between">
          <Text
            style={{fontFamily: 'montserrat-regular'}}
            size={14}
            //color={nowTheme.COLORS.TEXT}
          >
            Book for Dependant?
          </Text>
          <Switch
            onValueChange={this.toggleBookForDependant}
            value={this.state.bookForDependant}
          />
        </Block>
        {this.state.bookForDependant ? (
          <Button
            onPress={() => {
              navigation.navigate('SelectDependant', {
                bookingDetails: {
                  title: title,
                  code: code,
                  selectedCities: this.state.selectedValues,
                  bookDependant: true,
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
            Next
          </Button>
        ) : (
          <Button
            onPress={() => {
              navigation.navigate('BookDoctor', {
                bookingFilters: {
                  title: title,
                  code: code,
                  selectedCities: this.state.selectedValues,
                  bookDependant: false,
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

  _renderCitySelection() {
    const {dependantsDetails} = this.props;
    return (
      <Block flex left style={styles.home}>
        <Text bold size={16} color="#333" style={{marginTop: 20}}>
          Select Location
        </Text>

        <Picker
          selectedValue={this.state.country}
          onValueChange={(value, index) => this.setState({country: value})}
          mode="dropdown" // Android only
          style={styles.picker}>
          {items.map((item, index) => {
            return (
              <Picker.Item label={item.name} value={item.value} key={index} />
            );
          })}
        </Picker>
        <Text bold size={16} color="#333" style={{marginTop: 20}}>
          Book for Dependant
        </Text>
        <Block style={{marginTop: 20, marginLeft: 10}}>
          <Switch
            onValueChange={this.toggleBookForDependant}
            value={this.state.bookForDependant}
          />
        </Block>
        {this.state.bookForDependant ? (
          <Block>
            <Text bold size={16} color="#333" style={{marginTop: 20}}>
              Select Dependant
            </Text>
            <Picker
              selectedValue={this.state.dependant}
              onValueChange={(value, index) =>
                this.setState({dependant: value})
              }
              mode="dropdown" // Android only
              style={styles.picker}>
              {dependantsDetails.map((item, index) => {
                return (
                  <Picker.Item
                    label={item.name}
                    value={item.name}
                    key={index}
                  />
                );
              })}
            </Picker>
          </Block>
        ) : null}
      </Block>
    );
  }

  render() {
    const selectedCities = this.state.selectedValues.length;
    //const selectedCities = this.state.selectedValues.length;
    const {dependantsDetails} = this.props;
    return (
      <>
        {this._renderCitySelection()}
        {this._renderDrsInSelectedCities()}
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
  picker: {
    //marginVertical: 30,
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderColor: '#666',
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
export default connect(mapStateToProps, mapDispatchToProps)(SelectLocation);
