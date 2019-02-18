import faker from 'faker';

export const randomModelNumbers = Array(3).fill({}).map((value, index) => ({
  id: index,
  name: faker.random.word(),
  make_label: faker.random.word()
}));

export const modelNumbers = [
  {
    id: 1,
    name: 'MC-LF600',
    make_label: 'Make Label Fake B'
  },
  {
    id: 2,
    name: 'MC-LF700',
    make_label: 'Make Label Fake A'
  },
  {
    id: 3,
    name: 'MC-LF500',
    make_label: 'Make Label Fakec '
  }
];
