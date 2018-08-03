import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import AssetConditionActionComponent from '../../components/AssetCondition/AssetConditionActionComponent';

describe('Renders <AssetTypesAction /> correctly', () => {
  const props = {};
  const wrapper = shallow(<AssetConditionActionComponent {...props} />);

  it('renders the  ActionComponent component', () => {
    expect(wrapper.find('ActionComponent').length > 0).toBeTruthy();
  });
});
