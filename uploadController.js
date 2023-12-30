// uploadMiddleware.js
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // specify the folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // generate unique filename
  },
});

const upload = multer({ storage });

module.exports = upload;
