import { Router } from 'express';
import multer from 'multer';
import {
  getAllContactsControllers,
  getAllContactsByIdController,
  addContactController,
  upsertContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import validateBody from '../utils/validateBody.js';
import { ContactSchema, patchContactSchema } from '../validation/contacts.js';
import authenticate from '../middlewares/autenticate.js';
import isValidId from '../middlewares/isValidId.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

const upload = multer({ dest: 'uploads/' });

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContactsControllers));
contactsRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(getAllContactsByIdController)
);
contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(ContactSchema),
  ctrlWrapper(addContactController)
);
contactsRouter.put(
  '/:id',
  isValidId,
  upload.single('photo'),
  validateBody(ContactSchema),
  ctrlWrapper(upsertContactController)
);
contactsRouter.patch(
  '/:id',
  isValidId,
  upload.single('photo'),
  validateBody(patchContactSchema),
  ctrlWrapper(patchContactController)
);
contactsRouter.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;
