const path= require('path');

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null,path.join(__dirname,'../uploads'));
    },
    filename: function (req, file, callback) {
      const uniquePrefix = Date.now() + Math.random().toString();
      callback(null, `${uniquePrefix}-${file.originalname}`)
    }
  });

  function fileFilter (req, file, callback) {
    // The function should call `callback` with a boolean
    // to indicate if the file should be accepted

    // To accept the file pass `true`, like so:
    if(file.mimetype === 'image/jpeg' || file.mimetype=== 'image/png'){
        callback(null, true)
    }else{
        // To reject this file pass `false`, like so:
        callback(null, false)
      }
  }
  
  module.exports= multer({ storage, fileFilter, 
    limits:{
        fileSize: 1024*1024*10
  }
});