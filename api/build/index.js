"use strict";

var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _routes = _interopRequireDefault(require("./routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use('/auth', _routes["default"].auth);
app.listen(process.env.PORT || 3000, function () {
  return console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=index.js.map