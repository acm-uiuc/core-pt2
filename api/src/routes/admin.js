import { Router } from 'express';
import isAuth from '../middlewares/isAuth';
import attachUser from '../middlewares/attachUser';
import roleCheck from '../middlewares/roleCheck';
import authService from '../services/authService';
import models from '../models';

const router = Router();

router.post(
  '/impersonate',
  // isAuth,
  // attachUser,
  // roleCheck(2),
  async (req, res) => {
    const userUsername = req.body.username;

    const userRecord = await models.User.findByLogin(userUsername);

    if (!userRecord) {
      return res.status(404).send('User not found');
    }

    return res.json({
      user: {
        email: userRecord.email,
        username: userRecord.username,
      },
      jwt: authService.generateToken(userRecord),
    });
  }
);

export default router;
