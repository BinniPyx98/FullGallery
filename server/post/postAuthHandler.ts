
///////////Post Handler
const logger = require('../logger/logger');
import {checkUserAuthorizationData} from "../authorization";

type AuthResult = string | {token:string} //string if error
let authResult: AuthResult

export  function postHandler(request: any ) {

    let authData=request.body
    console.log(authData)
    logger.info('auth data:'+JSON.stringify(authData))
    authResult=checkUserAuthorizationData( authData)
    return JSON.stringify(authResult)
}