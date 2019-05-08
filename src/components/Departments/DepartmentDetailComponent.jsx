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
    const { match, loadDepartmentDetail, departmentDetail } = this.props;
    if (isEmpty(departmentDetail)) loadDepartmentDetail(+match.params.id);
  }

  viewAssignedAssets = assets =>
    this.props.getAssetsSuccess({ results: assets.assets_assigned, count: assets.assets_assigned.length }, '');


  assetsAssigned = (assets) => {
    if (isEmpty(assets.assets_assigned)) {
      return (
        <Card>
          <Card.Content extra>
            No Assigned Assets
          </Card.Content>
        </Card>
      );
    }

    return (
      <Link to="/assets" onClick={() => this.viewAssignedAssets(assets)} >
        View Assigned Assets
      </Link>
    );
  };

  render() {
    const { isLoading, departmentDetail } = this.props;
    if (isLoading) {
      return (
        <LoaderComponent />
      );
    }

    if (isEmpty(departmentDetail)) {
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
                  Department Name: {departmentDetail.name || 'Not Provided'}
                </Header>
                <Header>
                  Total Assets Assigned: {departmentDetail.assets_assigned.length}
                </Header>
                {this.assetsAssigned(departmentDetail)}
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
  departmentDetail: PropTypes.object,
  loadDepartmentDetail: PropTypes.func.isRequired,
  getAssetsSuccess: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default DepartmentDetailComponent;
