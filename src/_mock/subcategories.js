export default Array(12)
  .fill({})
  .map((value, index) => ({
    id: index,
    name: `Computer Accessories ${index}`,
    asset_category: index
  }));
