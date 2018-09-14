import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Loader from '../../components/LoaderComponent';

const props = {
  loadingText: 'Loading stuff'
};

describe('Renders <LoaderComponent /> tests', () => {
  const wrapper = shallow(<Loader {...props} />).dive();

  it('displays loading text when loading text is defined', () => {
    expect(wrapper.find('p').text()).toEqual('Loading stuff');
  });
});
