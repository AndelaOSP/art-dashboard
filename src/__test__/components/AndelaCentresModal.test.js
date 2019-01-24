import React from 'react';
import { shallow, mount } from 'enzyme';
import AndelaCentresModal from '../../components/AndelaCentres/Temp';

describe('<AndelaCentresModal /> test', () => {
  let props;
  beforeEach(() => {
    props = {
      title: 'Testing Modal',
      showStatus: false,
      successMessage: '',
      errorMessage: '',
      resetMessage: jest.fn(),
      countries: [{
        id: 12,
        name: 'Kenya'
      }],
      isLoading: false,
      createOfficeLocation: jest.fn(),
      updateAndelaCentre: jest.fn(),
      onToggle: jest.fn(),
      open: false
    };
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<AndelaCentresModal {...props} />)).not.toThrow();
  });

  it('renders the modal wrapper', () => {
    const wrapper = shallow(<AndelaCentresModal {...props} />);
    expect(wrapper.find('[data-test="centers-modal-wrapper"]')).toHaveProp('modalTitle', 'Testing Modal');
  });

  it('renders the status component when showStatus prop is true', () => {
    const wrapper = shallow(
      <AndelaCentresModal
        {...props}
        showStatus
        successMessage="Success!"
      />
    );
    expect(wrapper.find('[data-test="centers-status"]')).toExist();
  });

  it('renders the form component', () => {
    const wrapper = shallow(<AndelaCentresModal {...props} />);
    expect(wrapper.find('[data-test="centers-form"]')).toExist();
  });

  it('renders the center name input', () => {
    const wrapper = shallow(<AndelaCentresModal {...props} />);
    expect(wrapper.find('[data-test="centers-name-input"]')).toExist();
  });

  it('renders the country dropdown', () => {
    const wrapper = shallow(<AndelaCentresModal {...props} />);
    expect(wrapper.find('[data-test="centers-country-dropdown"]')).toHaveProp('name', 'country');
  });

  it('renders the buttons', () => {
    const wrapper = shallow(<AndelaCentresModal {...props} />);
    expect(wrapper.find('[data-test="centers-save-button"]')).toHaveProp('buttonName', 'Save');
    expect(wrapper.find('[data-test="centers-cancel-button"]')).toHaveProp('buttonName', 'Cancel');
  });

  it('calls handleInputChange', () => {
    const wrapper = shallow(<AndelaCentresModal {...props} />);
    const handleInputChangeSpy = jest.spyOn(wrapper.instance(), 'handleInputChange');

    wrapper.instance().handleInputChange({ target: { name: 'test', value: 123 } });
    expect(handleInputChangeSpy.mock.calls.length).toEqual(1);
    expect(wrapper.state('test')).toEqual(123);
  });
});
