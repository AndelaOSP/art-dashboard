import React from 'react';
import PropTypes from 'prop-types';
import NavBarComponent from '../../_components/NavBarContainer';
import AssetsContainer from '../../_components/Assets/AssetsContainer';
import UploadAssetsContainer from '../../_components/Assets/UploadAssetsContainer';
import TabsComponent from '../common/TabsComponent';
import PageHeader from '../common/PageHeader';

const AssetsTabComponent = props => (
  <NavBarComponent>
    <div className="assets-list">
      <PageHeader header="Assets" />

      <TabsComponent
        panes={[
          {
            header: 'All Assets',
            component: <AssetsContainer {...props} />
          },
          {
            header: 'Import Assets',
            component: <UploadAssetsContainer />
          }
        ]}
      />
    </div>
  </NavBarComponent>
);

AssetsTabComponent.propTypes = {
  status: PropTypes.string
};

export default AssetsTabComponent;
