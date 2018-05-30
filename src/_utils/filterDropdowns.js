export const filterSubCategories = (subcategories, filterKey) => {
  let filteredSubCategories = [];
  filteredSubCategories = subcategories.filter((subcategory) => {
    return subcategory.asset_category === filterKey
  });
  return filteredSubCategories.map((subcategory) => {
    return {
      key: subcategory.id,
      text: subcategory.name,
      value: subcategory.id
    }
  });
};

export const filterAssetTypes = (assetTypes, filterKey) => {
  let filteredAssetTypes = [];
  filteredAssetTypes = assetTypes.filter((assetType) => {
    return assetType.asset_sub_category === filterKey;
  });
  return filteredAssetTypes.map((assetType) => {
    return {
      key: assetType.id,
      text: assetType.asset_type,
      value: assetType.asset_type
    }
  });
};

export const filterAssetMakes = (assetMakes, filterKey) => {
  let filteredAssetMakes = [];
  filteredAssetMakes = assetMakes.filter((assetMake) => {
    return (assetMake.asset_type === filterKey);
  });
  return filteredAssetMakes.map((assetMake) => {
    return {
      key: assetMake.id,
      text: assetMake.make_label,
      value: assetMake.make_label
    }
  });
};

export const filterModelNumbers = (modelNumbers, filterKey) => {
  let filteredModelNunmbers = [];
  filteredModelNunmbers = modelNumbers.filter((modelNumber) => {
      return (modelNumber.make_label === filterKey);
  });
  return filteredModelNunmbers.map((modelNumber) => {
    return {
      key: modelNumber.id,
      text: modelNumber.model_number,
      value: modelNumber.id
    }
  });
};
