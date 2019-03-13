import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import {
  Header,
  Table,
  Divider,
  Accordion,
  Label
} from 'semantic-ui-react';
import _ from 'lodash';

import NavBarComponent from '../../_components/NavBarContainer';
import LoaderComponent from '../../components/LoaderComponent';
import loadAssetLogs from '../../_actions/assetLogs.actions';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';


export class AssetLogComponent extends React.Component {
  state = {
    groupedAssetLogs: {}
  };

  async componentDidMount() {
    await this.props.loadAssetLogs();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      groupedAssetLogs:
      _.groupBy(this.props.assetLogs, asset => new Date(asset.created_at).toDateString())
    });
  }

  content = index => (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Asset Code</Table.HeaderCell>
          <Table.HeaderCell>Log Type</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body >
        {
          (Object.values(this.state.groupedAssetLogs))[index].map(value => (
            <Table.Row key={uuidv4()}>
              <Table.Cell>
                <Label>{value.asset}</Label>
              </Table.Cell>
              <Table.Cell>
                <Label>{value.log_type}</Label>
              </Table.Cell>
              <Table.Cell>
                <Label >{value.created_at}</Label>
              </Table.Cell>
            </Table.Row>
            ))
                }
      </Table.Body>
    </Table>
  );

  panels = () => Object.keys(this.state.groupedAssetLogs).map((key, index) => ({
    key: `panel-${index}`,
    title: key,
    content: {
      content: this.content(index),
      key: uuidv4(),
      className: 'logs'
    }
  }))

  render() {
    if (this.props.isLoading) {
      return (
        <NavBarComponent>
          <LoaderComponent />
        </NavBarComponent>
      );
    }
    if (!this.props.isLoading && _.isEmpty(this.props.assetLogs)) {
      return (
        <NavBarComponent>
          <ItemsNotFoundComponent
            header="No Logs found!"
            message="Please try again later to see if there will be Logs to show you"
          />
        </NavBarComponent>
      );
    }

    return (
      <NavBarComponent>
        <div className="incidence-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Asset Logs" />
            <Divider id="assets-divider" />
          </div>
          <Accordion
            defaultActiveIndex={[0, 0]}
            panels={this.panels()}
            exclusive={false}
          />
        </div>
      </NavBarComponent>
    );
  }
}

export const mapStateToProps = ({ logs }) => {
  const { assetLogs, isLoading, assetLogsCount } = logs;
  return {
    assetLogs,
    isLoading,
    assetLogsCount
  };
};

AssetLogComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadAssetLogs: PropTypes.func.isRequired,
  assetLogs: PropTypes.array.isRequired
};


export default withRouter(connect(mapStateToProps, {
  loadAssetLogs
})(AssetLogComponent));
