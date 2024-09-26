import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import * as authControllers from '../controllers/auth.js';
import {
  userSignupSchema,
  userSigninSchema,
  resetPasswordSchema,
  newPasswordSchema,
} from '../validation/Users.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userSignupSchema),
  ctrlWrapper(authControllers.signupController)
);

authRouter.post(
  '/login',
  validateBody(userSigninSchema),
  ctrlWrapper(authControllers.signinController)
);

authRouter.post(
  '/send-reset-email',
  validateBody(resetPasswordSchema),
  ctrlWrapper(authControllers.sendResetEmailController)
);

authRouter.post(
  '/reset-pwd',
  validateBody(newPasswordSchema),
  ctrlWrapper(authControllers.resetPasswordController)
);

authRouter.post('/refresh', ctrlWrapper(authControllers.refreshController));
authRouter.post('/logout', ctrlWrapper(authControllers.signoutController));

export default authRouter;
