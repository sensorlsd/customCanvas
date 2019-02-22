const express = require('express');
const router = express.Router();
const request = require('request');
const socket = require('./socket.js');
const model = require('./model.js');

const serverUrl = 'http://api.cd2.d.skywind-tech.com:4000/casino/game2';


router.all('/', (req, res) => {
    const url = serverUrl;
    let r = null;
    let gameId = req.body.gameId;

    //console.log('!----', req.method)
    if (req.method === 'POST') {
        console.log("REQUEST\n", req.body);
        if (model.useData) {
            res.json(model.data);
        } else {
            request.post({uri: url, json: req.body}, (error, response, body) => {
                //console.log('RESPONSE', body);
                socket.send(body, gameId);
                if (error) {
                    console.log('ERROR\n', error);
                }
                res.json(body);
            });
        }
    } else if (req.method === 'OPTIONS') {
        request.options({uri: url, json: req.body}, (error, response, body) => {
            //console.log('OPTIONS RESPONSE\n',body);
            res.json(body);
        });
    }

    //req.pipe(r).pipe(res);
});


module.exports = router;
