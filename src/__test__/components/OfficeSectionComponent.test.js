import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import OfficeSections from '../../components/OfficeSections/OfficeSectionsComponent';

import officeSectionsList from '../../_mock/officeSections';

describe('Renders <OfficeSections /> correctly', () => {
  const props = {
    loadOfficeSections: jest.fn(),
    isLoading: false,
    officeSectionsList: officeSectionsList.results
  };
  let wrapper = shallow(<OfficeSections {...props} />);

  it('renders Loading component if isLoading is true', () => {
    props.isLoading = true;
    wrapper = shallow(<OfficeSections {...props} />);
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('renders Table component', () => {
    props.isLoading = false;
    wrapper = shallow(<OfficeSections {...props} />);
    expect(wrapper.find('Table').length).toBe(1);
  });

  it('renders ItemsNotFoundComponent component if office Sections is empty', () => {
    props.isLoading = false;
    props.officeSectionsList = [];
    wrapper = shallow(<OfficeSections {...props} />);
    expect(wrapper.find('ItemsNotFoundComponent').length).toBe(1);
  });
});
