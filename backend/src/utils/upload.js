
const express = require("express");
const multer  = require("multer");
const { uploadBuffer } = require("../utils/uploadImage");

const router  = express.Router();
const upload  = multer({ storage: multer.memoryStorage() }); 


router.post("/uploadImage", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const url = await uploadBuffer(req.file.buffer, req.file.mimetype);
    res.json({ url });   
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image upload failed" });
  }
});

module.exports = router;
