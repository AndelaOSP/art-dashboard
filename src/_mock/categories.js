import faker from 'faker';

export default Array(3).fill({}).map((value, index) => ({
  id: index,
  category_name: faker.random.word()
}));
