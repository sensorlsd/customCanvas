var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = './public/screenshots';
var archiver = require('archiver');

/* GET home page. */
router.get('/:filename', function (req, res, next) {
  
  var items = fs.readdirSync(path);
  
  var folder = path + '/' + req.params.filename;
  console.log('File to download:', folder);
    var archive = archiver('zip');

    archive.on('error', function(err) {
      res.status(500).send({error: err.message});
    });

    archive.on('warning', function(err) {
      if (err.code === 'ENOENT') {
        // log warning
        console.log(err);
      } else {
        // throw error
        throw err;
      }
    });

    //on stream closed we can end the request
  archive.on('end', function() {
    console.log('Archive wrote %d bytes', archive.pointer());
    });

    
    //set the archive name
  res.attachment(req.params.filename+'.zip');

  //this is the streaming magic
  archive.pipe(res);

  archive.directory(folder,false);
  archive.finalize();
  
});


module.exports = router;