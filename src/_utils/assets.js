import { isEmpty } from 'lodash';

const constructUrl = (pageNumber, limit, filters = {}, status = '') => {
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

export default constructUrl;
