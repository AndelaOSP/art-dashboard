import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';

const getPanes = panes => (
  panes.map(pane => ({
    menuItem: pane.header,
    render: () => (
      <Tab.Pane>
        {pane.component}
      </Tab.Pane>
    )
  }))
);

const TabsComponent = props => (
  <Tab panes={getPanes(props.panes)} />
);

TabsComponent.propTypes = {
  panes: PropTypes.array.isRequired
};

export default TabsComponent;

