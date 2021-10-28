"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var user = function user(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
        isIllinois: function isIllinois(value) {
          if (value.toLowerCase().split("@")[1] != "illinois.edu") {
            throw new Error("Email must end in @illinois.edu");
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING
    }
  });
  return User;
};

var _default = user;
exports["default"] = _default;
//# sourceMappingURL=user.js.map