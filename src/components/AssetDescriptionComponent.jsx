import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Header, Grid } from 'semantic-ui-react';
import { isEmpty, values } from 'lodash';
import '../_css/AssetDescriptionComponent.css';

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
        {isEmpty(values(props.assignedUser)) ? <Button>Assign User</Button> : (
          <div>
            <div className="asset-user"><b>Assigned To:</b><p>{props.assignedUser.email}</p></div>
            <Button className="unassign-button">Unassign User</Button>
          </div>)
        }
      </Grid.Column>
    </Grid>
  </Container>
);

AssetDescriptionComponent.propTypes = {
  assignedUser: PropTypes.object
};

export default AssetDescriptionComponent;
