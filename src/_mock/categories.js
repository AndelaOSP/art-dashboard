import faker from 'faker';

export const categories = Array(3).fill({}).map((value, index) => {
  return {
    "id": index,
    "category_name": faker.random.word()
  }
});
