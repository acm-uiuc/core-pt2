import jwt from 'jsonwebtoken';

const getTokenFromHeader = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
};

export default async (req, res, next) => {
  const token = getTokenFromHeader(req);
  const signature = process.env.JWT_SECRET;
  let tokenData;
  jwt.verify(token, signature, function (err, decoded) {
    tokenData = decoded.data;
    if (err) {
      return res.status(401).send('Invalid Token');
    } else {
      req.tokenData = tokenData;
      return next();
    }
  });
};
