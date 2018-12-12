import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AssetsTableContent from '../AssetsTableContent';
import AssetsFilterContainer from '../../_components/Assets/AssetsFilterContainer';
import PaginationComponent from '../common/PaginationComponent';
import UploadAssetsContainer from '../../_components/Assets/UploadAssetsContainer';
import TabsComponent from '../../components/common/TabsComponent';

const AssetsTabComponent = props => (
  <TabsComponent panes={[
    {
      header: 'All Assets',
      component: (
        <Fragment>
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
        </Fragment>
      )
    },
    {
      header: 'Import Assets',
      component: <UploadAssetsContainer />
    }
  ]}
  />
);

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
