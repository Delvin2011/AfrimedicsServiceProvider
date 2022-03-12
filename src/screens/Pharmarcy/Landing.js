import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Animated,
  View,
} from 'react-native';
import {Block, theme, Text} from 'galio-framework';
import {Card, Button} from '../../components';
import CarouselCard from '../../components/Cards/CarouselCard';

import PharmacyProductCard from '../../components/Cards/PharmacyProductCard';
import {withNavigation} from '@react-navigation/compat';
import {Images, nowTheme, articles, tabs} from '../../constants';

import Carousel from 'react-native-snap-carousel';
import {
  scrollInterpolator,
  animatedStyles,
} from '../../components/Carousel_Animations';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
  selectCollectionsForPreview,
} from '../../redux/pharmacy/pharmacy-selectors';
import {fetchCollectionsStartAsync} from '../../redux/pharmacy/pharmacy-actions';
import {fetchCartItems} from '../../redux/cart/cart-actions';
import {fetchWishListItems} from '../../redux/wishList/wishList-actions';
import {fetchPharmacyOrderItems} from '../../redux/pharmacy/pharmacy-actions';

const {width} = Dimensions.get('screen');
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

const DATA = [];
for (let i = 4; i < 9; i++) {
  DATA.push(i);
}

class Landing extends React.Component {
  state = {
    index: 0,
  };
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    const {fetchCollectionsStartAsync, fetchCartItems, fetchWishListItems} =
      this.props;
    fetchCollectionsStartAsync();
    fetchCartItems();
    fetchWishListItems();
    fetchPharmacyOrderItems();
  }
  componentWillUnmount() {
    const {fetchCollectionsStartAsync, fetchCartItems, fetchWishListItems} =
      this.props;
    fetchCollectionsStartAsync();
    fetchCartItems();
    fetchWishListItems();
    fetchPharmacyOrderItems();
  }

  _renderItem({item}) {
    return (
      <Block flex row>
        <CarouselCard item={item} />
      </Block>
    );
  }
  renderCarousel() {
    const {isFetching, isLoaded, collections} = this.props;

    return (
      <Block flex>
        {isLoaded ? (
          <Carousel
            ref={c => (this.carousel = c)}
            data={collections}
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
        ) : null}
      </Block>
    );
  }

  renderPhamarcyProducts = () => {
    const {isFetching, isLoaded, collections} = this.props;
    return (
      <Block
        row
        space="between"
        style={{marginTop: theme.SIZES.BASE, flexWrap: 'wrap'}}>
        {isLoaded ? (
          <>
            {collections.map(filterItem => {
              return filterItem.items
                .filter(item => item.popular === '1')
                .map(item => <PharmacyProductCard key={item.id} item={item} />);
            })}
          </>
        ) : null}
      </Block>
    );
  };

  render() {
    const {isFetching} = this.props;
    return (
      <Block flex center style={styles.home}>
        {isFetching ? (
          <View
            style={[
              styles.activityIndicatorContainer,
              styles.activityIndicatorHorizontal,
            ]}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.articles}>
            {this.renderCarousel()}
            {this.renderPhamarcyProducts()}
          </ScrollView>
        )}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
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
    flex: 1,
    //flexDirection: 'row',
    //flexWrap: 'wrap',
    //alignItems: 'flex-start',
    //alignItems: 'center',
    //justifyContent: 'space-between',
    //width: '100%',
    //flexDirection: 'column',
    //flexWrap: 'wrap',
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
  spinnerTextStyle: {
    color: '#FFF',
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  activityIndicatorHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

//export default Landing;

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
  fetchCartItems: () => dispatch(fetchCartItems()),
  fetchWishListItems: () => dispatch(fetchWishListItems()),
  fetchPharmacyOrderItems: () => dispatch(fetchPharmacyOrderItems()),
});

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsCollectionFetching,
  isLoaded: selectIsCollectionsLoaded,
  collections: selectCollectionsForPreview,
});

//export default withNavigation(Header);
//export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Landing));

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Landing));
