import React from 'react';
import AssetsContainer from '../../_components/Assets/AssetsContainer';
import UploadAssetsContainer from '../../_components/Assets/UploadAssetsContainer';
import TabsComponent from '../../components/common/TabsComponent';

const AssetsTabComponent = () => (
  <TabsComponent panes={[
    {
      header: 'All Assets',
      component: <AssetsContainer />
    },
    {
      header: 'Import Assets',
      component: <UploadAssetsContainer />
    }
  ]}
  />
);

export default AssetsTabComponent;
