import faker from 'faker';

export const randomAssetMakes = Array(3).fill({}).map((value, index) => ({
  id: index,
  make_label: 'Make Label Fake A',
  asset_type: faker.random.word()
}));

export const assetMakes = [
  {
    id: 1,
    make_label: 'Make Label Fake A',
    asset_type: 'monitoring'
  },
  {
    id: 2,
    make_label: 'Make Label Fake B',
    asset_type: faker.random.word()
  },
  {
    id: 2,
    make_label: 'Make Label Fake C',
    asset_type: faker.random.word()
  }
];
