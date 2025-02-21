import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const dbUrl = await mongoose.connect(process.env.MONGODB_URL);

    if (dbUrl) {
      console.log("DB connected...");
    }
  } catch (e) {
    console.log(`${e.message}`.red);
    console.log("error in connect DB");
  }
};
export default connectDb;
