const { diskStorage } = require("multer");
const { extname, resolve } = require("path");

let destination = folder => (req, file, cb) => cb(null, resolve(__dirname, "../../uploads/" + folder));

let filename = (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname(file.originalname));
}

const storage = function(folder){
    return diskStorage({
        destination: destination(folder),
        filename: filename
    })
}

module.exports = storage;