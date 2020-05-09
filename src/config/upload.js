import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const hash = crypto.randomBytes(16).toString('hex')
    cb(null, `${hash}-${file.originalname}`)
  }
})

const upload = multer({
  storage,
  limits : { fileSize : 1 * 1024 * 1024 }, //1MB
  fileFilter (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/
    const extname =  filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(mimetype && extname){
       return cb(null,true);
    } else {
       cb('Error: Images Only!');
    }
  }

 })

 export default upload
