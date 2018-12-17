import React from 'react';
import PropTypes from 'prop-types';
import { Header, Divider } from 'semantic-ui-react';
import NavBarComponent from '../../_components/NavBarContainer';
import AssetsContainer from '../../_components/Assets/AssetsContainer';
import UploadAssetsContainer from '../../_components/Assets/UploadAssetsContainer';
import TabsComponent from '../../components/common/TabsComponent';

const AssetsTabComponent = (props) => {
  const contentTitle = props.status ? `${props.status.toLocaleString()} Assets` : 'Assets';
  return (
    <NavBarComponent title="Assets">
      <div className="assets-list">
        <div id="page-heading-section">
          <Header as="h1" id="page-headings" floated="left" content={contentTitle} />
          <Divider id="assets-divider" />
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
        </div>
      </div>
    </NavBarComponent>
  );
};

AssetsTabComponent.propTypes = {
  status: PropTypes.string
};

export default AssetsTabComponent;
