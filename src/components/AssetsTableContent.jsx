import React from 'react';
import { Table } from 'semantic-ui-react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import TableRowDetail from './TableRowComponent';
import LoaderComponent from './LoaderComponent';
import { ToastMessage } from '../_utils/ToastMessage';
import NotFound from './common/ItemsNotFoundComponent';

const AssetsTableContent = (props) => {
  const { assets, status, errorMessage, hasError, isLoading } = props;

  const hasAssets = !isEmpty(assets);

  if (isLoading) {
    return <LoaderComponent />;
  }

  // TODO: move this to appropriate component as it should not be here.
  // And do we really need "SemanticToastContainer"? (food for thought)
  if (hasError && errorMessage) {
    setTimeout(() => {
      ToastMessage.error({ message: errorMessage });
    }, 500);
    return <SemanticToastContainer />;
  }

  if (!hasAssets) {
    const assetAdjective = status || '';

    return (
      <NotFound
        message={`Please try again later to see if there will be ${assetAdjective} assets to show you.`}
      />
    );
  }

  return (
    <div>
      <Table basic selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Asset Code</Table.HeaderCell>
            <Table.HeaderCell>Serial Number</Table.HeaderCell>
            <Table.HeaderCell>Model Number</Table.HeaderCell>
            <Table.HeaderCell>Asset Make</Table.HeaderCell>
            <Table.HeaderCell>Asset Type</Table.HeaderCell>
            <Table.HeaderCell>Assigned To</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.assets.map((asset) => {
            const assetViewUrl = `/assets/${asset.uuid}/view`;

            const updatedAsset = {
              ...asset,
              asset_code: asset.asset_code || '-',
              serial_number: asset.serial_number || '-',
              model_number: asset.model_number || '-',
              assignee: (asset.assigned_to && asset.assigned_to.email)
                || (asset.assigned_to && `${asset.assigned_to.full_name}`)
                || '-'
            };

            return (
              <TableRowDetail
                viewDetailsRoute={assetViewUrl}
                key={asset.id}
                data={updatedAsset}
                headings={[
                  'asset_code',
                  'serial_number',
                  'model_number',
                  'make_label',
                  'asset_type',
                  'assignee'
                ]}
              />
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

AssetsTableContent.propTypes = {
  assets: PropTypes.arrayOf(PropTypes.object),
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool,
  status: PropTypes.string
};

AssetsTableContent.defaultProps = {
  errorMessage: '',
  isLoading: false,
  assets: [],
  hasError: false
};

export default AssetsTableContent;
