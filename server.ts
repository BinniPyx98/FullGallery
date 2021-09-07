import {Response,Request} from "express";
const fs=require('fs')
const express=require('express');

const app=express();
app.use(express.json());

app.get('/gallery',(req:Request,res:Response)=>{

})

app.listen(5000)