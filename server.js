const express = require("express");
const cors = require("cors");
const app = express();
const cloudinary = require("cloudinary");
require("dotenv").config();

// Constants
const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get("/get-signature", (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    cloudinaryConfig.api_secret
  );
  res.json({ timestamp, signature });
});

app.post("/delete-photo", async (req, res) => {
  // Delete the photo from cloudinary
  cloudinary.uploader.destroy(req.body.id);
});

// Ports
const PORT = process.env.PORT || 1998;
app.listen(PORT, () =>
  console.log(`App listening on port ${PORT} \n http://localhost:${PORT}/`)
);
