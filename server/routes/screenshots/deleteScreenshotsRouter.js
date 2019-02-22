var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = './public/screenshots';
var url = require('url');
var rimraf = require("rimraf");

/* GET home page. */
router.get('/:filename', function (req, res, next) {

  var items = fs.readdirSync(path);

  var folder = path + '/' + req.params.filename;
  console.log('File to remove:', folder);

  rimraf.sync(folder);

  res.redirect(url.format({
    pathname: "/scr"
  }));


});


module.exports = router;