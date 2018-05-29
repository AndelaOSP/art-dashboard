import faker from 'faker';

export const subcategories = Array(3).fill({}).map((value, index) => {
  return {
    "id": index,
    "sub_category_name": faker.random.word(),
    "asset_category": index,
  }
});
