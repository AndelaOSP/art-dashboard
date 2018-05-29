import faker from 'faker';

export const modelNumbers = Array(3).fill({}).map((value, index) => {
  return {
    "id": index,
    "model_number": faker.random.word(),
    "make_label": faker.random.word()
  }
});
