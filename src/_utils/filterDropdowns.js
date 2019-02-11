export const filterSubCategories = (subcategories, filterKey) => {
  let filteredSubCategories = [];
  filteredSubCategories = subcategories.filter(subcategory =>
    subcategory.asset_category === filterKey);
  return filteredSubCategories.map(subcategory => ({
    key: subcategory.id,
    text: subcategory.name,
    value: subcategory.name
  }));
};

export const filterAssetTypes = (assetTypes, filterKey) => {
  let filteredAssetTypes = [];
  filteredAssetTypes = assetTypes.filter(assetType =>
    assetType.asset_sub_category === filterKey);
  return filteredAssetTypes.map(assetType => ({
    key: assetType.id,
    text: assetType.name,
    value: assetType.name
  }));
};

export const filterAssetMakes = (assetMakes, filterKey) => {
  let filteredAssetMakes = [];
  filteredAssetMakes = assetMakes.filter(assetMake =>
    (assetMake.asset_type === filterKey));
  return filteredAssetMakes.map(assetMake => ({
    key: assetMake.id,
    text: assetMake.name,
    value: assetMake.name
  }));
};

export const filterModelNumbers = (modelNumbers, filterKey) => {
  let filteredModelNunmbers = [];
  filteredModelNunmbers = modelNumbers.filter(modelNumber =>
    (modelNumber.asset_make === filterKey));
  return filteredModelNunmbers.map(modelNumber => ({
    key: modelNumber.id,
    text: modelNumber.name,
    value: modelNumber.name
  }));
};
