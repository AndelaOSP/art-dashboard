import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Header, Card, Divider, Segment, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import LoaderComponent from '../../components/LoaderComponent';
import NavBarComponent from '../../_components/NavBarContainer';
import '../../_css/UserDetailComponent.css';


export class DepartmentDetailComponent extends React.Component {
  componentDidMount() {
    const { match, loadDepartmentDetail } = this.props;
    loadDepartmentDetail(match.params.id);
  }

  getAssignedAssets = assets =>
    this.props.getAssetsSuccess({ results: assets.assets_assigned.results, count: assets.assets_assigned.count }, '');


  assetsAssigned = (assets) => {
    if (isEmpty(assets.assets_assigned.results)) {
      return (
        <Card>
          <Card.Content extra>
            No Assigned Assets
          </Card.Content>
        </Card>
      );
    }

    return (
      <Link to="/assets" onClick={() => this.getAssignedAssets(assets)} >
        View Assigned Assets
      </Link>
    );
  };

  render() {
    const { isLoading, details } = this.props;
    // eslint-disable-next-line camelcase
    const { name, assets_assigned } = details;
    if (isLoading) {
      return (
        <LoaderComponent />
      );
    }

    if (isEmpty(details)) {
      return (
        <div>
          Department Not Found
        </div>
      );
    }
    return (
      <NavBarComponent title="Department">
        <div className="users-list">
          <div id="page-heading-section">
            <Header
              as="h1"
              id="page-headings"
              floated="left"
              content="Department-detail"
            />
            <Divider id="assets-divider" />
          </div>
          <Segment vertical>
            <Grid columns={3} relaxed="very" stackable>
              <Grid.Column>
                <Header>
                  Department Name: {name || 'Not Provided'}
                </Header>
                <Header>
                  Total Assets Assigned: {assets_assigned.count}
                </Header>
                {this.assetsAssigned(details)}
              </Grid.Column>
            </Grid>
          </Segment>
        </div>

      </NavBarComponent>
    );
  }
}

DepartmentDetailComponent.propTypes = {
  isLoading: PropTypes.bool,
  details: PropTypes.object,
  loadDepartmentDetail: PropTypes.func.isRequired,
  getAssetsSuccess: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default DepartmentDetailComponent;
