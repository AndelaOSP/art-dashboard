export default {
  departmentsCount: 2,
  next: null,
  previous: null,
  results: [
    {
      id: 2,
      name: 'Technology',
      created_at: '2018-10-26T09:15:24.140407Z',
      last_modified: '2018-10-26T09:15:24.140460Z'
    },
    {
      id: 3,
      name: 'Travel',
      created_at: '2018-11-27T19:04:35.209418Z',
      last_modified: '2018-11-27T19:04:35.209468Z'
    }
  ]
};

export const departmentDetail1 = {
  name: 'Technology',
  id: 2,
  assets_assigned: [
    {
      uuid: 'cde76cd9-3161-43a5-b0be-c20d44d5ba49',
      asset_category: 'Electronics',
      serial_number: 'SERIAL-NUMBERS',
      asset_code: 'TAGTAGTAG',
      asset_type: 'Monitors'
    }
  ]
};

export const departmentDetail2 = {
  name: 'Travel',
  id: 3,
  assets_assigned: []
};
