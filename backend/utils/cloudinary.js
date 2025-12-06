import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: "./backend/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function upload_file(file, folder) {
  const res = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "auto",
    use_filename: false,
    unique_filename: false,
    overwrite: false,
  });

  return {
    public_id: res.public_id,
    url: res.secure_url,
  };
}

export const delete_file = async (file) => {
  const res = await cloudinary.uploader.destroy(file);
  if (res?.result === "ok") return true;
};
