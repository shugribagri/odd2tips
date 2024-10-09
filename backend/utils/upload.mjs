import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).fields([
  { name: "coverImage", maxCount: 1 },
  { name: "authorImage", maxCount: 1 },
  { name: "profilePicture", maxCount: 1 },
  { name: "blogImage", maxCount: 1 },
  { name: "image", maxCount: 1 },
  { name: "file", maxCount: 1 },
  { name: "video", maxCount: 1 },
  { name: "audio", maxCount: 1 },
]);

function checkFileType(file, cb) {
  const filetypes =
    /jpeg|jpg|png|gif|svg|webp|avif|jfif|pjpeg|pjp|bmp|ico|x-icon/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

export default upload;
