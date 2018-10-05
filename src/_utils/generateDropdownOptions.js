import uuidv4 from 'uuid/v4';

export default arrayWithOptions => arrayWithOptions.map(option => ({
  key: uuidv4(),
  text: option,
  value: option
}));
