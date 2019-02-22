// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
const hbs = require('hbs');


var socketRouter = require('./routes/proxy/socket.js');
var fileManagerRouter = require('./routes/filemanager/filemanagerRouter.js');
var apiRouter = require('./routes/proxy/mockServerRouter.js');
var screenshotRouter = require('./routes/screenshots/saveScreenshotRouter.js');
var indexRouter = require('./routes/indexRouter.js');
var screenshotsRouter = require('./routes/screenshots/getScreenshotsRouter.js');
var proxyRouter = require('./routes/proxy/proxyPageRouter.js');
var downloadRouter = require ('./routes/screenshots/downloadScreenshotsRouter.js');
var deleteScreenshotsRouter = require('./routes/screenshots/deleteScreenshotsRouter.js');


socketRouter.init(server);

server.listen(port, () => {
    console.log('Server listening at port %d', port);

});

// view engine setup
hbs.registerPartials(__dirname + '/views');
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/',indexRouter);
app.use('/api/', apiRouter);
app.use('/scr/', screenshotsRouter);
app.use("/api/saveScreenShot/", screenshotRouter);
app.use("/filemanager", fileManagerRouter());
app.use('/proxy',proxyRouter);
app.use('/download',downloadRouter);
app.use('/delete',deleteScreenshotsRouter);

//localhost:5000/?testId=1&testUrl=localhost:3000&script=http://localhost:3000/automation/autotest.js
//http://gc.gaming.skywindgroup.com/fortunecase/46/index.html?testId=fortunecase_desktop.json&script=http://localhost:3000/automation/autotest.js
