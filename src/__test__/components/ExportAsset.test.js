import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import ExportAsset from '../../components/Assets/ExportAsset';
import assets from '../../_mock/assets';
import exportAsset from '../../_mock/exportAsset';

describe('Renders <ExportAsset /> correctly', () => {
  const props = {
    exportAssetsAction: jest.fn(),
    hasError: false,
    assets
  };
  const wrapper = shallow(<ExportAsset
    {...props}
  />);

  it('renders the ExportAsset component', () => {
    expect(wrapper.find('.export-asset').length).toBe(1);
  });

  it('renders the ExportAsset Button', () => {
    expect(wrapper.find('Button').length).toBe(1);
  });

  it('renders the ExportAsset Modal', () => {
    wrapper.setState({
      loading: true
    });
    wrapper.setProps({
      exportAsset
    });
    expect(wrapper.find('Modal').length).toBe(1);
  });

  it('calls close when a modal is opened or closed', () => {
    wrapper.setState({ open: true });
    wrapper.instance().close();
    expect(wrapper.state().open).toEqual(false);
  });

  it('should call the handleExport function when the Export to File button is clicked', () => {
    const handleExportSpy = jest.spyOn(
      wrapper.instance(), 'handleExport'
    );
    wrapper.find('Button').simulate('click');
    wrapper.instance().handleExport();
    expect(handleExportSpy.mock.calls.length).toEqual(1);
  });

  it('should ', () => {
    wrapper.setState({ filePath: '' });
    wrapper.instance().handleExport();
    expect(wrapper.state().loading).toEqual(true);
  });

  it('should not call export Asset action when the file is already in the state', () => {
    wrapper.setState({ filePath: 'https://www.www.com', open: false, loading: true });
    wrapper.instance().handleExport();
    expect(wrapper.state().open).toEqual(true);
    expect(wrapper.state().loading).toEqual(false);
  });

  it('should set the filePath in state when next props is called', () => {
    wrapper.setState({
      loading: true
    });
    wrapper.instance().componentWillReceiveProps({ exportAsset });
    expect(wrapper.state().filePath).toBe(exportAsset.data);
  });

  it('should set the filePath in state when next props is called', () => {
    wrapper.instance().componentWillReceiveProps({ exportAsset: {
      hasError: true
    } });
    expect(wrapper.state().loading).toBe(false);
  });
});
