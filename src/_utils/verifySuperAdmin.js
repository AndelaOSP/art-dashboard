import jwt from 'jsonwebtoken';
import { get } from 'lodash';

export default () => {
  const token = localStorage.getItem('art-prod-web-token');

  if (!token) {
    return false;
  }

  const decodedToken = jwt.decode(token);

  return get(decodedToken, 'superuser', false);
};
