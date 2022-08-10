const multer = require("multer");
const path = require("path");
const ramdom_text = require("../config/ramdom_text");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname +"/gambar/"))
    },
    filename: async function (req, file, cb) {
      cb(null, ramdom_text.ramdom(15) + path.extname(file.originalname))
    }
  });

const imageFilter = (req,file,cb) =>{
    if (file.mimetype.startsWith("image")) {
        cb(null,true);
    } else {
        cb("Masukkan Gambar",false)
    }
};
const upload = multer(
    { 
        storage: storage,
        fileFilter: imageFilter,
        limits: {
            fileSize:10000000
        }
    }
)

module.exports = upload;