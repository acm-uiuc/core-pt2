import models from '../models';

export default async (req, res, next) => {
  const decodedTokenData = req.tokenData;
  console.log(decodedTokenData.id);
  const userRecord = await models.User.findOne({
    where: { id: decodedTokenData.id },
  });
  console.log(userRecord);
  req.currentUser = userRecord;

  if (!userRecord) {
    return res.status(401).end('User not found');
  } else {
    return next();
  }
};
