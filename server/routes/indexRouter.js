var express = require('express');
var router = express.Router();
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect(url.format({
    pathname: "/filemanager"
  }));
});

module.exports = router;