"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cors = require("cors");
var app = express();
var formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('dist/appName')));
// app.use('*', (req: any, res: any, next: any) => {
//   res.sendFile(path.resolve('dist/appName/index.html'));
//   next();
// });
app.get('/posts', function (req, res) {
    // res.sendFile(path.resolve('dist/appName/index.html'));
    res.json('respond');
    console.log('-----------------------posts');
});
app.use(function (req, res) {
    res.status(404).json({ message: 'Not found' });
});
app.use(function (err, req, res, next) {
    var _a = err.status, status = _a === void 0 ? 500 : _a, _b = err.message, message = _b === void 0 ? 'Server error' : _b;
    res.status(status).json(message);
});
app.listen(3000, function () { return console.log('server started'); });
