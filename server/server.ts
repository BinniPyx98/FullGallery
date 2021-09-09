import {Response, Request, NextFunction} from "express";
const config=require('config')
const express = require('express');
let bodyParser = require('body-parser');
import {getHandler} from "./get/get";
import {postImageHandler} from "./post/postImageHandler";
let postHandler = require("./post/postAuthHandler");
const logger = require('./logger/logger');
let fileUpload = require('express-fileupload')
const app = express();
logger.setLevel('warn');



app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(req)
    next()

});
app.use(bodyParser.json())
app.use(fileUpload({}));
app.use(express.static(config.get('ClientPath')))
app.use('/img',express.static(__dirname+'/img'))
app.get('/', (req: Request, res: Response) => {
    res.sendFile(config.get('ClientPath'))
})
app.get('/gallery', (request: Request, response: Response) => {
    let result = getHandler(request)

    response.send(result)
})

app.post('/gallery', (request: any, response: Response) => {
   let result= postImageHandler(request)
   if(result){
       response.sendStatus(200);
   }
   else{
       response.sendStatus(500)
   }

})

//Catch post request
app.post('/auth', (request: Request, response: Response) => {
    let result = JSON.parse(postHandler(request))
    response.send(JSON.stringify(result))
    response.end()
})

//start server
app.listen(5400, () => {
    logger.info('Server running')
})

