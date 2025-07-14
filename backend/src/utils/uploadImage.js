
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const opts = {
  overwrite:   true,
  invalidate:  true,
  resource_type: "auto",
};


const uploadBase64 = (dataUri) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader.upload(dataUri, opts, (err, result) => {
      if (err || !result?.secure_url) return reject(err);
      resolve(result.secure_url);
    });
  });


const uploadBuffer = (buffer, mimetype) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      opts,
      (err, result) => {
        if (err || !result?.secure_url) return reject(err);
        resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });

module.exports = { uploadBase64, uploadBuffer };
