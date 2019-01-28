import { isEmpty } from 'lodash';

export default (updatedObject, paginatedObject) => {
  if (isEmpty(paginatedObject)) {
    return false;
  }

  const pages = Object.keys(paginatedObject);
  for (const page of pages) {
    const pageArray = paginatedObject[page];

    const index = pageArray.findIndex((option) => {
      if (option.uuid && updatedObject.uuid) {
        return (
          option.uuid === updatedObject.uuid
        );
      }

      return (
        option.id === updatedObject.id
      );
    });

    if (index > -1) {
      return {
        index,
        page
      };
    }
  }

  return false;
};
