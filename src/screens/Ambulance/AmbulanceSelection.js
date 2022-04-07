import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {Block, Text, Button as GaButton, theme} from 'galio-framework';

import ambulancies from '../../constants/ambulancies';

import AmbulanceCard from '../../components/Cards/AmbulanceCard';
import Carousel from 'react-native-snap-carousel';
import {
  scrollInterpolator,
  animatedStyles,
} from '../../components/Carousel_Animations';
const {width} = Dimensions.get('screen');
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

class Ambulancies extends React.Component {
  state = {
    index: 0,
  };
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem({item}) {
    const {navigation} = this.props;
    return (
      <Block flex row>
        <AmbulanceCard item={item} full navigation={navigation} />
      </Block>
    );
  }

  renderCarousel = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: 0}}>
        <Block flex>
          <Carousel
            ref={c => (this.carousel = c)}
            data={ambulancies}
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

  renderAmbulance = () => {
    return <>{this.renderCarousel()}</>;
  };
  render() {
    return <>{this.renderAmbulance()}</>;
  }
}

export default Ambulancies;

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 25,
  },
});
