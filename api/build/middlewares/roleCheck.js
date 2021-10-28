"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(requiredRole) {
  return function (req, res, next) {
    if (req.currentUser.role > requiredRole) {
      return next();
    } else {
      return res.status(401).send('Action not allowed');
    }
  };
};

exports["default"] = _default;
//# sourceMappingURL=roleCheck.js.map