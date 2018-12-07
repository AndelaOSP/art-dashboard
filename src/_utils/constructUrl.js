import { isEmpty } from 'lodash';

const constructUrl = (pageNumber, limit, filters = {}) => {
  let url = `users?page=${pageNumber}&page_size=${limit}`;

  if (!isEmpty(filters)) {
    url = `${url}&asset_count=${filters['Asset Assigned'] || ''}&cohort=${filters.Cohort || ''}`;
  }
  return url;
};

export default constructUrl;
