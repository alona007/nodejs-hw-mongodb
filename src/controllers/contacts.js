import createHttpError from 'http-errors';
import * as contactServices from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filters = parseFilterParams(req.query);

    const data = await contactServices.getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filters,
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts',
      data,
    });
  } catch (error) {
    next(createHttpError(500, `Failed to get contacts: ${error.message}`));
  }
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await contactServices.getContactById(id);

    if (!data) {
      return next(createHttpError(404, `Contact with id=${id} not found`));
    }

    res.json({
      status: 200,
      message: `Contact with ${id} successfully found`,
      data,
    });
  } catch (error) {
    next(createHttpError(500, `Failed to get contact: ${error.message}`));
  }
};

export const addContactController = async (req, res, next) => {
  try {
    const data = await contactServices.createContact(req.body);

    res.status(201).json({
      status: 201,
      message: 'Contact added successfully',
      data,
    });
  } catch (error) {
    next(createHttpError(400, `Failed to add contact: ${error.message}`));
  }
};

export const upsertContactController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { isNew, data } = await contactServices.updateContact(
      { _id: id },
      req.body,
      { upsert: true },
    );

    if (!data) {
      return next(createHttpError(404, 'Contact not found'));
    }

    const status = isNew ? 201 : 200;
    res.status(status).json({
      status,
      message: 'Contact upserted successfully',
      data,
    });
  } catch (error) {
    next(createHttpError(400, `Failed to upsert contact: ${error.message}`));
  }
};

export const patchContactController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await contactServices.updateContact({ _id: id }, req.body);

    if (!result) {
      return next(createHttpError(404, `Contact with id=${id} not found`));
    }

    res.json({
      status: 200,
      message: 'Contact patched successfully',
      data: result.data,
    });
  } catch (error) {
    next(createHttpError(400, `Failed to patch contact: ${error.message}`));
  }
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await contactServices.deleteContact({ _id: id });

    if (!data) {
      return next(createHttpError(404, `Contact with id=${id} not found`));
    }

    res.status(204).send();
  } catch (error) {
    next(createHttpError(500, `Failed to delete contact: ${error.message}`));
  }
};
