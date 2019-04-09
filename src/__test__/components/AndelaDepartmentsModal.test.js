import React from 'react';
import { shallow } from 'enzyme';
import DepartmentsModal from '../../components/Departments/Modal';

describe('<DepartmentsModal /> test', () => {
  let props;
  beforeEach(() => {
    props = {
      title: 'Testing Modal',
      showStatus: false,
      successMessage: '',
      errorMessage: '',
      resetMessage: jest.fn(),
      isLoading: false,
      createDepartment: jest.fn(),
      onToggle: jest.fn(),
      open: false
    };
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<DepartmentsModal {...props} />)).not.toThrow();
  });

  it('renders the modal wrapper', () => {
    const wrapper = shallow(<DepartmentsModal {...props} />);
    expect(wrapper.find('[data-test="departments-modal-wrapper"]')).toHaveProp('modalTitle', 'Testing Modal');
  });

  it('renders the status component when showStatus prop is true', () => {
    const wrapper = shallow(
      <DepartmentsModal
        {...props}
        showStatus
        successMessage="Success!"
      />
    );
    expect(wrapper.find('[data-test="departments-status"]')).toExist();
  });

  it('renders the form component', () => {
    const wrapper = shallow(<DepartmentsModal {...props} />);
    expect(wrapper.find('[data-test="departments-form"]')).toExist();
  });

  it('renders the department name input', () => {
    const wrapper = shallow(<DepartmentsModal {...props} />);
    expect(wrapper.find('[data-test="departments-name-input"]')).toExist();
  });

  it('renders the buttons', () => {
    const wrapper = shallow(<DepartmentsModal {...props} />);
    expect(wrapper.find('[data-test="departments-save-button"]')).toHaveProp('buttonName', 'Save');
    expect(wrapper.find('[data-test="departments-cancel-button"]')).toHaveProp('buttonName', 'Cancel');
  });

  it('calls handleInputChange', () => {
    const wrapper = shallow(<DepartmentsModal {...props} />);
    const handleInputChangeSpy = jest.spyOn(wrapper.instance(), 'handleInputChange');

    wrapper.instance().handleInputChange({ target: { name: 'test', value: 123 } });
    expect(handleInputChangeSpy).toHaveBeenCalled();
    expect(wrapper.state('test')).toEqual(123);
  });

  it('handles form submission', () => {
    const wrapper = shallow(<DepartmentsModal {...props} />);
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');

    wrapper.instance().handleSubmit();
    expect(handleSubmitSpy).toHaveBeenCalled();
  });


  it('handles modal toggling', () => {
    const wrapper = shallow(<DepartmentsModal {...props} />);
    const handleToggleSpy = jest.spyOn(wrapper.instance(), 'handleToggle');

    wrapper.instance().handleToggle();
    expect(handleToggleSpy).toHaveBeenCalled();
    expect(wrapper.state('department')).toEqual('');
  });
});
