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

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.post('/register', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var email, username, password, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = req.body.email;
            username = req.body.username;
            password = req.body.password;
            _context.prev = 3;
            _context.next = 6;
            return _authService["default"].register(email, password, username);

          case 6:
            response = _context.sent;
            _context.next = 14;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](3);

            if (!(_context.t0 instanceof _sequelize["default"].ValidationError)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", res.status(401).send(_context.t0.errors[0].message));

          case 13:
            return _context.abrupt("return", res.status(401).send(_context.t0.message));

          case 14:
            return _context.abrupt("return", res.send(response));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 9]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/verify', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var token, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = req.body.token;
            _context2.prev = 1;
            _context2.next = 4;
            return _authService["default"].verify(token);

          case 4:
            response = _context2.sent;
            _context2.next = 12;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);

            if (!(_context2.t0 instanceof _sequelize["default"].ValidationError)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(401).send(_context2.t0.errors[0].message));

          case 11:
            return _context2.abrupt("return", res.status(401).send(_context2.t0.message));

          case 12:
            res.send(response);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/forgot', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var username, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            username = req.body.username;
            _context3.prev = 1;
            _context3.next = 4;
            return _authService["default"].forgot(username);

          case 4:
            response = _context3.sent;
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](1);
            res.status(401).send(_context3.t0.message);

          case 10:
            res.send(response);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 7]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.post('/reset', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var password, token, response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            password = req.body.password;
            token = req.body.token;
            _context4.prev = 2;
            _context4.next = 5;
            return _authService["default"].reset(token, password);

          case 5:
            response = _context4.sent;
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](2);
            res.status(401).send(_context4.t0.message);

          case 11:
            res.send(response);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 8]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.post('/login', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var username, password, response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            username = req.body.username;
            password = req.body.password;
            _context5.prev = 2;
            _context5.next = 5;
            return _authService["default"].login(username, password);

          case 5:
            response = _context5.sent;
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](2);
            return _context5.abrupt("return", res.status(401).send(_context5.t0.message));

          case 11:
            return _context5.abrupt("return", res.send(response));

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 8]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=auth.js.map