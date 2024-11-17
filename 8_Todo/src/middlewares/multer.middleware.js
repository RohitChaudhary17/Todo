import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");  
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);  
  },
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only image files are allowed"), false);
  }
  cb(null, true);
};


export const fileUpload = multer({
  storage,
  fileFilter,
});
