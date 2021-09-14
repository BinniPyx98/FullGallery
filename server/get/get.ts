import {Request} from "express";

const fs = require('fs')
const path = require('path')

//////Get Handler
type GetHandler=string|{
    total:number,
    page:number,
    objects:Array<string>
}
export function getHandler(request: Request): GetHandler {

    try {
        let pageNumber = Number(request.query.page)

        if (request.headers.authorization === 'token') {
            // Read img path
            let arr: Array<string> = fs.readdirSync(`img/page${pageNumber}`)
                .map((elem: any) => path.join(`/img/page${pageNumber}/`, elem).toString());

            let galleryObj = {
                total: 3,
                page: Number(pageNumber),
                objects: arr
            }

            return JSON.stringify(galleryObj)
        } else {
            return "Not authorization"
        }
    }
    catch (e){
        return 'server havent this page'
    }
}