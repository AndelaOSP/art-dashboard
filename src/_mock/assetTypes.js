import faker from 'faker';

const assetTypes = Array(3).fill({}).map((value, index) => ({
  id: index,
  asset_type: faker.random.word(),
  asset_sub_category: index
}));

export default assetTypes;
