import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetModelsComponent } from '../../components/AssetModels/AssetModelsComponent';

import assetModels from '../../_mock/assetModels';

describe('Renders <AssetModelsComponent /> correctly', () => {
  let props = {
    loadAssetModels: jest.fn(),
    handlePaginationChange: jest.fn(),
    isLoading: false,
    assetModels,
    assetModelsCount: 3,
    handleRowChange: jest.fn()
  };

  let wrapper = shallow(<AssetModelsComponent{...props} />);

  it('renders page title', () => {
    expect(wrapper.find('#page-headings').prop('content')).toEqual('Asset Models');
  });

  it('renders Pagination component', () => {
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('renders Table component', () => {
    expect(wrapper.find('Table').length).toBe(1);
  });

  it('renders Loader component if isLoading is true', () => {
    props = {
      loadAssetModels: jest.fn(),
      handlePaginationChange: jest.fn(),
      isLoading: true,
      assetModels,
      assetModelsCount: 0
    };
    wrapper = shallow(<AssetModelsComponent {...props} />);
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('calls the handlePaginationChange function when a new page is clicked', () => {
    const handlePaginationChangeSpy = jest.spyOn(
      wrapper.instance(), 'handlePaginationChange'
    );
    const event = {};
    const data = {};
    wrapper.instance().handlePaginationChange(event, data);
    expect(handlePaginationChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls handleToggleModal when a modal is opened or closed', () => {
    wrapper.setState({ modalOpen: false });

    wrapper.instance().handleToggleModal();
    expect(wrapper.state().modalOpen).toEqual(true);
  });

  it('calls handleRowChange when a  number of rows are selected', () => {
    const handleRowChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleRowChange'
    );
    const event = {};
    const data = {};
    wrapper.instance().handleRowChange(event, data);
    expect(handleRowChangeSpy.mock.calls.length).toEqual(1);
  });
});
