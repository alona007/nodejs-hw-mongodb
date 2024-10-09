import { Router } from 'express';
import * as authControllers from '../controllers/auth.js';
import { requestResetEmailSchema } from '../validation/auth.js';
import { resetPasswordSchema } from '../validation/auth.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { userSigninSchema, userSignupSchema } from '../validation/users.js';
const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userSignupSchema),
  ctrlWrapper(authControllers.signupController),
);
authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(authControllers.requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(authControllers.resetPasswordController),
);

authRouter.post(
  '/login',
  validateBody(userSigninSchema),
  ctrlWrapper(authControllers.signinController),
);
authRouter.post('/refresh', ctrlWrapper(authControllers.refreshController));
export default authRouter;
authRouter.post('/logout', ctrlWrapper(authControllers.signoutController));
