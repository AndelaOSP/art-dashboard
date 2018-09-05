import faker from 'faker';

export default [
  {
    title: 'Model Numbers',
    content: Array(100)
      .fill({})
      .map((value, index) => ({
        id: index,
        option: faker.random.word()
      }))
  },
  {
    title: 'Asset Types',
    content: Array(50)
      .fill({})
      .map((value, index) => ({
        id: index,
        option: faker.random.word()
      }))
  }
];
