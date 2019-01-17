import { isEmpty } from 'lodash';

export default (updatedLocation, locationList) => {
  if (isEmpty(locationList)) {
    return false;
  }

  const index = locationList.findIndex(location => location.id === updatedLocation.id);

  if (index > -1) {
    return {
      index
    };
  }

  return false;
};
