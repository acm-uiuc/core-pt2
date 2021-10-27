import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import models from '../models';
import mailService from './mailService';
import validator from 'validator';

function generateJWT(user) {
  const data = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  const signature = process.env.JWT_SECRET;
  const expiration = '6h';

  return jwt.sign({ data }, signature, { expiresIn: expiration });
}

const authService = {
  generateToken: (user) => {
    return generateJWT(user);
  },
  register: async (email, password, username) => {
    if (!validator.isEmail(email)) {
      throw new Error('Invalid email');
    }
    const hashed = await argon2.hash(password);
    const userRecord = await models.User.create({
      username,
      email,
      password: hashed,
      role: -1,
    });
    try {
      mailService.sendRegEmail(generateJWT(userRecord));
    } catch (error) {
      throw new Error('Something went wrong. Please try again');
    }
    return {
      user: {
        email: userRecord.email,
        username: userRecord.username,
      },
    };
  },

  verify: async (token) => {
    const signature = process.env.JWT_SECRET;
    let email;
    jwt.verify(token, signature, function (err, decoded) {
      if (err) {
        throw err;
      }
      email = decoded.data.email;
    });

    const user = await models.User.findOne({ where: { email } });
    if (user.role !== -1) {
      throw new Error('User already verified');
    }
    const updated = await user.update({ role: 0 });

    return {
      user: {
        email: updated.email,
        username: updated.username,
      },
      token: generateJWT(updated),
    };
  },

  forgot: async (username) => {
    const userRecord = await models.User.findByLogin(username);
    if (userRecord) {
      mailService.sendResetEmail(generateJWT(userRecord));
    }
    return {
      username,
    };
  },

  reset: async (token, password) => {
    const signature = process.env.JWT_SECRET;
    let email;
    jwt.verify(token, signature, function (err, decoded) {
      if (err) {
        throw err;
      }
      email = decoded.data.email;
    });

    const user = await models.User.findOne({ where: { email } });
    const hashed = await argon2.hash(password);
    const updated = await user.update({ password: hashed });

    return {
      user: {
        email: updated.email,
        username: updated.username,
      },
      token: generateJWT(updated),
    };
  },

  login: async (username, password) => {
    const userRecord = await models.User.findByLogin(username);
    if (userRecord.role === -1) {
      throw new Error('You must verify your account before logging in.');
    }
    if (!userRecord) {
      throw new Error('User not found');
    } else {
      const correctPass = await argon2.verify(userRecord.password, password);
      if (!correctPass) {
        throw new Error('Incorrect Password');
      }
    }

    return {
      user: {
        email: userRecord.email,
        username: userRecord.username,
      },
      token: generateJWT(userRecord),
    };
  },
};

export default authService;
