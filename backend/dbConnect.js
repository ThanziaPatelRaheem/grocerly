import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    let DB_URI = "";

    if (process.env.NODE_ENV === "DEVELOPMENT")
      DB_URI = process.env.DB_LOCAL_URI;
    if (process.env.NODE_ENV === "PRODUCTION") DB_URI = process.env.DB_URI;

    if (!DB_URI) {
      throw new Error("DB_URI is not defined for current NODE_ENV");
    }

    const dbCon = await mongoose.connect(DB_URI);
    console.log(
      `MongoDB Database connected with HOST:${dbCon?.connection?.host}`
    );
  } catch (error) {
    console.log(`Error :${error.message}`);
    process.exit(1);
  }
};
