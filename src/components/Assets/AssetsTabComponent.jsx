import React from 'react';
import AssetsContainer from '../../_components/Assets/AssetsContainer';
import UploadAssetsContainer from '../../_components/Assets/UploadAssetsContainer';
import TabsComponent from '../../components/common/TabsComponent';

const AssetsTabComponent = props => (
  <TabsComponent panes={[
    {
      header: 'All Assets',
      component: <AssetsContainer props={props} />
    },
    {
      header: 'Import Assets',
      component: <UploadAssetsContainer />
    }
  ]}
  />
);

export default AssetsTabComponent;
