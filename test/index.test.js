import React from 'react';
import { View, Text } from 'react-native';
import { mount } from 'enzyme';
import Carousel, { Pagination } from '../src';

describe('<Carousel />', () => {
  test('renders correctly', () => {
    const data = [
      { text: '#1' },
      { text: '#2' },
      { text: '#3' },
    ];
    const renderItem = d => (
      <View key={d.text}>
        <Text>{d.text}</Text>
      </View>
    );
    const wrapper = mount(
      <Carousel
        data={data}
        renderItem={renderItem}
        pagination={Pagination}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
