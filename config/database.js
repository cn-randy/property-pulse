import mongoose from "mongoose";

let connected = false;

const connectDB = async function () {
  mongoose.set("strictQuery", true);

  //* If the database is already connected don' connect again
  if (connected) {
    console.log("MongoDB is already connected...");
    return;
  }

  console.log(
    "connectDB: ",
    process.env.MONGODB_ENV,
    process.env.MONGODB_URI_ATLAS,
    process.env.MONGODB_URI_LOCAL,
  );
  // connect to mongoDB
  const connectionString =
    process.env.MONGODB_ENV === "ATLAS"
      ? process.env.MONGODB_URI_ATLAS
      : process.env.MONGODB_URI_LOCAL;

  console.log(connectionString);
  try {
    await mongoose.connect(connectionString);
    connected = true;
    console.log("MongoDB connected...");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
