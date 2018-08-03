const assetMocks = {
  assignAsset: {
    asset: 33,
    current_owner: 10
  },
  newAllocation: {
    asset: 'SN1231 - EWWE',
    created_at: '2018-07-27T09:26:45.629868Z',
    current_owner: 'godwin.gitonga@andela.com',
    previous_owner: null
  },
  assetDetails: {
    allocation_history: [],
    asset_category: 'Accessories',
    asset_code: 'EWWE',
    asset_sub_category: 'Computer Accessoriess',
    asset_type: 'Headset',
    assigned_to: null,
    checkin_status: null,
    created_at: '2018-07-10T15:08:54.546471Z',
    current_status: 'Available',
    id: 33,
    last_modified: '2018-07-27T08:34:12.828648Z',
    make_label: 'Microsoft',
    model_number: 'Microsoft Lifechat LX-6001',
    notes: ' ',
    purchase_date: '2018-07-02',
    serial_number: 'SN1231',
    specs: null
  },
  unassignAsset: {
    asset: '33',
    current_status: 'Available'
  },
  unassignedAsset: {
    asset: 'EWWE - SN1231',
    created_at: '2018-07-27T08:43:37.941504Z',
    current_status: 'Available',
    id: 2,
    previous_status: 'Allocated'
  }
};

export default assetMocks;
