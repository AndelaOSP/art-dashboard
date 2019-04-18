const filters = [
  { asset_types: ['Headsets'] },
  { model_numbers: ['HP 27ES'] }
];

export const selectedFilters = {
  asset_types: ['Headsets'],
  model_numbers: ['HP 27ES'],
  'Verification Status': ['Verified', 'UnVerified'],
  Active: ['true', 'false']
};

export const selectedFilters2 = {
  asset_types: ['Headsets'],
  model_numbers: ['HP 27ES'],
  'Verification Status': ['UnVerified', 'Verified'],
  Active: ['false', 'true']
};

export const userFilters = [
  { cohort: [0] },
  { allocated_asset_count: [0] }
];

export const cohorts = [
  { id: 0, option: 0 },
  { id: 1, option: 1 }
];

export const allocatedAssets = [
  { id: 0, option: 0 },
  { id: 1, option: 1 }
];

export const allFilterValues = {
  cohorts,
  allocatedAssets
};

export default filters;
