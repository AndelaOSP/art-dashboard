import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { Tab } from 'semantic-ui-react';
import TabsComponent from '../../components/common/TabsComponent';

describe('Renders <TabsComponent /> tests', () => {
  const props = {
    panes: []
  };
  const wrapper = mount(<TabsComponent {...props} />);

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
              <div className="test-div">Test</div>
            </Tab.Pane>
          )
        }
      ]
    });

    expect(wrapper.find('.active.tab').children().length).toBe(1);
  });
});

