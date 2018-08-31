import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, values } from 'lodash';
import { Container, Header, Grid } from 'semantic-ui-react';
import AssignAssetModal from './AssignAssetModal';
import DropdownComponent from '../components/common/DropdownComponent';
import '../_css/AssetDescriptionComponent.css';

const userEmailsOptions = usersList => usersList.map((typeOption, index) => ({
  key: index,
  text: typeOption.email,
  value: typeOption.id
}));

const AssetDescriptionComponent = props => (
  <Container>
    <Grid columns={2} stackable className="asset-description">
      <Grid.Column>
        <Header as="h3" content="Asset Specs" />
        <div className="asset-specs">
          12-inch (diagonal) LED-backlit display with IPS technology
          2304-by-1440 resolution at 226 pixels per inch with support for millions of colors
          16:10 aspect ratio
        </div>
      </Grid.Column>
      <Grid.Column>
        {
          (!isEmpty(values(props.assignedUser))) ?
            <div id="allocate-asset">
              <Header as="h3" content="Assigned To:" />
              <div
                id="email"
                className="asset-specs"
              >
                {props.assignedUser.email}
              </div>
              <br />
              <AssignAssetModal {...props} />
            </div>
            :
            <div id="allocate-asset">
              <Header as="h3" content="Assign this asset to:" />
              <DropdownComponent
                customClass="form-dropdown"
                label="Assign this asset to:"
                placeHolder="Select Andela Email To Assign This Asset"
                name="assign-user"
                search
                value={props.selectedUserId}
                onChange={props.onSelectUserEmail}
                options={userEmailsOptions(props.users)}
              />
              <br />
              <AssignAssetModal {...props} />
            </div>
        }
      </Grid.Column>
    </Grid>
  </Container>
);

AssetDescriptionComponent.propTypes = {
  onSelectUserEmail: PropTypes.func,
  assignedUser: PropTypes.object,
  users: PropTypes.array,
  selectedUserId: PropTypes.number
};

AssetDescriptionComponent.defaultProps = {
  users: [],
  selectedUserId: 0
};

export default AssetDescriptionComponent;
