let fs = require('fs')
let galleryPageNumber: Number = 1;
let imageName: String = '';

export function postImageHandler(request: any) {
    let fileData = request.files.img;

    galleryPageNumber = Number(request.query.page)
    imageName=fileData.name

    if (fileData) {
        saveImg(galleryPageNumber, imageName,fileData.data)
        return true
    } else {
        console.log('err upload')
        return false
    }
}

function saveImg(galleryPageNumber:Number,imageName:String,Image:any) {
    fs.writeFile(`./img/page${galleryPageNumber}/${imageName}`, Image, () => {
        console.log('ok')
    })
}