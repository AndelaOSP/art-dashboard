/* eslint-disable camelcase */
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

import FormatDate from '../../_utils/dateFormatter';
import NavBarComponent from '../../_components/NavBarContainer';
import LoaderComponent from '../../components/LoaderComponent';
import loadAssetLogs from '../../_actions/assetLogs.actions';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';
import '../../_css/AssetLogComponent.css';


export class AssetLogComponent extends React.Component {
  state = {
    groupedLogsbyDate: {}
  };

  async componentDidMount() {
    await this.props.loadAssetLogs();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      groupedLogsbyDate:
      _.groupBy(this.props.assetLogs, asset => new Date(asset.created_at).toDateString())
    });
  }

  content = (assetsLogs) => {
    const groupedLogsbyAsset = _.groupBy(assetsLogs, asset => asset.asset);
    const returnedAssetLogs = Object.values(groupedLogsbyAsset);
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Asset Code</Table.HeaderCell>
            <Table.HeaderCell>Log Type</Table.HeaderCell>
            <Table.HeaderCell>Checkin Time</Table.HeaderCell>
            <Table.HeaderCell>Log Type</Table.HeaderCell>
            <Table.HeaderCell>Checkout Time</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body >
          {
            returnedAssetLogs.map((log) => {
              const filterCheckinLogs = _.filter(log, { log_type: 'Checkin' });
              const filterCheckoutLogs = _.filter(log, { log_type: 'Checkout' });

              // Case where a log was checked out on a different day
              // eslint-disable-next-line array-callback-return
              filterCheckinLogs.map((checkinLog, index) => {
                const checkout = filterCheckoutLogs[index];
                if (new Date(checkout && checkout.created_at) < new Date(checkinLog.created_at)) {
                  filterCheckinLogs.splice(index, 0, 'Not Available');
                }
              });

              while (filterCheckinLogs.length < filterCheckoutLogs.length) {
                filterCheckinLogs.push('Not Available');
              }

              return filterCheckinLogs.map((checkinLog, index) => {
                const { asset = '', log_type = '', created_at = '' } = checkinLog;
                const checkoutLog = filterCheckoutLogs[index];
                const checkinDate =
                  _.isEmpty(created_at) ? '' : new Date(created_at).toLocaleTimeString();
                const assetCode = _.isEmpty(asset) ? checkoutLog.asset : asset;
                return (
                  <Table.Row key={uuidv4()}>
                    <Table.Cell className="log-cell">
                      <Label>{assetCode}</Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Label>{log_type}</Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Label>{ checkinDate}</Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Label>{ checkoutLog && (checkoutLog.log_type)}</Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Label >
                        {
                        checkoutLog && new Date(checkoutLog.created_at).toLocaleTimeString()
                        }
                      </Label>
                    </Table.Cell>
                  </Table.Row>
                  );
              });
            })
                  }
        </Table.Body>
      </Table>
    );
  }

  panels = () => Object.entries(this.state.groupedLogsbyDate).map((value, index) =>
    ({
      key: `panel-${index}`,
      title: FormatDate(value[0]),
      content: {
        content: this.content(value[1]),
        key: uuidv4(),
        className: 'logs'
      }
    })
  )

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
