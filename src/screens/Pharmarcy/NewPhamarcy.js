import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Dimensions, View} from 'react-native';
import {Block, Text, Button as GaButton, theme} from 'galio-framework';

// Now UI themed components
import {nowTheme} from '../../constants';
import phamarcies from '../../constants/phamarcies';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectedPhamarcyLocation} from '../../redux/pharmacy/pharmacy-selectors';
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

  phamarciesByProvince() {
    const {selectedPhamarcyLocation} = this.props;
    const {phamarcyData} = this.state;
    var phamarcies = [];
    for (var x = 0; x < phamarcyData.length; x++) {
      if (selectedPhamarcyLocation == phamarcyData[x].province) {
        phamarcies.push(phamarcyData[x]);
      }
    }
    if (phamarcies.length == 0) {
      phamarcies = phamarcyData;
    }
    return phamarcies;
  }
  _renderItem({item}) {
    return (
      <Block flex row>
        <PhamarcyCard item={item} full />
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
    const {navigation, selectedPhamarcyLocation} = this.props;
    var phamarciesSelected = this.phamarciesByProvince();

    return (
      <>
        <MapScreen
          phamarciesSelected={phamarciesSelected}
          navigation={navigation}
          selectedPhamarcyLocation={selectedPhamarcyLocation}
        />
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

const mapStateToProps = createStructuredSelector({
  selectedPhamarcyLocation: selectedPhamarcyLocation,
});

export default connect(mapStateToProps, null)(NewPhamarcy);
