import { connect } from 'react-redux';
import {
  loadDepartments,
  resetMessage,
  createDepartment
} from '../../_actions/departments.actions';
import Departments from '../../components/Departments/DepartmentsComponent';

export const mapStateToProps = ({ departments }) => {
  const {
    departmentsCount,
    departmentsList,
    isLoading,
    error,
    updateError,
    updateSuccess
  } = departments;

  return {
    departmentsCount,
    departmentsList,
    isLoading,
    error,
    updateError,
    updateSuccess,
    entity: 'andela-departments'
  };
};

export default connect(mapStateToProps, {
  loadDepartments,
  resetMessage,
  createDepartment
})(Departments);
