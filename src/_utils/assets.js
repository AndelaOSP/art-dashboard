import { isEmpty } from 'lodash';

export default (updatedAsset, assetList) => {
  if (isEmpty(assetList)) {
    return false;
  }

  const pages = Object.keys(assetList);
  for (const page of pages) {
    const assets = assetList[page];
    const index = assets.findIndex(asset => asset.uuid === updatedAsset.uuid);

    if (index > -1) {
      return {
        index,
        page
      };
    }
  }

  return false;
};

