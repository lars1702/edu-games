require("dotenv").config();

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

console.error("TESTING TO SEE IF THIS IS EVEN VISIBLE");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "edu-fun",
  allowedFormats: ["jpg", "png"],
  filename: (req, file, cb) => cb(undefined, new Date().getTime())
})

const uploadCloud = multer({ storage: storage })
module.exports = uploadCloud;