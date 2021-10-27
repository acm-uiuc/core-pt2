import { Router } from 'express';
import isAuth from '../middlewares/isAuth';
import attachUser from '../middlewares/attachUser';
import roleCheck from '../middlewares/roleCheck';
import authService from '../services/authService';
import Sequelize from 'sequelize';
import models from '../models';

const router = Router();

router.post('/register', async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  let response;
  try {
    response = await authService.register(email, password, username);
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      return res.status(401).send(error.errors[0].message);
    }
    return res.status(401).send(error.message);
  }
  return res.send(response);
});

router.post('/verify', async (req, res) => {
  const token = req.body.token;

  let response;
  try {
    response = await authService.verify(token);
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      return res.status(401).send(error.errors[0].message);
    }
    return res.status(401).send(error.message);
  }

  res.send(response);
});

router.post('/forgot', async (req, res) => {
  const username = req.body.username;
  let response;
  try {
    response = await authService.forgot(username);
  } catch (error) {
    res.status(401).send(error.message);
  }
  res.send(response);
});

router.post('/reset', async (req, res) => {
  const password = req.body.password;
  const token = req.body.token;
  let response;
  try {
    response = await authService.reset(token, password);
  } catch (error) {
    res.status(401).send(error.message);
  }
  res.send(response);
});

router.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let response;
  try {
    response = await authService.login(username, password);
  } catch (error) {
    return res.status(401).send(error.message);
  }
  return res.send(response);
});

export default router;
