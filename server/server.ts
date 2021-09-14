import {Response, Request, NextFunction} from "express";

const swaggerUI = require("swagger-ui-express")
const path = require('path')
const YAML = require('yamljs')

let fileUpload = require('express-fileupload');
const express = require('express');
let bodyParser = require('body-parser');
const config = require('config');

const auth = require('./routes/auth')
const gallery = require('./routes/gallery')
const home = require('./routes/home')
const logger = require('./logger/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, './docs/openapi/api.yml'));

app.use(bodyParser.json(), (request: Request, response: Response, next: NextFunction) => {
    console.log(request.url)

    requestLogging(request)
    if (request.method == 'POST' && request.query.page || request.method == 'GET' && request.query.page) {
        checkToken(request, next, response)
        next()
    } else {
        next();
    }
});

app.use("/auth", auth)
app.use("/", home)
app.use("/gallery", gallery)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(fileUpload({}));
app.use(express.static(config.get('ClientPath')));
app.use('/img', express.static(__dirname + '/img'));


function checkToken(request: Request, next: NextFunction, response: Response): void {
    if (request.headers.authorization === 'token') {
        next();
    } else {
        logger.info('Not authorization');
        response.send('Not authorization');
    }
}

function requestLogging(request: Request): void {
    logger.info('Method-' + JSON.stringify(request.method) + ' ' +
        'Url-' + JSON.stringify(request.url) + ' ' +
        'Body-' + JSON.stringify(request.body) + ' ' +
        'Headers-' + JSON.stringify(request.headers));
}


/*
********************** Start server ***********************
 */
app.listen(5400, () => {
    logger.info('Server running');
})
