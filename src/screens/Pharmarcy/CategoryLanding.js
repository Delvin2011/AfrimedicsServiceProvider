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

import PharmacyProductCard from '../../components/Cards/PharmacyProductCard';
import {withNavigation} from '@react-navigation/compat';
//import articles from '../constants/articles';
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

const {width} = Dimensions.get('screen');
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

const DATA = [];
for (let i = 4; i < 9; i++) {
  DATA.push(i);
}

class CategoryLanding extends React.Component {
  state = {
    index: 0,
  };
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    const {fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync();
  }
  componentWillUnmount() {
    const {fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync();
  }

  _renderItem({item}) {
    return (
      <Block flex row>
        <PharmacyProductCard item={item} popular />
      </Block>
    );
  }
  renderCarousel() {
    const {isFetching, isLoaded, collections, category} = this.props;

    let categoryCollections = [];
    if (isLoaded) {
      for (var a = 0; a < collections.length; a++) {
        if (collections[a].title == category) {
          for (var b = 0; b < collections[a].items.length; b++) {
            if (collections[a].items[b].popular == '1') {
              categoryCollections.push(collections[a].items[b]);
            }
          }
          break;
        }
      }
    }
    return (
      <>
        <Block flex>
          <Text
            style={{fontFamily: 'montserrat-regular'}}
            size={18}
            //style={titleStyles}
            //color={nowTheme.COLORS.PRIMARY}
          >
            {'Popular in ' + category + ' category'}
          </Text>
        </Block>
        <Block flex>
          {isLoaded ? (
            <Carousel
              ref={c => (this.carousel = c)}
              data={categoryCollections}
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
      </>
    );
  }

  renderArticles = () => {
    const {isFetching, isLoaded, collections, category} = this.props;
    return (
      <>
        <Block flex>
          <Text
            style={{fontFamily: 'montserrat-regular'}}
            size={18}
            //style={titleStyles}
            //color={nowTheme.COLORS.PRIMARY}
          >
            {'Items in ' + category + ' category'}
          </Text>
        </Block>
        <Block
          row
          space="between"
          style={{marginTop: theme.SIZES.BASE * 0.75, flexWrap: 'wrap'}}>
          {isLoaded ? (
            <>
              {collections
                .filter(item => item.title === category)
                .map(filterItem => {
                  return filterItem.items
                    .filter(item => item.popular === '0')
                    .map(item => (
                      <PharmacyProductCard key={item.id} item={item} />
                    ));
                })}
            </>
          ) : null}
        </Block>
      </>
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
            {this.renderArticles()}
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

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsCollectionFetching,
  isLoaded: selectIsCollectionsLoaded,
  collections: selectCollectionsForPreview,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(CategoryLanding));
