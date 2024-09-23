import ContactCollection from '../db/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
  filters = {},
} = {}) => {
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find();

  if (filters.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filters.isFavourite);
  }
  if (filters.contactType) {
    contactsQuery.where('contactType').equals(filters.contactType);
  }

  const [contactsCount, contacts] = await Promise.all([
    contactsQuery.countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (id) => {
  return await ContactCollection.findById(id);
};

export const createContact = (payload) => {
  return ContactCollection.create(payload);
};

export const updateContact = async (filter, data, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(filter, data, {
    new: true,
    runValidators: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = (filter) => {
  return ContactCollection.findOneAndDelete(filter);
};
