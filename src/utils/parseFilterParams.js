const parseBoolean = (value) => {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return undefined;
};

const parseString = (value) => {
  if (typeof value === 'string') {
    return value.trim() || undefined;
  }
  return undefined;
};

export const parseFilterParams = (query) => {
  const { name, phoneNumber, email, isFavourite, contactType } = query;

  return {
    name: parseString(name),
    phoneNumber: parseString(phoneNumber),
    email: parseString(email),
    isFavourite: parseBoolean(isFavourite),
    contactType: parseString(contactType),
  };
};
