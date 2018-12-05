/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import AssetsTableContent from '../AssetsTableContent';
import FilterButton from '../common/FilterButton';
import FilterComponent from '../common/FilterComponent';
import PaginationComponent from '../common/PaginationComponent';
import UploadAssetsContainer from '../../_components/Assets/UploadAssetsContainer';

const AssetsTabComponent = (props) => {
  const panes = [
    {
      menuItem: 'All Assets',
      render: () => (
        <Tab.Pane>
          <FilterButton
            activePage={props.activePage}
            limit={props.limit}
            selected={props.selected}
            filterAction={props.filterAction}
            disabled={props.isLoading}
          >
            <React.Fragment>
              <FilterComponent
                index={0}
                option={props.filterData[0]}
                selected={props.selected}
                filterSelection={props.filterSelection}
              />

              <FilterComponent
                index={1}
                option={props.filterData[1]}
                selected={props.selected}
                filterSelection={props.filterSelection}
              />
            </React.Fragment>
          </FilterButton>

          <AssetsTableContent
            activePage={props.activePage}
            assets={props.assetsList[props.currentAssets] || props.assets}
            errorMessage={props.errorMessage}
            hasError={props.hasError}
            isLoading={props.isLoading}
          />
          {props.showPaginator && (
            <PaginationComponent
              activePage={props.activePage}
              handleRowChange={props.handleRowChange}
              handlePaginationChange={props.handlePaginationChange}
              limit={props.limit}
              totalPages={props.totalPages}
              isLoading={props.isLoading}
            />
          )}
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Import Assets',
      render: () => (
        <Tab.Pane>
          <UploadAssetsContainer />
        </Tab.Pane>
      )
    }
  ];
  return (
    <Tab panes={panes} />
  );
};

AssetsTabComponent.propTypes = {
  assetsList: PropTypes.objectOf(PropTypes.array),
  filterAction: PropTypes.func.isRequired,
  handlePaginationChange: PropTypes.func.isRequired,
  handleRowChange: PropTypes.func.isRequired,
  activePage: PropTypes.number,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  selected: PropTypes.object.isRequired,
  filterSelection: PropTypes.func.isRequired,
  filterData: PropTypes.arrayOf(PropTypes.object),
  limit: PropTypes.number,
  currentAssets: PropTypes.array,
  assets: PropTypes.array,
  showPaginator: PropTypes.bool,
  totalPages: PropTypes.number
};

AssetsTabComponent.defaultProps = {
  errorMessage: '',
  activePage: 1,
  isLoading: false
};

export default AssetsTabComponent;
