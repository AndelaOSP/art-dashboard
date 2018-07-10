export const filterSubCategories = (subcategories, filterKey) => {
  let filteredSubCategories = [];
  filteredSubCategories = subcategories.filter(subcategory =>
    subcategory.asset_category === filterKey);
  return filteredSubCategories.map(subcategory => ({
    key: subcategory.id,
    text: subcategory.sub_category_name,
    value: subcategory.id
  }));
};

export const filterAssetTypes = (assetTypes, filterKey) => {
  let filteredAssetTypes = [];
  filteredAssetTypes = assetTypes.filter(assetType =>
    assetType.asset_sub_category === filterKey);
  return filteredAssetTypes.map(assetType => ({
    key: assetType.id,
    text: assetType.asset_type,
    value: assetType.asset_type
  }));
};

export const filterAssetMakes = (assetMakes, filterKey) => {
  let filteredAssetMakes = [];
  filteredAssetMakes = assetMakes.filter(assetMake =>
    (assetMake.asset_type === filterKey));
  return filteredAssetMakes.map(assetMake => ({
    key: assetMake.id,
    text: assetMake.make_label,
    value: assetMake.make_label
  }));
};

export const filterModelNumbers = (modelNumbers, filterKey) => {
  let filteredModelNunmbers = [];
  filteredModelNunmbers = modelNumbers.filter(modelNumber =>
    (modelNumber.make_label === filterKey));
  return filteredModelNunmbers.map(modelNumber => ({
    key: modelNumber.id,
    text: modelNumber.model_number,
    value: modelNumber.model_number
  }));
};
