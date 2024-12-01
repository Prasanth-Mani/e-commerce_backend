import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  stock: { type: Number, required: true },
  tags: { type: [String], required: false }, // Optional field for tags
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;
