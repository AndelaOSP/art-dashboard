import {
  isCountCutoffExceeded,
  constructApiUrl,
  titleCase
} from '../../_utils/helpers';

describe('Utility helpers test', () => {
  it('isCountCutoffExceeded higher order function returns the correct boolean value on execution', () => {
    const checkOverflow = isCountCutoffExceeded()(6, 20);
    expect(checkOverflow).toBeTruthy();

    const checkUnderflow = isCountCutoffExceeded()(3, 20);
    expect(checkUnderflow).toBeFalsy();
  });

  it('constructs the correct non-paginated API endpoint ', () => {
    const endpoint = constructApiUrl('users');
    expect(endpoint).toEqual('users?paginate=false');
  });

  it('constructs the paginated API endpoint with no optional query args', () => {
    const endpoint = constructApiUrl('users', 2, 10);
    expect(endpoint).toEqual('users?page=2&page_size=10');
  });

  it('constructs the paginated API endpoint with the status optional query arg', () => {
    const endpoint = constructApiUrl('assets', 2, 10, { status: 'allocated' });
    expect(endpoint).toEqual('assets?page=2&page_size=10&current_status=allocated');
  });

  it('constructs the paginated API endpoint with the filter query args', () => {
    const filters = {
      'Model Numbers': 'ADFGHK',
      'Asset Types': 'damaged'
    };
    const endpoint = constructApiUrl('assets', 2, 10, { filters });
    expect(endpoint).toEqual('assets?page=2&page_size=10&model_number=ADFGHK&asset_type=damaged');
  });

  it('capitalizes the first letter of each word', () => {
    const title = titleCase('testing capitalize');
    expect(title).toEqual('Testing Capitalize');
  });
});
