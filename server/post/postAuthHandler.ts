
///////////Post Handler
const logger = require('../logger/logger');
import {checkUserAuthorizationData} from "../authorization";

type AuthResult = string | {token:string} //string if error
let authResult: AuthResult

module.exports=  function postHandler(request: any ) {

    let authData=request.body
    logger.info('auth data:'+JSON.stringify(authData))
    authResult=checkUserAuthorizationData( authData)
    return JSON.stringify(authResult)
}