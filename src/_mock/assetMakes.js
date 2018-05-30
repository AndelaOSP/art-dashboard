import faker from 'faker';

export const assetMakes = Array(3).fill({}).map((value, index) => {
  return {
    "id": index,
    "make_label": faker.random.word(),
    "asset_type": faker.random.word()
  }
});
