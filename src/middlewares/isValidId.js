import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return next(
      createHttpError(
        400,
        `The provided ID '${id}' is not a valid MongoDB ObjectId`,
      ),
    );
  }

  next();
};

export default isValidId;
