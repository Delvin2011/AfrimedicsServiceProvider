import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Block, theme, Text} from 'galio-framework';
import {Images} from '../constants';
import {modules} from '../constants';
import ModuleCard from '../components/Cards/ModuleCard';

import Carousel from 'react-native-snap-carousel';
import {
  scrollInterpolator,
  animatedStyles,
} from '../components/Carousel_Animations';

const {width} = Dimensions.get('screen');
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

const DATA = [];
for (let i = 0; i < 4; i++) {
  DATA.push(i);
}

class Home extends React.Component {
  state = {
    index: 0,
  };
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }
  renderCards = () => {
    return (
      <Block flex card center shadow style={styles.category}>
        <ImageBackground
          source={Images.Products['path']}
          style={[
            styles.imageBlock,
            {width: width - theme.SIZES.BASE * 2, height: 150},
          ]}
          imageStyle={{
            width: width - theme.SIZES.BASE * 2,
            height: 150,
          }}>
          <Block style={styles.categoryTitle}>
            <Text size={18} bold color={theme.COLORS.WHITE}>
              Covid Assist
            </Text>
          </Block>
        </ImageBackground>
      </Block>
    );
  };

  renderArticles = () => {
    return (
      <Block flex>
        <Block flex row>
          <ModuleCard
            item={modules[0]}
            style={{marginRight: theme.SIZES.BASE}}
          />
          <ModuleCard item={modules[1]} />
        </Block>
        <Block flex row>
          <ModuleCard
            item={modules[2]}
            style={{marginRight: theme.SIZES.BASE}}
          />
          <ModuleCard item={modules[3]} />
        </Block>
      </Block>
    );
  };

  _renderItem({item}) {
    return (
      <Block flex row>
        <ModuleCard item={modules[`${item}`]} />
      </Block>
    );
  }
  renderCarousel() {
    return (
      <Block flex>
        <Carousel
          ref={c => (this.carousel = c)}
          data={DATA}
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
    );
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}>
          {this.renderCards()}
          {this.renderArticles()}
          {this.renderCarousel()}
        </ScrollView>
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
});

export default Home;
