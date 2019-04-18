import React from 'react';
import { shallow } from 'enzyme';
import OfficeBlockModal from '../../components/OfficeBlocks/Modal';

describe('<OfficeBlockModal /> test', () => {
  let props;
  beforeEach(() => {
    props = {
      title: 'Testing Modal',
      showStatus: false,
      successMessage: '',
      errorMessage: '',
      resetMessage: jest.fn(),
      locationList: [{
        id: 12,
        name: 'Kenya'
      }],
      isLoading: false,
      createOfficeBlock: jest.fn(),
      updateAndelaCentre: jest.fn(),
      onToggle: jest.fn(),
      open: false
    };
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<OfficeBlockModal {...props} />)).not.toThrow();
  });

  it('renders the modal wrapper', () => {
    const wrapper = shallow(<OfficeBlockModal {...props} />);
    expect(wrapper.find('[data-test="centers-modal-wrapper"]')).toHaveProp('modalTitle', 'Testing Modal');
  });

  it('renders the status component when showStatus prop is true', () => {
    const wrapper = shallow(
      <OfficeBlockModal
        {...props}
        showStatus
        successMessage="Success!"
      />
    );
    expect(wrapper.find('[data-test="centers-status"]')).toExist();
  });

  it('renders the form component', () => {
    const wrapper = shallow(<OfficeBlockModal {...props} />);
    expect(wrapper.find('[data-test="centers-form"]')).toExist();
  });

  it('renders the center name input', () => {
    const wrapper = shallow(<OfficeBlockModal {...props} />);
    expect(wrapper.find('[data-test="centers-name-input"]')).toExist();
  });

  it('renders the country dropdown', () => {
    const wrapper = shallow(<OfficeBlockModal {...props} />);
    expect(wrapper.find('[data-test="centers-country-dropdown"]')).toHaveProp('name', 'location');
  });

  it('renders the buttons', () => {
    const wrapper = shallow(<OfficeBlockModal {...props} />);
    expect(wrapper.find('[data-test="centers-save-button"]')).toHaveProp('buttonName', 'Save');
    expect(wrapper.find('[data-test="centers-cancel-button"]')).toHaveProp('buttonName', 'Cancel');
  });

  it('calls handleInputChange', () => {
    const wrapper = shallow(<OfficeBlockModal {...props} />);
    const handleInputChangeSpy = jest.spyOn(wrapper.instance(), 'handleInputChange');

    wrapper.instance().handleInputChange({ target: { name: 'test', value: 123 } });
    expect(handleInputChangeSpy).toHaveBeenCalled();
    expect(wrapper.state('test')).toEqual(123);
  });

  it('handles form submission', () => {
    const wrapper = shallow(<OfficeBlockModal {...props} />);
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');

    wrapper.instance().handleSubmit();
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('handles selecting a location', () => {
    const wrapper = shallow(<OfficeBlockModal {...props} />);
    const handleSelectSpy = jest.spyOn(wrapper.instance(), 'handleSelect');

    wrapper.instance().handleSelect(null, { value: 1 });
    expect(handleSelectSpy).toHaveBeenCalled();
    expect(wrapper.state('location')).toEqual(1);
  });

  it('handles modal toggling', () => {
    const wrapper = shallow(<OfficeBlockModal {...props} />);
    const handleToggleSpy = jest.spyOn(wrapper.instance(), 'handleToggle');

    wrapper.instance().handleToggle();
    expect(handleToggleSpy).toHaveBeenCalled();
    expect(wrapper.state('location')).toEqual('');
    expect(wrapper.state('block')).toEqual('');
  });

  it('generates dropdown options', () => {
    const wrapper = shallow(<OfficeBlockModal {...props} />);

    const options = wrapper.instance().generateDropdownOptions();
    expect(options).toContainEqual({
      key: 12,
      text: 'Kenya',
      value: 12
    });
  });
});
