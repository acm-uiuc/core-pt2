import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes';
import middlewares from './middlewares';

import models, { sequelize } from './models';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/auth', routes.auth);
app.use(
  '/admin',
  middlewares.isAuth,
  middlewares.attachUser,
  middlewares.roleCheck(2),
  routes.admin
);

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () =>
    console.log('Example app listening on port 3000!')
  );
});
