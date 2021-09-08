import {Response, Request} from "express";
import {postHandler} from "./post/post";
import {getHandler} from "./get/get";
const pino = require('pino')('./info.log')
const expressPino = require('express-pino-logger')({
    logger:pino
})
//const logger = pino({level: process.env.LOG_LEVEL || 'info'});
//const expressLogger = expressPino({logger});
const express = require('express');
const app = express();
app.use(express.json());
app.use(expressPino);



// Catch get request
app.get('/gallery', (request: Request, response: Response) => {

    pino.debug('Calling res.send')
    let result = getHandler(request)

    response.send(result)
})


//Catch post request
app.post('/auth', (request: Request, response: Response) => {
    let result = postHandler(request)

    response.send(result)
})

//start server
app.listen(5000,()=>{
    pino.info('Server running')
})