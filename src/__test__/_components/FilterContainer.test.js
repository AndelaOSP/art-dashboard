import expect from 'expect';
import { mapStateToProps } from '../../_components/common/FilterContainer';

it('calls mapStateToProps', () => {
  const state = {
    accordion: {
      activeIndex: 2
    }
  };

  const expected = {
    accordion: {
      activeIndex: 2
    }
  };

  expect(mapStateToProps(state)).toEqual(expected.accordion);
});
