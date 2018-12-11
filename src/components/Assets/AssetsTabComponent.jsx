/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import AssetsTableContent from '../AssetsTableContent';
import AssetsFilterContainer from '../../_components/Assets/AssetsFilterContainer';
import PaginationComponent from '../common/PaginationComponent';
import UploadAssetsContainer from '../../_components/Assets/UploadAssetsContainer';

const AssetsTabComponent = (props) => {
  const panes = [
    {
      menuItem: 'All Assets',
      render: () => (
        <Tab.Pane>
          <AssetsFilterContainer />

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
  handlePaginationChange: PropTypes.func.isRequired,
  handleRowChange: PropTypes.func.isRequired,
  activePage: PropTypes.number,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
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
