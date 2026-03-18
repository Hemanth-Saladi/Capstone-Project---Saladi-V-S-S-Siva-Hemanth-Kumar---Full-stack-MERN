const multer = require("multer");
const fs = require("fs");
const path = require("path");

const createFolder = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

createFolder("uploads");
createFolder("uploads/audio");
createFolder("uploads/covers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "audio" || file.fieldname === "songs") {
      cb(null, "uploads/audio");
    } else if (file.fieldname === "cover") {
      cb(null, "uploads/covers");
    } else {
      cb(null, "uploads");
    }
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;