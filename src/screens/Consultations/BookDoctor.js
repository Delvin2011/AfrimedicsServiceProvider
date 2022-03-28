import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  Animated,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {Block, theme, Text} from 'galio-framework';
//import {Card} from '../../components';
import SpecialistCard from '../../components/Cards/SpecialistCard';

import {withNavigation} from '@react-navigation/compat';
import Carousel from 'react-native-snap-carousel';
import {
  scrollInterpolator,
  animatedStyles,
} from '../../components/Carousel_Animations';
import Specialist_Data from '../../constants/specialists';
import MapScreen from '../../screens/Consultations/Maps';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  selectViewDoctorsOnMap,
  selectSeachedSpecialist,
  selectSpecialistLocation,
} from '../../redux/user/user-selectors';
import {searchSpecialist} from '../../redux/user/user-actions';
//Item array for the dropdow
const {width} = Dimensions.get('screen');
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

class BookDoctor extends React.Component {
  state = {
    index: 0,
    data: Specialist_Data,
    selectedValues: [],
  };
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem({item}) {
    return (
      <Block flex row>
        <SpecialistCard item={item} full />
      </Block>
    );
  }

  siphonListBySpecialty = code => {
    var array = [];
    for (var item in this.state.data) {
      if (this.state.data.hasOwnProperty(item)) {
        array.push(this.state.data[item]);
      }
    }
    for (var a = 0; a < array.length; a++) {
      if (code === array[a].routeName) {
        return array[a].items;
      }
    }
    return null;
  };

  siphonFilteredListByCity = (
    specialistLists,
    selectedLocation,
    searchedSpecialist,
    searchedScreen,
  ) => {
    var array = [];
    var loc = selectedLocation;
    for (var item in specialistLists) {
      if (specialistLists.hasOwnProperty(item)) {
        //for (var x = 0; x < loc.length; x++) {
        if (loc === specialistLists[item].Location) {
          const searchedTitle = specialistLists[item].title
            .toLowerCase()
            .split(' ')[1];
          if (
            searchedTitle.includes(
              searchedSpecialist.toString().toLowerCase(),
            ) &&
            searchedScreen === 'bd'
          ) {
            array.push(specialistLists[item]);
          } else if (searchedSpecialist === '') {
            array.push(specialistLists[item]);
          }
        }
      }
      //}
    }
    return array;
  };

  renderCarousel(specialistListsByCity) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: 0}}>
        <Block flex>
          <Carousel
            ref={c => (this.carousel = c)}
            data={specialistListsByCity}
            renderItem={this._renderItem}
            sliderWidth={width}
            itemWidth={ITEM_WIDTH}
            containerCustomStyle={styles.carouselContainer}
            inactiveSlideShift={0}
            onSnapToItem={index => this.setState({index})}
            scrollInterpolator={scrollInterpolator}
            slideInterpolatedStyle={animatedStyles}
            useScrollView={true}
          />
        </Block>
      </ScrollView>
    );
  }

  render() {
    const {
      navigation,
      bookingFilters,
      viewMap,
      searchedSpecialists,
      selectedSpecialist,
      selectedLocation,
      searchSpecialist,
    } = this.props;
    const {title, code} = selectedSpecialist;
    //All the specialists with same specialty, e.g cardilogists.
    const specialistLists = this.siphonListBySpecialty(code);
    //searched specialist
    const {name, screen} = searchedSpecialists.specialist;
    const searchedSpecialist = name ? name : '';
    const searchedScreen = screen ? screen : '';
    const specialistListsByCity = this.siphonFilteredListByCity(
      specialistLists,
      selectedLocation,
      searchedSpecialist,
      searchedScreen,
    );
    return (
      <>
        <MapScreen
          specialistListsByCity={specialistListsByCity}
          navigation={navigation}
        />
        {searchedSpecialists.specialist.name != '' ? (
          <TouchableWithoutFeedback
            onPress={() => searchSpecialist({name: '', screen: 'bd'})}>
            <Text
              style={{
                fontWeight: 'bold',
                fontStyle: 'italic',
                textDecorationLine: 'underline',
                marginTop: 10,
                marginLeft: 10,
              }}>
              View all Specialists
            </Text>
          </TouchableWithoutFeedback>
        ) : null}
        {viewMap ? this.renderCarousel(specialistListsByCity) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    // width: width - theme.SIZES.BASE * 2,
    marginLeft: '12.5%',
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

const mapDispatchToProps = dispatch => ({
  searchSpecialist: specialist => dispatch(searchSpecialist(specialist)),
});

const mapStateToProps = createStructuredSelector({
  viewMap: selectViewDoctorsOnMap,
  searchedSpecialists: selectSeachedSpecialist,
  selectedLocation: selectSpecialistLocation,
});

//export default withNavigation(Header);
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(BookDoctor),
);

//import SpecialistCard from '../components/Cards/SpecialistCard';
//import DateTimePicker from '../components/DateTimePicker';
