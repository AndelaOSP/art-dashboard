import faker from 'faker';

export const assetTypes = Array(3).fill({}).map((value, index) => {
  return {
    "id": index,
    "asset_type": faker.random.word()
    "asset_sub_category": index,
  }
});
