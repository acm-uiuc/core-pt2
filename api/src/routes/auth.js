import { Router } from 'express';
import authService from '../services/authService'

const router = Router();

router.post('/generate', async (req, res) => {
  const email = req.body.email;
  const redirect = req.body.redirect;
  try {
    await authService.generateAndSend(redirect, email);
  } catch (err) {
    if (err.cause === 'bad_email') {
      return res.status(403).send(err.message);
    }
    console.log("error: " + err);
    return res.status(500).send(err);
  }
  return res.send("Sent verification email!");
});

router.post('/validate', async (req, res) => {
  const token = req.body.token;
  let email;
  try {
      email = await authService.validateToken(token);
  } catch(err) {
    
    return res.status(401).send("Failed to verify valid token");
  }
  return res.send(email);
});

export default router;