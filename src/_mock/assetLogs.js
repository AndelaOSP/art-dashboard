import faker from 'faker';

export default [
  {
    id: 1,
    asset: 'Make Label Fake A',
    log_type: 'monitoring'
  },
  {
    id: 2,
    name: 'Make Label Fake B',
    log_type: faker.random.word()
  },
  {
    id: 2,
    name: 'Make Label Fake C',
    log_type: faker.random.word()
  }
];
