const parseNumber = (number, defaultValue) => {
  if (typeof number === 'number') {
    return Number.isNaN(number) ? defaultValue : number;
  }

  if (typeof number === 'string') {
    const parsedNumber = parseInt(number, 10);
    return Number.isNaN(parsedNumber) ? defaultValue : parsedNumber;
  }

  return defaultValue;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
