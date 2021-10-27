import Sequelize from 'sequelize';
import role from './role';
import user from './user';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
  }
);

const models = {
  User: user(sequelize, Sequelize.DataTypes),
  Role: role(sequelize, Sequelize.DataTypes),
  User_Role_Xref = sequelize.define('User_Role_Xref', {}, { timestamps: false }),
};

models.User.belongsToMany(models.Role, { through: models.User_Role_Xref });
models.Role.belongsToMany(models.User, { through: models.User_Role_Xref });
models.User.hasMany(models.User_Role_Xref);
models.User_Role_Xref.belongsTo(models.User);
models.Role.hasMany(models.User_Role_Xref);
models.User_Role_Xref.belongsTo(models.Role);

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
