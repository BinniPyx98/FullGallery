import {Request, Response} from "express";
const config = require('config');
const logger = require('../logger/logger');
const express=require('express')
const router=express.Router()



router.get('/', (request: Request, response: Response) => {
    logger.info(JSON.stringify(request.headers));
    response.sendFile(config.get('ClientPath'));
})


module.exports=router;