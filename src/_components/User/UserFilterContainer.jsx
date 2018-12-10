import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { loadUsers } from '../../_actions/users.actions';
import filterSelection from '../../_actions/checkedFilters.actions';
import formatOption from '../../_utils/filters';

import UserFilterButton from '../../components/User/UserFilter';

export const userFilterData = (cohorts, allocatedAssets) => {
  if (isEmpty(cohorts, allocatedAssets)) {
    return [];
  }

  const formattedUserCohort = cohorts.map(cohort => formatOption(cohort, 'option'));
  const formattedAssetCount = allocatedAssets.map(assignedAsset =>
    formatOption(assignedAsset, 'option'));

  return [
    {
      title: 'Cohort',
      content: formattedUserCohort
    },
    {
      title: 'Asset Assigned',
      content: formattedAssetCount
    }
  ];
};

export const mapStateToProps = ({ usersList, filters, selected }) => ({
  activePage: usersList.activePage,
  isLoading: usersList.isLoading,
  selected,
  filterData: userFilterData(filters.cohorts, filters.allocatedAssets)
});

export default connect(mapStateToProps, {
  loadUsers,
  filterSelection
})(UserFilterButton);
