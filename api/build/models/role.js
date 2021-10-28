"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var role = function role(sequelize, DataTypes) {
  var Role = sequelize.define('role', {
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
    extra: {
      type: DataTypes.JSONB,
      unique: false,
      allowNull: true
    }
  });
  return Role;
};

var _default = role;
exports["default"] = _default;
//# sourceMappingURL=role.js.map