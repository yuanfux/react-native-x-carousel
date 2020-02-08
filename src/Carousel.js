import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const NUM_OF_DUP = 3;

const approximatelyEqualTo = (a, b, epsilon = 0.01) => Math.abs(a - b) < epsilon;

export default class Carousel extends Component {
  scrollView = React.createRef();

  state = {
    currentPage: 1,
    childWidth: 0,
  }

  componentWillUnmount() {
    this.setAutoPlay(false);
  }

  isLooped = () => {
    const { data, loop } = this.props;
    return loop && data.length > 1;
  }

  setAutoPlay = (start) => {
    if (start) {
      this.setAutoPlay(false);
      const { data, autoplayInterval } = this.props;
      this.autoplayTimeout = setTimeout(() => {
        const isLooped = this.isLooped();
        const { childWidth, currentPage } = this.state;
        const isLastPage = data.length === currentPage;

        // compute new scroll x
        let scrollX;
        if (isLooped) {
          const loopOffset = data.length >= NUM_OF_DUP ? NUM_OF_DUP : data.length;
          scrollX = childWidth * (currentPage + loopOffset);
        } else {
          scrollX = isLastPage ? 0 : childWidth * currentPage;
        }

        this.scrollView.current.scrollTo({
          x: scrollX,
          animated: true,
        });
      }, autoplayInterval);
    } else {
      clearTimeout(this.autoplayTimeout);
    }
  }

  onScroll = ({
    nativeEvent: { contentOffset: { x } },
  }) => {
    this.setAutoPlay(false);
    const { data, autoplay } = this.props;
    const { currentPage: prevPage, childWidth } = this.state;
    const isLooped = this.isLooped();

    // compute loop offset
    let loopOffset = 0;
    if (isLooped) {
      loopOffset = data.length >= NUM_OF_DUP ? NUM_OF_DUP : data.length;
    }

    // raw float page number
    const rawCurrentPage = x / childWidth;
    // rounded page number
    const roundCurrentPage = Math.round(rawCurrentPage);
    // cut front dup
    const normalizedPage = roundCurrentPage - loopOffset;
    // normalize page number
    let currentPage = normalizedPage + 1;
    if (normalizedPage < 0) {
      currentPage = data.length + normalizedPage + 1;
    } else if (normalizedPage >= data.length) {
      currentPage = (normalizedPage % data.length) + 1;
    }

    const isScrollEnd = approximatelyEqualTo(rawCurrentPage, roundCurrentPage);
    // reset loop offset
    if (
      isLooped
      && isScrollEnd
      && (
        normalizedPage < 0
        || normalizedPage >= data.length
      )
    ) {
      this.scrollView.current.scrollTo({
        x: (currentPage - 1 + loopOffset) * childWidth,
        animated: false,
      });
    }

    // restart autoplay
    if (isScrollEnd && autoplay) {
      this.setAutoPlay(true);
    }

    // page number changes
    if (currentPage !== prevPage) {
      this.setState({
        currentPage,
      });
      const { onPage } = this.props;
      onPage({
        prev: prevPage,
        current: currentPage,
      });
    }
  }

  onContentSizeChange = (contentWidth) => {
    const { data, autoplay } = this.props;
    const isLooped = this.isLooped();
    const loopOffset = data.length >= NUM_OF_DUP ? NUM_OF_DUP : data.length;

    // compute total number of children
    const childrenNum = isLooped ? data.length + loopOffset * 2 : data.length;

    this.setState({
      childWidth: contentWidth / childrenNum,
    }, () => {
      // set loop initial offset
      if (isLooped) {
        const { childWidth } = this.state;
        this.scrollView.current.scrollTo({
          x: childWidth * loopOffset,
          animated: false,
        });
      }
      if (autoplay) {
        this.setAutoPlay(true);
      }
    });
  }

  renderItems = () => {
    const {
      data,
      renderItem,
    } = this.props;

    let normalizedData = data;
    const isLooped = this.isLooped();
    let loopOffset = 0;
    if (isLooped) {
      const frontDup = data.slice(-NUM_OF_DUP);
      const endDup = data.slice(0, NUM_OF_DUP);
      loopOffset = frontDup.length;
      normalizedData = frontDup.concat(data, endDup);
    }

    return normalizedData.map((item, index) => {
      const normalizedIndex = index - loopOffset;
      // renderIndex should be within the range of [0, data.length - 1]
      let renderIndex = normalizedIndex % data.length;
      renderIndex = renderIndex < 0 ? data.length + renderIndex : renderIndex;
      const renderedItem = renderItem(item, renderIndex);

      // avoid duplicated keys
      let { key } = renderedItem;
      if (normalizedIndex < 0) {
        key = `${key}-front-dup`;
      } else if (normalizedIndex >= data.length) {
        key = `${key}-end-dup`;
      }
      return (
        <React.Fragment key={key}>
          { renderedItem }
        </React.Fragment>
      );
    });
  }

  renderPagination = () => {
    const {
      data,
      pagination: Pagination,
    } = this.props;
    const { currentPage } = this.state;

    let pagination = null;
    if (Pagination) {
      pagination = (
        <Pagination
          currentPage={currentPage}
          total={data.length}
        />
      );
    }
    return pagination;
  }

  render = () => {
    const {
      childWidth,
    } = this.state;

    return (
      <View>
        <ScrollView
          ref={this.scrollView}
          style={[
            styles.scrollView,
            { width: childWidth },
          ]}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
          // iOS & Android should have used onMomentumScrollEnd
          // the issue https://github.com/facebook/react-native/issues/21718
          // onMomentumScrollEnd={this.onMomentumScrollEnd}
          onScrollEndDrag={this.onScrollEndDrag}
          scrollEventThrottle={16}
          onScroll={this.onScroll}
          onContentSizeChange={this.onContentSizeChange}
        >
          {
            this.renderItems()
          }
        </ScrollView>
        {
          this.renderPagination()
        }
      </View>
    );
  };
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
  },
});

Carousel.propTypes = {
  renderItem: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  loop: PropTypes.bool,
  autoplay: PropTypes.bool,
  autoplayInterval: PropTypes.number,
  pagination: PropTypes.elementType,
  onPage: PropTypes.func,
};

Carousel.defaultProps = {
  data: [],
  loop: false,
  autoplay: false,
  autoplayInterval: 2000,
  pagination: null,
  onPage: () => {},
};
