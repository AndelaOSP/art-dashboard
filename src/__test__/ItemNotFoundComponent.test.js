import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { ItemsNotFoundComponent } from '../components/ItemsNotFoundComponent';

describe('ItemNotFoundComponent is rendered correctly', () => {
  const props = {
    message: 'Item not found'
  };

  const notFoundImage = '/images/andela_logo_blue_landscape.png';
  const wrapper = shallow(<ItemsNotFoundComponent {...props} />);

  it('renders not found Image', () => {
    expect(wrapper.find('#not_found_image').prop('src')).toEqual(notFoundImage);
  });

  it('renders not found message', () => {
    expect(wrapper.find('#not_found_message').prop('content')).toEqual('Item not found');
  });
});
