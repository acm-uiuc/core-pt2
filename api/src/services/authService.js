import jwt from 'jsonwebtoken';
import mailService from './mailService';

function generateJWT(user) {
  const data = {
    email: user.email,
  };
  
  const signature = process.env.JWT_SECRET;
  const expiration = '48h';

  return jwt.sign({ data }, signature, { expiresIn: expiration });
  }

const authService = {
  generateToken: (user) => {
    return generateJWT(user);
  },

  validateToken: (token) => {
    const signature = process.env.JWT_SECRET;
    let email;
    try {
      let decoded = jwt.verify(token, signature);
      email = decoded.data.email;
    } catch(err) {
      throw err;
    }
    return email;
  },

  generateAndSend: async (redirect, email) => {
    if(email.toLowerCase().split("@")[1] != "illinois.edu"){
      throw new Error("Email must end in @illinois.edu", { cause: 'bad_email' });
    }
    // todo: actually send email
    const token = generateJWT({email: email});
    await mailService.sendSignEmail(redirect, email, token);
  }
}

export default authService;