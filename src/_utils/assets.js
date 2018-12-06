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

export const constructUrl = (pageNumber, limit, filters = {}, status = '') => {
  let url = `manage-assets?page=${pageNumber}&page_size=${limit}`;

  if (status) {
    url = `${url}&current_status=${status}`;
  }

  if (!isEmpty(filters)) {
    url = `${url}&asset_type=${filters['Asset Types'] || ''}
    &model_number=${filters['Model Numbers'] || ''}`;
  }

  return url;
};
