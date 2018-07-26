import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, values } from 'lodash';
import { Button, Container, Header, Grid, Confirm } from 'semantic-ui-react';
import ButtonComponent from '../components/common/ButtonComponent';
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
        <Confirm
          content="Are you sure you want to make this change?"
          open={props.open}
          cancelButton={
            <ButtonComponent
              className="cancel"
              buttonName="Cancel"
              handleClick={props.handleCancel}
            />
          }
          confirmButton={
            <ButtonComponent
              className="save"
              buttonName="Save"
              color="primary"
              buttonState={props.buttonState}
              handleClick={event => props.handleConfirm(event)}
            />
          }
        />
        {(!isEmpty(values(props.assignedUser))) ?
          <div id="allocate-asset">
            <Header as="h3" content="Assigned To:" />
            <div
              id="email"
              className="asset-specs"
            >
              {props.assignedUser.email}
            </div>
            <br />
            <Button
              id="blue-rounded-button"
              className="unassign-asset"
              onClick={props.show}
            >
              Unassign Asset
            </Button>
          </div>
          :
          <div id="allocate-asset">
            <Header as="h3" content="Assign this asset to:" />
            <DropdownComponent
              label="Assign this asset to:"
              placeHolder="Select Andela Email"
              name="assign-user"
              search
              onChange={props.onSelectUserEmail}
              options={userEmailsOptions(props.users)}
            />
            <br />
            <Button
              id="blue-rounded-button"
              className="assign-asset"
              onClick={props.show}
            >
              Assign Asset
            </Button>
          </div>
        }
      </Grid.Column>
    </Grid>
  </Container>
);

AssetDescriptionComponent.propTypes = {
  onSelectUserEmail: PropTypes.func,
  show: PropTypes.func,
  open: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleConfirm: PropTypes.func,
  assignedUser: PropTypes.object,
  users: PropTypes.array,
  buttonState: PropTypes.bool
};

AssetDescriptionComponent.defaultProps = {
  users: []
};

export default AssetDescriptionComponent;
