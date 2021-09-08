///////////Post Handler
import {Request} from "express";
import {checkUserAuthorizationData} from "../authorization";

type AuthResult = string | {token:string} //string if error
let authResult: AuthResult

export  function postHandler(authData: any) {
    console.log(authData)

    authResult=checkUserAuthorizationData( authData)
    return JSON.stringify(authResult)
}