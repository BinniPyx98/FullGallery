import {Response, Request, NextFunction} from "express";
const multer=require('multer')
const upload=multer({dest:'upload'})
const express = require('express');
let bodyParser = require('body-parser');
import {getHandler} from "./get/get";
let fs=require('fs')
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
//app.use(multer({dest:'upload'}));
app.get('', (req: Request, res: Response) => {
    res.sendFile(path)
})
app.get('/gallery', upload.any(),(request: Request, response: Response) => {
    let result = getHandler(request)

    response.send(result)
})


// Костыль для req.file потом исправить


    app.post('/',(req: any, res: Response) => {
        let filedata = req.files.filedata;

        if(filedata){
            fs.writeFile(`./img/${filedata.name}`,filedata.data,()=>{
                console.log('ok')
            })
        }
        else{
            console.log('err upload')
        }


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

