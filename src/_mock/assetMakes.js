

export default Array(3).fill({}).map((value, index) => ({
  id: index,
  make_label: `THIS LABEL ${index}`,
  asset_type: `This type ${index}`
}));
