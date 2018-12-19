import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import AssetVerifiedComponent from '../../components/AssetDetails/AssetVerifiedComponent';

import { asset } from '../../_mock/asset';

describe('Render AssetVerifiedComponent correctly', () => {
  const props = {
    assetDetail: asset,
    updateLoading: false,
    updateAsset: async () => {},
    uuid: asset.uuid
  };

  const wrapper = shallow(<AssetVerifiedComponent {...props} />);

  it('calls handleDropdownChange function', () => {
    const handleDropdownChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleDropdownChange'
    );

    const event = {
      stopPropagation: jest.fn()
    };
    const data = {};

    wrapper.instance().handleDropdownChange(event, data);
    expect(handleDropdownChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls toggleFormVisibility function', () => {
    const toggleFormVisibilitySpy = jest.spyOn(
      wrapper.instance(), 'toggleFormVisibility'
    );

    wrapper.instance().toggleFormVisibility();
    expect(toggleFormVisibilitySpy.mock.calls.length).toEqual(1);
  });

  it('calls the updateVerifiedStatus function', () => {
    const updateVerifiedStatusSpy = jest.spyOn(
      wrapper.instance(), 'updateVerifiedStatus'
    );

    wrapper.instance().updateVerifiedStatus();
    expect(updateVerifiedStatusSpy.mock.calls.length).toEqual(1);
  });

  it('changes optionText state to Yes if value.data is Yes', () => {
    wrapper.setState({ optionText: 'No' });

    const event = {
      stopPropagation: jest.fn()
    };
    const data = {
      value: 'Yes'
    };

    wrapper.instance().handleDropdownChange(event, data);
    expect(wrapper.state().optionText).toEqual('Yes');
  });

  it('changes optionText state to No if value.data is No', () => {
    wrapper.setState({ optionText: 'Yes' });

    const event = {
      stopPropagation: jest.fn()
    };
    const data = {
      value: 'No'
    };

    wrapper.instance().handleDropdownChange(event, data);
    expect(wrapper.state().optionText).toEqual('No');
  });
});
