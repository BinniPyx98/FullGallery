const express = require('express')
const router = express.Router()
import {Request, Response} from "express";
import {postImageHandler} from "../post/postImageHandler";
import {getHandler} from "../get/get";

router.post('/', (request: any, response: Response) => {
    if (request.query.page > 3) {
        response.send("server haven't this page")
    } else {
        let result = postImageHandler(request);

        if (result) {
            response.sendStatus(200);
        } else {
            response.sendStatus(500);
        }
    }

})


router.get('/gallery', (request: Request, response: Response) => {
    let result = getHandler(request);

    response.send(result);
})
module.exports = router;