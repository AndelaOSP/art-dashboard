import { connect } from 'react-redux';
import DepartmentDetail from '../../components/Departments/DepartmentDetailComponent';
import { loadDepartmentDetail } from '../../_actions/departments.actions';
import { getAssetsSuccess } from '../../_actions/assets.action';

export const mapStateToProps = ({ departmentDetail }) => {
  const { isLoading, error, details } = departmentDetail;
  return {
    details,
    isLoading,
    error
  };
};

export default connect(mapStateToProps, {
  loadDepartmentDetail,
  getAssetsSuccess
})(DepartmentDetail);
