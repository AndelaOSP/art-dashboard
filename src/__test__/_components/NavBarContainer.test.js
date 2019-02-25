import expect from 'expect';
import { mapStateToProps } from '../../_components/NavBarContainer';

describe('Renders <NavBarContainer />', () => {
  it('calls mapStateToProps', () => {
    const state = {
      navBarVisibility: {
        isVisible: false
      }
    };

    const expected = {
      isVisible: false
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
