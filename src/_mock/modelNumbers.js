import faker from 'faker';

export const randomModelNumbers = Array(3).fill({}).map((value, index) => ({
  id: index,
  model_number: faker.random.word(),
  make_label: faker.random.word()
}));

export const modelNumbers = [
  {
    id: 1,
    model_number: 'MC-LF600',
    make_label: 'Make Label Fake B'
  },
  {
    id: 2,
    model_number: 'MC-LF700',
    make_label: 'Make Label Fake A'
  },
  {
    id: 3,
    model_number: 'MC-LF500',
    make_label: 'Make Label Fakec '
  }
];
