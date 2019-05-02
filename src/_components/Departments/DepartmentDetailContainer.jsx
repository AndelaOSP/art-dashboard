import { connect } from 'react-redux';
import DepartmentDetail from '../../components/Departments/DepartmentDetailComponent';
import { loadDepartmentDetail } from '../../_actions/departments.actions';

export const mapStateToProps = ({ departments }) => {
  const { isLoading, error, departmentDetail } = departments;
  return {
    departmentDetail,
    isLoading,
    error
  };
};

export default connect(mapStateToProps, {
  loadDepartmentDetail
})(DepartmentDetail);
