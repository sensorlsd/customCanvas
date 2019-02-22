const express = require('express');
const router = express.Router();
const qs = require('querystring');
const fs = require("fs");

router.post('/:sessionId', (req, res,next) => {
    console.log(req.params,req.query);
    let body = '';

    let date = new Date(parseInt(req.params.sessionId));

    const dir = "./public/screenshots/" + req.query.test + '-'+date.getUTCFullYear()
    + '-'+formatNumber(date.getMonth()+1)+ '-'+formatNumber(date.getUTCDate())
    + '-'+formatNumber(date.getHours())+ ':'+formatNumber(date.getMinutes())+ ':'+formatNumber(date.getSeconds());
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    let addon = '';
    if (req.query.step < 10){
        addon = '00'
    }else if (req.query.step < 100){
        addon = '0'
    }
    const fileName = "/step" + addon+req.query.step+"-"+req.query.lang + ".jpg";
    const filePath = dir + fileName;
    req.on("data", (data) => {
        body+= data;
    });
    req.on("end", () => {
        let buf = new Buffer.from(body);
        const str = buf.toString().replace(/^data:image\/\w+;base64,/, "");
        let buf2 = new Buffer.from(str, 'base64');
        fs.writeFileSync(filePath,buf2);
        res.status(200).send("ok;File name = " + fileName);
    });
    req.on("error", () => {
        res.status(404);
        next();
    });
});

var formatNumber = function(value){
    if (value < 10){
        return '0'+value;
    }else{
        return value;
    }
}


module.exports = router;
