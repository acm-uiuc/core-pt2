"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mailService = {
  sendRegEmail: function () {
    var _sendRegEmail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
      var signature, email, link, transporter, info;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              signature = process.env.JWT_SECRET;

              _jsonwebtoken["default"].verify(token, signature, function (err, decoded) {
                email = decoded.data.email;
              });

              link = encodeURI('https://[URL]/verify?token=' + token);
              transporter = _nodemailer["default"].createTransport({
                host: process.env.MAIL_HOST,
                port: 465,
                secure: true,
                auth: {
                  user: process.env.MAIL_USER,
                  pass: process.env.MAIL_PASS
                }
              });
              _context.next = 6;
              return transporter.sendMail({
                from: '"[NAME]" <[EMAIL]>',
                to: email,
                subject: 'Verify your [URL] account',
                html: 'Welcome to <a href="https://[URL]">[URL]</a>! Someone (hopefully you!) registered for an account with this email address. If this was you, click the link below to verify your account. Otherwise, please ignore this email. <br /> <a href="' + link + '">' + link + '</a>'
              });

            case 6:
              info = _context.sent;

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function sendRegEmail(_x) {
      return _sendRegEmail.apply(this, arguments);
    }

    return sendRegEmail;
  }(),
  sendResetEmail: function () {
    var _sendResetEmail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(token) {
      var signature, email, link, transporter, info;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              signature = process.env.JWT_SECRET;

              _jsonwebtoken["default"].verify(token, signature, function (err, decoded) {
                email = decoded.data.email;
              });

              link = encodeURI('https://[URL]/reset?token=' + token);
              transporter = _nodemailer["default"].createTransport({
                host: process.env.MAIL_HOST,
                port: 465,
                secure: true,
                auth: {
                  user: process.env.MAIL_USER,
                  pass: process.env.MAIL_PASS
                }
              });
              _context2.next = 6;
              return transporter.sendMail({
                from: '"[NAME]" <[EMAIL]>',
                to: email,
                subject: 'Reset your [URL] password',
                html: 'Someone (hopefully you) has requested to reset your password on <a href="https://[URL]">[URL]</a>. If this was you, click the link below to change your password. Otherwise, please ignore this email. <br /> <a href="' + link + '">' + link + '</a>'
              });

            case 6:
              info = _context2.sent;

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function sendResetEmail(_x2) {
      return _sendResetEmail.apply(this, arguments);
    }

    return sendResetEmail;
  }()
};
var _default = mailService;
exports["default"] = _default;
//# sourceMappingURL=mailService.js.map