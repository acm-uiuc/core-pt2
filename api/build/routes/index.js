"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _admin = _interopRequireDefault(require("./admin"));

var _user = _interopRequireDefault(require("./user"));

var _auth = _interopRequireDefault(require("./auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  admin: _admin["default"],
  user: _user["default"],
  auth: _auth["default"]
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map