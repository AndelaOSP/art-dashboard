import faker from 'faker';

export default Array(3).fill({}).map((value, index) => ({
  id: index,
  name: faker.random.word()
}));
