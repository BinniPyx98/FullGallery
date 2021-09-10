import {Response, Request, NextFunction} from "express";

const config = require('config');
const express = require('express');
let bodyParser = require('body-parser');
import {getHandler} from "./get/get";
import {postImageHandler} from "./post/postImageHandler";

const pino = require('pino')
let postHandler = require("./post/postAuthHandler");
const logger = require('./logger/logger');
let fileUpload = require('express-fileupload');
const app = express();


app.use((request: Request, response: Response, next: NextFunction) => {
    logger.info('Method-'+JSON.stringify(request.method)+' '+
                 'Url-'+JSON.stringify(request.url)+' '+
                'Body-'+JSON.stringify(request.body)+' '+
                'Headers-'+JSON.stringify(request.headers));

    if (request.method == 'POST' && request.query.page || request.method == 'GET' && request.query.page) {
        checkToken(request,next,response)
    } else {
        next();
    }

});
app.use(bodyParser.json());
app.use(fileUpload({}));
app.use(express.static(config.get('ClientPath')));
app.use('/img', express.static(__dirname + '/img'));

/*
********************** Get ***********************
 */
app.get('/', (request: Request, response: Response) => {
    logger.info(JSON.stringify(request.headers));
    response.sendFile(config.get('ClientPath'));
})

app.get('/gallery', (request: Request, response: Response) => {
    let result = getHandler(request);

    response.send(result);
})


/*
********************** Post ***********************
 */
app.post('/gallery', (request: any, response: Response) => {
    let result = postImageHandler(request);

    if (result) {
        response.sendStatus(200);
    } else {
        response.sendStatus(500);
    }
})

app.post('/auth', (request: Request, response: Response) => {
    let result = JSON.parse(postHandler(request));

    response.send(JSON.stringify(result));
    response.end();
})


/*
********************** Start server ***********************
 */
app.listen(5400, () => {
    logger.info('Server running');
})

function checkToken(request: Request, next: NextFunction,response:Response): void {
    if (request.headers.authorization === 'token') {
        next();
    } else {
        logger.info('Not authorization');
        response.send('Not authorization');
    }
}