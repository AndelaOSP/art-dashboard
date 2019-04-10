import expect from 'expect';
import { mapStateToProps } from '../../_components/Dashboard/DashboardContainer';

describe('Render <DashboardContainer /> tests', () => {
  it('calls mapStateToProps', () => {
    const state = {
      assetStatus: {}
    };

    const expected = {};

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
