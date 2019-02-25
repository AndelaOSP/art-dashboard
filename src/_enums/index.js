export const ACCEPTABLE_ASSET_TYPES = [
  'Macbook', 'Monitor', 'Monitors', 'Windows Pc', 'Phone', 'Tablet'
];
export const SCREEN_SIZES = ['13', '15', '17'];
export const STORAGE_SIZES = ['128', '256', '512'];
export const MEMORY_SIZES = ['4', '8', '16', '32'];
export const PROCESSOR_TYPES = ['Intel core i3', 'Intel core i5', 'Intel core i7'];
export const PROCESSOR_SPEEDS = ['1.8', '2.3', '3.0', '3.4'];

export const USERS_HEADERS = {
  users: [
    'Name',
    'Email Address',
    'Cohort',
    'Assets Assigned'
  ],
  'security-users': [
    'First Name',
    'Last Name',
    'Email Address',
    'Badge No.',
    'Phone No.',
    'Active'
  ]
};

export const USERS_HEADERS_TO_DATA_KEYS = {
  users: [
    'full_name',
    'email',
    'cohort',
    'assets_assigned'
  ],
  'security-users': [
    'first_name',
    'last_name',
    'email',
    'badge_number',
    'phone_number',
    'is_active'
  ]
};
