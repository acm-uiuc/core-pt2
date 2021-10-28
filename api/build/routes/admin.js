"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _isAuth = _interopRequireDefault(require("../middlewares/isAuth"));

var _attachUser = _interopRequireDefault(require("../middlewares/attachUser"));

var _roleCheck = _interopRequireDefault(require("../middlewares/roleCheck"));

var _authService = _interopRequireDefault(require("../services/authService"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.post('/impersonate',
/*#__PURE__*/
// isAuth,
// attachUser,
// roleCheck(2),
function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var userUsername, userRecord;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userUsername = req.body.username;
            _context.next = 3;
            return _models["default"].User.findByLogin(userUsername);

          case 3:
            userRecord = _context.sent;

            if (userRecord) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).send('User not found'));

          case 6:
            return _context.abrupt("return", res.json({
              user: {
                email: userRecord.email,
                username: userRecord.username
              },
              jwt: _authService["default"].generateToken(userRecord)
            }));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=admin.js.map