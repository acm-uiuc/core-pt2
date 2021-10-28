"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _role = _interopRequireDefault(require("./role"));

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sequelize = new _sequelize["default"](process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'postgres'
});
exports.sequelize = sequelize;
var models = {
  User: (0, _user["default"])(sequelize, _sequelize["default"].DataTypes),
  Role: (0, _role["default"])(sequelize, _sequelize["default"].DataTypes),
  User_Role_Xref: sequelize.define('User_Role_Xref', {}, {
    timestamps: false
  })
};
models.User.belongsToMany(models.Role, {
  through: models.User_Role_Xref
});
models.Role.belongsToMany(models.User, {
  through: models.User_Role_Xref
});
models.User.hasMany(models.User_Role_Xref);
models.User_Role_Xref.belongsTo(models.User);
models.Role.hasMany(models.User_Role_Xref);
models.User_Role_Xref.belongsTo(models.Role);
Object.keys(models).forEach(function (key) {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});
var _default = models;
exports["default"] = _default;
//# sourceMappingURL=index.js.map