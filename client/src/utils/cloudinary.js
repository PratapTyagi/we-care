import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY;

const uploadMedia = async ({ file, onUploadProgress }) => {
  if (!file) return;
  // get signature. In reality you could store this in localstorage or some other cache mechanism, it's good for 1 hour
  const signatureResponse = await axios.get(BACKEND_URL + "/get-signature");

  const data = new FormData();
  data.append("file", file);
  data.append("api_key", API_KEY);
  data.append("signature", signatureResponse.data.signature);
  data.append("timestamp", signatureResponse.data.timestamp);

  const cloudinaryResponse = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress,
    }
  );

  // send the image info back to our server
  const photoData = {
    public_id: cloudinaryResponse.data.public_id,
    version: cloudinaryResponse.data.version,
    signature: cloudinaryResponse.data.signature,
  };

  return photoData;
};

export { uploadMedia };
