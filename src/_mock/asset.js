export const asset = {
  id: 1,
  asset_code: 'AND/HS/0909',
  asset_location: 'Dojo',
  serial_number: '897832SWWS',
  model_number: 6,
  checkin_status: 'string',
  assigned_to: {
    id: 4,
    first_name: 'John',
    last_name: 'Kamau',
    full_name: 'string',
    email: 'joekamau@andela.com',
    cohort: 0,
    slack_handle: 'jkamau',
    picture: 'string',
    phone_number: '0701000100',
    last_modified: '2018-05-28T10:28:13Z',
    date_joined: '2018-05-28T10:28:13Z',
    last_login: '2018-05-28T10:28:13Z'
  },
  created_at: '2018-05-28T10:28:13Z',
  last_modified: '2018-05-28T10:28:13Z',
  current_status: 'Available',
  asset_type: 'Headsets',
  uuid: 'a134c9c1-a6fd-4390-8596-ec12b13b1ca6'
};

export const newAllocation = {
  current_owner: 'humphrey.thuo@andela.com',
  created_at: '2018-07-27T09:31:03.930553Z'
};

export const unAssignedAsset = {
  id: 631,
  status_history: [
    {
      id: 630,
      asset: 27,
      current_status: 'Available',
      previous_status: 'Available',
      created_at: '2018-07-23T15:00:17.330827Z'
    },
    {
      id: 627,
      asset: 27,
      current_status: 'Available',
      previous_status: 'Available',
      created_at: '2018-07-27T09:25:37.185019Z'
    }
  ],
  created_at: '2018-07-27T09:36:40.710348Z'
};
