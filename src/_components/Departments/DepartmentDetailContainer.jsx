import { connect } from 'react-redux';
import DepartmentDetail from '../../components/Departments/DepartmentDetailComponent';
import { loadDepartmentDetail } from '../../_actions/departments.actions';
import { getAssetsSuccess } from '../../_actions/assets.action';

export const mapStateToProps = ({ departments }) => {
  const { isLoading, error, departmentDetail } = departments;
  return {
    departmentDetail,
    isLoading,
    error
  };
};

export default connect(mapStateToProps, {
  loadDepartmentDetail,
  getAssetsSuccess
})(DepartmentDetail);
