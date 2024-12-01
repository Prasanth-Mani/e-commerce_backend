import mongoose from "mongoose";

export const connectDatabase = () => {
  mongoose
    .connect("mongodb+srv://prasanthportfolio1998:Prasanth1998@ecommerce.ja80b.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce")
    .then((con) => {
      console.log(`Mongo db Connected `);
    })
    .catch((err) => {
      console.error("MongoDB  connection error:", err);
    });
};
