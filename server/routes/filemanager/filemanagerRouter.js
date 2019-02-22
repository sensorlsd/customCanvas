var fs = require('fs'), path = require('path');
var ip = require("ip");

var express = require('express');

module.exports = function () {
    var app = express();
    browseDir = './public/testCases';


    app.use('/raw', function (request, response, next) {
        var unescapedPath = request.path.split('/').map(function (part) {
            return decodeURIComponent(part).replace(/\//g, '\\/');
        }).join('/');
        var relativePath = path.join('/', unescapedPath || '/');
        var fullPath = path.join(browseDir, relativePath);
        if (!path.isAbsolute(fullPath)) {
            fullPath = path.join(process.cwd(), fullPath);
        }

        if (request.method === 'PUT') {
            var stream = fs.createWriteStream(fullPath);
            request.pipe(stream);
            stream.on('error', function (error) {
                return next(error);
            });
            stream.on('close', function () {
                response.json(true);
            });
        } else if (request.method === 'GET') {
            response.sendFile(fullPath);
        } else {
            next();
        }
    });

    app.post('/save/:filename', function(request, respond) {
        var body = '';
        filePath = browseDir + '/'+request.params.filename;
        request.on('data', function(data) {
            body += data;
        });
    
        request.on('end', function (){
            fs.appendFile(filePath, body, function() {
                respond.end();
            });
        });
    });

    app.get(['/text/:filename'], function (request, response, next) {
        console.log('request for edit');
        
        console.log('iip',request.protocol + '://' + request.get('host'));


        var fullPath = path.join(browseDir, request.params.filename);


        fs.readFile(fullPath, {encoding: 'utf-8'}, function (error, text) {
            if (error) return next(error);
            response.render('editor',{
                file: request.params.filename,
                text: text,
                url:request.protocol + '://' + request.get('host')
            });
        })

    });

    app.get('/', function (request, response, next) {
        if (request.method !== 'GET') return next();
        var baseUrl = '/filemanager';
        console.log(baseUrl);


        fs.readdir(browseDir, function (error, items) {

            var dirData = {
                path: 'Root Folder',
                name: 'root',
                children: items,
                rawUrl: 'rawUrlForPath(relativePath)',
                backUrl: baseUrl
            };

            dirData.parent = 'parent';
            // response.send(templates.directory({
            //     directory: dirData,
            //     style: baseUrl + '/style'
            // }));
            response.render('directory', {
                directory: dirData,
                style: baseUrl + '/style'
            });
        })
    });

    return app;
}

