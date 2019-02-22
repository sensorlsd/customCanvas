var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = './public/screenshots';

/* GET home page. */
router.get('/:filename', function (req, res, next) {
  console.log('FILENAME:', req.params.filename);

  var items = fs.readdirSync(path);

  items = items.filter(function (name) {
    console.log('check:', name);
    return fs.lstatSync(path + '/' + name).isDirectory();
  });

  var folder = path + '/' + req.params.filename;

  if (fs.existsSync(folder)) {
    var images = fs.readdirSync(folder);

    console.log(images);
  }
  console.log("FOLDER: " + req.params.filename);
  res.render('screenshots', {
    title: 'Test Rocket',
    files: items,
    images: images,
    fld: req.params.filename
  });

});

router.get('/', function (req, res, next) {
  var items = fs.readdirSync(path);

  items = items.filter(function (name) {
    console.log('check:', name);
    return fs.lstatSync(path + '/' + name).isDirectory();
  });

  res.render('screenshots', {
    title: 'Test Rocket',
    files: items,
    fld: 'Screenshots'
  });

});

module.exports = router;