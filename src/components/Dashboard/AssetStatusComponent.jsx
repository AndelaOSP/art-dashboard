import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Grid } from 'semantic-ui-react';

import AnalyticsCardComponent from './AnalyticsCardComponent';

export default class AssetStatusComponent extends Component {
  componentDidMount() {
    if (isEmpty(this.props.asset)) {
      this.props.onFetchAssets(this.props.status);
    }
  }

  render() {
    const { asset, status } = this.props;
    const hasAssets = asset.count > 0;
    const activeClass = hasAssets ? 'active-analytics' : '';

    return (
      <Grid.Column>
        <div className={`analytics-state-rectangle ${activeClass}`}>
          {hasAssets && (
            <div id="circle">
              <div className="checkmark" />
            </div>
          )}
          <AnalyticsCardComponent
            assetNumber={asset.count}
            assetState={status}
            image={`/images/${status}.png`}
            cssClass={status}
          />
        </div>
      </Grid.Column>
    );
  }
}

AssetStatusComponent.propTypes = {
  asset: PropTypes.object,
  onFetchAssets: PropTypes.func,
  status: PropTypes.string
};

AssetStatusComponent.defaultProps = {
  asset: {},
  onFetchAssets: () => {},
  status: ''
};
