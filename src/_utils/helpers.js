import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

const pageOffset = (pageNumber, limit) => pageNumber * limit;

export const isCountCutoffExceeded = (cutoff = 100) => (pageNumber, limit) => {
  const offset = pageOffset(pageNumber, limit);
  return offset > cutoff;
};

export const fetchData = url => axios.get(url);


const MAP_QUERY_ARG = {
  status: 'current_status',
  'Model Numbers': 'model_number',
  'Asset Types': 'asset_type',
  Cohort: 'cohort',
  'Asset Assigned': 'asset_count'
};

const buildQueryString = (key = '', data = {}) => `&${MAP_QUERY_ARG[key]}=${data[key]}`;

/**
 * filters = {
 *   Cohort: 12,
 *   'Model Numbers': 123,
 *   'Asset Assigned': 3
 * }
 *
 * @param {object} filters
 */
const buildFiltersQueryString = (filters) => {
  let query = '';
  Object.keys(filters).forEach((filterType) => {
    query += buildQueryString(filterType, filters);
  });
  return query;
};

/**
 * This method is a helper function created to help with creating
 * dynamic API endpoints, together with the query strings.
 *
 * optionalArgs is an object of the form:
 * {
 *   filters: {},
 *   status: ''
 * }
 * You can add more to the object as the need arises.
 *
 * @param {string} entity the API endpoint such as `/manage-assets`
 * @param {number} pageNumber
 * @param {number} pageSize limit per page
 * @param  {object} optionalArgs holds optional parameters like filters, status, etc, as an object
 */
export const constructApiUrl = (entity, pageNumber, pageSize, optionalArgs = {}) => {
  let url = `${entity}?page=${pageNumber}&page_size=${pageSize}`;

  if (!isEmpty(optionalArgs)) {
    let query = '';
    Object.keys(optionalArgs).forEach((param) => {
      if (param === 'filters') {
        query += buildFiltersQueryString(optionalArgs[param]);
      } else {
        query += buildQueryString(param, optionalArgs);
      }
    });

    url = `${url}${query}`;
  }

  return url;
};
