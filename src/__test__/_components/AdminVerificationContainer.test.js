import expect from 'expect';
import { mapStateToProps } from '../../_components/AdminVerification/AdminVerificationContainer';

describe('Renders <AdminVerificationContainer />  tests', () => {
  it('calls mapStateToProps', () => {
    const state = {
      admin: {
        isAdmin: false
      }
    };

    expect(mapStateToProps(state)).toEqual({ isAdmin: false });
  });
});
