import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import { Table } from 'semantic-ui-react';

import { titles } from '../_mock/assets';
import TableHeaderComponent from '../components/common/TableHeaderComponent.jsx';

describe('<TableHeaderComponent>', () => {
  const props = {
    titles
  };
  const wrapper = shallow(<TableHeaderComponent {...props} />);
  const childrenWrapper = mount(
    <Table className="ui celled table">
      <TableHeaderComponent {...props}>
        <ul>
          <li>And3la</li>
          <li>R3s0urc3</li>
          <li>Tr@ck3r</li>
        </ul>
      </TableHeaderComponent>
    </Table>
  );

  it('renders child components', () => {
    expect(childrenWrapper.find('ul')).toHaveLength(5);
  });

  it('renders child components', () => {
    expect(childrenWrapper.find('ul').at(0).children()).toHaveLength(3);
  });

  it('renders nested child components', () => {
    expect(childrenWrapper.find('ul').at(0).childAt(0).type()).toEqual('li');
  });

  it('renders the Table Header', () => {
    expect(wrapper.find('TableHeader').length).toEqual(1);
  });

  it('renders the Table rows', () => {
    expect(wrapper.find('TableRow').length).toEqual(1);
  });

  it('renders the Table cells', () => {
    expect(wrapper.find('TableHeaderCell').length).toEqual(5);
  });
});
