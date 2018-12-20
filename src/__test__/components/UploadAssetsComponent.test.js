import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import UploadAssetsComponent from '../../components/Assets/UploadAssetsComponent';

describe('Renders <UploadAssetsComponent /> correctly', () => {
  const props = {
    success: {},
    error: '',
    loading: false,
    downloadedFile: '',
    downloadFile: jest.fn(),
    resetUploadAssets: jest.fn(),
    uploadAssets: jest.fn(),
    handleDrop: jest.fn(),
    handleFileDownload: jest.fn(),
    resetUpload: jest.fn(),
    errorMessage: jest.fn()
  };
  const wrapper = shallow(<UploadAssetsComponent {...props} />);

  it('renders dropzone', () => {
    expect(wrapper.find('.dropzone').length).toBe(1);
  });

  it('calls the handleDrop function when files are dropped on dropzone', () => {
    const handleDropSpy = jest.spyOn(
      wrapper.instance(), 'handleDrop'
    );
    const files = [];
    wrapper.instance().handleDrop(files);
    expect(handleDropSpy.mock.calls.length).toEqual(1);
  });

  it('calls the handleFileDownload function when download links are clicked', () => {
    const handleFileDownloadSpy = jest.spyOn(
      wrapper.instance(), 'handleFileDownload'
    );
    const url = 'test/';
    wrapper.instance().handleFileDownload(url);
    expect(handleFileDownloadSpy.mock.calls.length).toEqual(1);
  });

  it('calls the resetUpload function ', () => {
    const resetUploadSpy = jest.spyOn(
      wrapper.instance(), 'resetUpload'
    );
    const url = 'test/';
    wrapper.instance().resetUpload(url);
    expect(resetUploadSpy.mock.calls.length).toEqual(1);
  });

  it('should call componentDidUpdate', () => {
    const componentDidUpdateSpy = jest.spyOn(
      wrapper.instance(), 'componentDidUpdate'
    );
    wrapper.setProps({ downloadedFile: 'blob:testfile/' });
    expect(componentDidUpdateSpy.mock.calls.length).toEqual(1);
  });

  it('returns message to download sample file', () => {
    expect(wrapper.find('.failed-file').exists()).toEqual(true);
  });

  it('returns no error message if upload is successful', () => {
    wrapper.setProps({
      success: { fail: '' }
    });
    expect(wrapper.find('.error-guide').exists()).toEqual(false);
    expect(wrapper.find('.success-status').exists()).toEqual(true);
  });

  it('returns download file error message if upload is partially successful', () => {
    wrapper.setProps({
      success: { fail: 'This some upload data failed' }
    });
    expect(wrapper.find('.error-guide').text()).toContain('fix errors and upload again');
    expect(wrapper.find('.error-status').exists()).toEqual(true);
  });


  it('returns error message if an internal error occurs', () => {
    wrapper.setProps({
      success: { fail: '' },
      error: '500'
    });
    expect(wrapper.find('.error-guide').text()).toContain('contact the admin');
    expect(wrapper.find('.error-status').exists()).toEqual(true);
  });
});
