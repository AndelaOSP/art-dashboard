import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { Tab } from 'semantic-ui-react';
import TabsComponent from '../../components/common/TabsComponent';

describe('Renders <TabsComponent /> tests', () => {
  const props = {
    panes: []
  };
  const wrapper = shallow(<TabsComponent {...props} />);

  it('renders TabsComponent', () => {
    expect(wrapper.find('Tab').exists()).toEqual(true);
  });

  it('renders menuItems passed in as props', () => {
    wrapper.setProps({
      panes: [
        {
          menuItem: 'Test Menu Item',
          render: () => (
            <Tab.Pane>
              <div>Test</div>
            </Tab.Pane>
          )
        }
      ]
    });

    expect(wrapper.find('div').exists()).toEqual(true);
  });
});

