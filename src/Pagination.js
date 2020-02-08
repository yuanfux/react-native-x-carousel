import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const Pagination = (props) => {
  const {
    total,
    currentPage,
    theme,
  } = props;

  const opacities = theme === 'dark' ? [0.5, 0.2] : [0.8, 0.4];

  const renderDots = () => {
    const Dots = [];
    for (let i = 0; i < total; i += 1) {
      const isActive = currentPage === i + 1;

      const additionalStyle = {
        opacity: isActive ? opacities[0] : opacities[1],
        marginLeft: i === 0 ? 0 : 8,
        backgroundColor: theme === 'dark' ? '#000' : '#fff',
      };

      Dots.push((
        <View
          key={`pagination-dot-${i}`}
          style={[
            styles.dot,
            additionalStyle,
          ]}
        />
      ));
    }
    return Dots;
  };

  return (
    <View
      style={styles.container}
    >
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '5%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  theme: PropTypes.oneOf(['dark', 'light']),
};

Pagination.defaultProps = {
  theme: 'dark',
};

const PaginationLight = props => (
  <Pagination
    {...props}
    theme="light"
  />
);

export default Pagination;

export {
  PaginationLight,
};
