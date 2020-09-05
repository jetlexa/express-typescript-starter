import mongoose from "mongoose";

export default async () => {
  try {
    const connection = mongoose.connect(
      process.env.MONGODB_CS,
      { useUnifiedTopology: true, useNewUrlParser: true },
      (err) => {
        if (err) {
          throw err;
        } else {
          console.info("Database connection established.");
          return connection;
        }
      }
    );
  } catch (e) {
    throw new Error(e);
  }
};
