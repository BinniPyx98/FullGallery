import {Response, Request, NextFunction} from "express";

const express = require('express');
let bodyParser = require('body-parser');
import {getHandler} from "./get/get";

let path = require('path')
let postHandler = require("./post/post");
const logger = require('./logger/logger');
let fileUpload = require('express-fileupload')
const app = express();
logger.setLevel('warn');
app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(req)
    next()

});
path = '/Users/pm/Desktop/Astra/projects/module2/part3/Gallery/client/';
app.use(bodyParser.json())
app.use(fileUpload({}));
app.use(express.static(path))

app.get('', (req: Request, res: Response) => {
    res.sendFile(path)
})
app.get('/gallery', (request: Request, response: Response) => {
    let result = getHandler(request)

    response.send(result)
})

app.post('/gallery', (req: Request, res: Response) => {
})

//Catch post request
app.post('/auth', (request: Request, response: Response) => {
    let result = JSON.parse(postHandler(request))
    response.json({token: 'token'})   // response.send(JSON.stringify(result))
    response.end()
})

//start server
app.listen(5000, () => {
    logger.info('Server running')
})

