import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import AnalyticsCardComponent from '../../components/Dashboard/AnalyticsCardComponent';

describe('Renders <AnalyticsCardComponent /> correctly', () => {
  const props = {
    assetNumber: 0,
    assetState: '',
    image: '',
    cssClass: ''
  };

  const wrapper = shallow(<AnalyticsCardComponent {...props} />);

  it('renders correctly', () => {
    expect(wrapper.find('.analytics-states-top-text').length).toBe(1);
  });
});
