const parseBoolean = (value) => {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return undefined;
};

const parseString = (contactType) => {
  if (typeof contactType !== 'string') return undefined;

  const validContactTypes = ['work', 'home', 'personal'];
  return validContactTypes.includes(contactType) ? contactType : undefined;
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
