import faker from 'faker';

export default [
  {
    id: 1,
    name: 'Make Label Fake A',
    asset_type: 'monitoring'
  },
  {
    id: 2,
    name: 'Make Label Fake B',
    asset_type: faker.random.word()
  },
  {
    id: 2,
    name: 'Make Label Fake C',
    asset_type: faker.random.word()
  }
];
