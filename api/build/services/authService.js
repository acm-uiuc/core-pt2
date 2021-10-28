"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var argon2 = _interopRequireWildcard(require("argon2"));

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

var _models = _interopRequireDefault(require("../models"));

var _mailService = _interopRequireDefault(require("./mailService"));

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function generateJWT(user) {
  var data = {
    id: user.id,
    username: user.username,
    email: user.email
  };
  var signature = process.env.JWT_SECRET;
  var expiration = '6h';
  return jwt.sign({
    data: data
  }, signature, {
    expiresIn: expiration
  });
}

var authService = {
  generateToken: function generateToken(user) {
    return generateJWT(user);
  },
  register: function () {
    var _register = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, password, username) {
      var hashed, userRecord;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_validator["default"].isEmail(email)) {
                _context.next = 2;
                break;
              }

              throw new Error('Invalid email');

            case 2:
              _context.next = 4;
              return argon2.hash(password);

            case 4:
              hashed = _context.sent;
              _context.next = 7;
              return _models["default"].User.create({
                username: username,
                email: email,
                password: hashed,
                role: -1
              });

            case 7:
              userRecord = _context.sent;
              _context.prev = 8;

              _mailService["default"].sendRegEmail(generateJWT(userRecord));

              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](8);
              throw new Error('Something went wrong. Please try again');

            case 15:
              return _context.abrupt("return", {
                user: {
                  email: userRecord.email,
                  username: userRecord.username
                }
              });

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[8, 12]]);
    }));

    function register(_x, _x2, _x3) {
      return _register.apply(this, arguments);
    }

    return register;
  }(),
  verify: function () {
    var _verify = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(token) {
      var signature, email, user, updated;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              signature = process.env.JWT_SECRET;
              jwt.verify(token, signature, function (err, decoded) {
                if (err) {
                  throw err;
                }

                email = decoded.data.email;
              });
              _context2.next = 4;
              return _models["default"].User.findOne({
                where: {
                  email: email
                }
              });

            case 4:
              user = _context2.sent;

              if (!(user.role !== -1)) {
                _context2.next = 7;
                break;
              }

              throw new Error('User already verified');

            case 7:
              _context2.next = 9;
              return user.update({
                role: 0
              });

            case 9:
              updated = _context2.sent;
              return _context2.abrupt("return", {
                user: {
                  email: updated.email,
                  username: updated.username
                },
                token: generateJWT(updated)
              });

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function verify(_x4) {
      return _verify.apply(this, arguments);
    }

    return verify;
  }(),
  forgot: function () {
    var _forgot = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(username) {
      var userRecord;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _models["default"].User.findByLogin(username);

            case 2:
              userRecord = _context3.sent;

              if (userRecord) {
                _mailService["default"].sendResetEmail(generateJWT(userRecord));
              }

              return _context3.abrupt("return", {
                username: username
              });

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function forgot(_x5) {
      return _forgot.apply(this, arguments);
    }

    return forgot;
  }(),
  reset: function () {
    var _reset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(token, password) {
      var signature, email, user, hashed, updated;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              signature = process.env.JWT_SECRET;
              jwt.verify(token, signature, function (err, decoded) {
                if (err) {
                  throw err;
                }

                email = decoded.data.email;
              });
              _context4.next = 4;
              return _models["default"].User.findOne({
                where: {
                  email: email
                }
              });

            case 4:
              user = _context4.sent;
              _context4.next = 7;
              return argon2.hash(password);

            case 7:
              hashed = _context4.sent;
              _context4.next = 10;
              return user.update({
                password: hashed
              });

            case 10:
              updated = _context4.sent;
              return _context4.abrupt("return", {
                user: {
                  email: updated.email,
                  username: updated.username
                },
                token: generateJWT(updated)
              });

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function reset(_x6, _x7) {
      return _reset.apply(this, arguments);
    }

    return reset;
  }(),
  login: function () {
    var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(username, password) {
      var userRecord, correctPass;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _models["default"].User.findByLogin(username);

            case 2:
              userRecord = _context5.sent;

              if (!(userRecord.role === -1)) {
                _context5.next = 5;
                break;
              }

              throw new Error('You must verify your account before logging in.');

            case 5:
              if (userRecord) {
                _context5.next = 9;
                break;
              }

              throw new Error('User not found');

            case 9:
              _context5.next = 11;
              return argon2.verify(userRecord.password, password);

            case 11:
              correctPass = _context5.sent;

              if (correctPass) {
                _context5.next = 14;
                break;
              }

              throw new Error('Incorrect Password');

            case 14:
              return _context5.abrupt("return", {
                user: {
                  email: userRecord.email,
                  username: userRecord.username
                },
                token: generateJWT(userRecord)
              });

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function login(_x8, _x9) {
      return _login.apply(this, arguments);
    }

    return login;
  }()
};
var _default = authService;
exports["default"] = _default;
//# sourceMappingURL=authService.js.map