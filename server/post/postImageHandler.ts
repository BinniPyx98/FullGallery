let fs=require('fs')
export function postImageHandler(request:any){

    let filedata = request.files.img;
    if(filedata){
        fs.writeFile(`./img/page1/${filedata.name}`,filedata.data,()=>{
            console.log('ok')
        })
        return true
    }
    else{
        console.log('err upload')
        return false
    }
}