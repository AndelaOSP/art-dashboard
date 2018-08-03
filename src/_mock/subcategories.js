export default Array(12).fill({}).map((value, index) => ({
  id: index,
  sub_category_name: `Computer Accessories ${index}`,
  asset_category: index
}));
