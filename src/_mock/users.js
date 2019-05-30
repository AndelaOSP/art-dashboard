export default [
  {
    id: 1,
    first_name: 'Test',
    last_name: 'User',
    email: 'test@email.com',
    cohort: 10,
    allocated_asset_count: 0
  },
  {
    id: 2,
    first_name: 'Test2',
    last_name: 'User2',
    email: 'test2@email.com',
    cohort: 9,
    allocated_asset_count: 0
  }
];

export const SecurityUser = {
  id: 1,
  first_name: 'Test',
  last_name: 'User',
  email: 'test@email.com',
  badge_number: '10F',
  phone_number: '090938e90938',
  is_active: true
};

export const userDetail = {
  id: 1,
  first_name: 'Test',
  last_name: 'User',
  email: 'test@email.com',
  badge_number: '10F',
  phone_number: '090938e90938',
  is_active: true,
  is_staff: true
};

export const AssetAssignee = [
  {
    id: 1,
    assignee: 'test@email.com'
  },
  {
    id: 2,
    assignee: 'test2@email.com'
  }
];

export const securityUsers = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: 175,
      first_name: 'Security',
      last_name: 'One',
      email: 'security1@example.com',
      badge_number: '001',
      phone_number: '0700111222',
      last_login: null,
      is_active: true
    },
    {
      id: 176,
      first_name: 'Security',
      last_name: 'Two',
      email: 'security2@example.com',
      badge_number: '002',
      phone_number: '0700111333',
      last_login: null,
      is_active: true
    },
    {
      id: 177,
      first_name: 'Security',
      last_name: 'Three',
      email: 'security3@example.com',
      badge_number: '003',
      phone_number: '0700111444',
      last_login: null,
      is_active: true
    }
  ]
};
