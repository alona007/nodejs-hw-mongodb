import * as authServices from '../servicer/auth.js';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

export const requestResetEmailController = async (req, res, next) => {
  const email = req.body.email;

  try {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '5m',
    });

    const resetUrl = `${process.env.APP_DOMAIN}/reset-password?token=${token}`;

    await authServices.sendResetEmail(email, resetUrl);

    res.json({
      message: 'Reset password email was successfully sent!',
      status: 200,
      data: {},
    });
  } catch (error) {
    next(
      createHttpError(
        500,
        'Failed to send reset password email. Please try again later.'
      )
    );
  }
};

export const resetPasswordController = async (req, res, next) => {
  try {
    await authServices.resetPassword(req.body);
    res.json({
      message: 'Password was successfully reset!',
      status: 200,
      data: {},
    });
  } catch (error) {
    next(
      createHttpError(500, 'Failed to reset password. Please try again later.')
    );
  }
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: new Date(Date.now() + session.refreshTokenValidUntil),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: new Date(Date.now() + session.refreshTokenValidUntil),
  });
};

export const signupController = async (req, res) => {
  const newUser = await authServices.signup(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered user',
    data: newUser,
  });
};

export const signinController = async (req, res) => {
  const session = await authServices.signin(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully signed in',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;
  const session = await authServices.refreshSession({
    refreshToken,
    sessionId,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed session',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const signoutController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await authServices.signout(sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
