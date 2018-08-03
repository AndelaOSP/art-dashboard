import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import AssetNotes from '../components/AssetNoteComponent';

describe('Renders <AssetAllocationHistory /> correctly', () => {
  const props = {
    assetNotes: ''
  };
  const wrapper = shallow(<AssetNotes {...props} />);

  it('renders the message when there is no note', () => {
    expect(wrapper.find('.notes-unavialable').length).toBe(1);
  });

  it('renders the asset notes if notes is available', () => {
    wrapper.setProps({
      assetNotes: ' This is a sample note '
    });
    expect(wrapper.find('Grid').length).toBe(1);
    expect(wrapper.find('Container').length).toBe(1);
  });
});
