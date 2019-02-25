import expect from 'expect';
import { mapStateToProps } from '../../_components/Category/AssetCategoryContainer';

describe('Render <AssetCategoryContainer /> tests', () => {
  it('calls mapStateToProps', () => {
    const state = {
      assetCategories: {
        categories: [],
        assetCategoriesCount: 0,
        isLoading: false,
        hasError: false
      }
    };

    const expected = {
      categories: [],
      assetCategoriesCount: 0,
      isLoading: false,
      hasError: false
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
