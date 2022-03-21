import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {Block, Text, Button as GaButton, theme} from 'galio-framework';

// Now UI themed components
import {nowTheme} from '../../constants';
import phamarcies from '../../constants/phamarcies';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  selectedPhamarcyLocation,
  selectSearchedPhamarcy,
} from '../../redux/pharmacy/pharmacy-selectors';
import {searchPhamarcy} from '../../redux/pharmacy/pharmacy-actions';
import {fetchMedicalrecords} from '../../redux/user/user-actions';

import MapScreen from './Maps';
import PhamarcyCard from '../../components/Cards/PhamarcyCard';
import Carousel from 'react-native-snap-carousel';
import {
  scrollInterpolator,
  animatedStyles,
} from '../../components/Carousel_Animations';
const {width} = Dimensions.get('screen');
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const thumbMeasure = (width - 48 - 32) / 3;

class NewPhamarcy extends React.Component {
  state = {
    phamarcyData: phamarcies,
    index: 0,
  };
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    this.props.fetchMedicalrecords();
  }
  componentWillUnmount() {}

  phamarciesByProvinceAndSearch(name) {
    const {selectedPhamarcyLocation, searchedPhamarcy} = this.props;
    const {phamarcyData} = this.state;
    var phamarcies = [];
    var newName = name.toString().toLowerCase().replace(/ /g, '~');
    for (var x = 0; x < phamarcyData.length; x++) {
      if (selectedPhamarcyLocation == phamarcyData[x].province) {
        const phamarcyName = phamarcyData[x].name
          .toLowerCase()
          .replace(/ /g, '~');
        if (phamarcyName.includes(newName)) {
          phamarcies.push(phamarcyData[x]);
        } else if (newName === '') {
          phamarcies.push(phamarcyData[x]);
        }
      }
      if (selectedPhamarcyLocation === 'Location?' && name === '') {
        phamarcies = phamarcyData;
        break;
      } else if (
        selectedPhamarcyLocation === 'Location?' &&
        phamarcyData[x].name
          .toLowerCase()
          .replace(/ /g, '~')
          .includes(name.toString().toLowerCase().replace(/ /g, '~'))
      ) {
        phamarcies.push(phamarcyData[x]);
      }
    }

    return phamarcies;
  }
  _renderItem({item}) {
    const {navigation} = this.props;
    return (
      <Block flex row>
        <PhamarcyCard item={item} full navigation={navigation} />
      </Block>
    );
  }

  renderCarousel = phamarciesSelected => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: 0}}>
        <Block flex>
          <Carousel
            ref={c => (this.carousel = c)}
            data={phamarciesSelected}
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
  };

  renderPharmacy = () => {
    const {
      navigation,
      selectedPhamarcyLocation,
      searchedPhamarcy,
      searchPhamarcy,
    } = this.props;
    //const {name} = searchedPhamarcy;
    //const phamarcyName = name ? name : '';
    //const searchedScreen = screen ? screen : '';
    const name =
      typeof searchedPhamarcy.phamarcy !== 'undefined'
        ? searchedPhamarcy.phamarcy.name
        : '';
    const phamarciesSelected = this.phamarciesByProvinceAndSearch(name);

    return (
      <>
        <MapScreen
          phamarciesSelected={phamarciesSelected}
          navigation={navigation}
          selectedPhamarcyLocation={selectedPhamarcyLocation}
        />
        {typeof searchedPhamarcy.phamarcy !== 'undefined' ? (
          searchedPhamarcy.phamarcy.name != '' ? (
            <TouchableWithoutFeedback
              onPress={() => searchPhamarcy({name: '', screen: 'ph'})}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  textDecorationLine: 'underline',
                  marginTop: 10,
                  marginLeft: 10,
                }}>
                View all Phamarcies
              </Text>
            </TouchableWithoutFeedback>
          ) : null
        ) : null}
        {this.renderCarousel(phamarciesSelected)}
      </>
    );
  };
  render() {
    return <>{this.renderPharmacy()}</>;
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
  searchPhamarcy: phamarcy => dispatch(searchPhamarcy(phamarcy)),
  fetchMedicalrecords: () => dispatch(fetchMedicalrecords()),
});

const mapStateToProps = createStructuredSelector({
  selectedPhamarcyLocation: selectedPhamarcyLocation,
  searchedPhamarcy: selectSearchedPhamarcy,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPhamarcy);
