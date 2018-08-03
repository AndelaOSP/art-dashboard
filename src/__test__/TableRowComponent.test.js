import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import assets from '../_mock/assets';
import TableRowComponent from '../components/TableRowComponent';

describe('Renders <TableRowComponent /> correctly', () => {
  const props = {
    data: assets[0],
    headings: ['asset_type', 'asset_code', 'model_number']
  };
  const wrapper = shallow(<TableRowComponent {...props} />);

  it('renders the Table row', () => {
    expect(wrapper.find('TableRow').length).toEqual(1);
  });

  it('renders the Table cells', () => {
    expect(wrapper.find('TableCell').length).toEqual(3);
  });
});
