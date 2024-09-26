import * as authServices from '../servicer/auth.js';
import createHttpError from 'http-errors';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import User from '../db/models/Users.js';

const { JWT_SECRET, APP_DOMAIN } = process.env;

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(session.refreshTokenValidUntil),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(session.refreshTokenValidUntil),
  });
};

export const signupController = async (req, res, next) => {
  try {
    const newUser = await authServices.signup(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully registered user',
      data: newUser,
    });
  } catch (error) {
    console.error('Signup error:', error);
    next(createHttpError(500, 'Failed to register user'));
  }
};

export const signinController = async (req, res, next) => {
  try {
    const session = await authServices.signin(req.body);

    setupSession(res, session);

    res.json({
      status: 200,
      message: 'Successfully signed in',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    console.error('Signin error:', error);
    next(createHttpError(401, 'Failed to sign in'));
  }
};

export const refreshController = async (req, res, next) => {
  const { refreshToken, sessionId } = req.cookies;

  try {
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
  } catch (error) {
    console.error('Refresh session error:', error);
    next(createHttpError(401, 'Failed to refresh session'));
  }
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

export const sendResetEmailController = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(404, 'User not found!');
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: '5m',
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link to reset your password: ${APP_DOMAIN}/reset-password?token=${token}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      status: 200,
      message: 'Reset password email has been successfully sent.',
      data: {},
    });
  } catch (error) {
    console.error('Send reset email error:', error);
    if (error.isHttpError) {
      return next(error);
    }
    next(
      createHttpError(500, 'Failed to send the email, please try again later.')
    );
  }
};

export const resetPasswordController = async (req, res, next) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      throw createHttpError(404, 'User not found!');
    }

    user.password = password;
    user.tokens = [];
    await user.save();

    res.status(200).json({
      status: 200,
      message: 'Password has been successfully reset.',
      data: {},
    });
  } catch (error) {
    console.error('Reset password error:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return next(createHttpError(401, 'Token is expired or invalid.'));
    }
    next(
      createHttpError(500, 'Failed to reset password, please try again later.')
    );
  }
};
