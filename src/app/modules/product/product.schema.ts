import mongoose, { Schema } from "mongoose";
import { IInStock, IProduct } from "./product.interface";
import AppError from "../../errors/AppError";

const inStockSchema = new Schema<IInStock>(
  {
    quantity: { type: Number, required: [true, "Quantity is required"] },
    status: { type: String, enum: ["inStock", "stockOut"], default: "inStock" },
  },
  { _id: false }
);
const productSchema = new Schema<IProduct>({
  title: { type: String, required: [true, "Title is Required"] },
  category: { type: String, required: [true, "Category is Required"] },
  description: { type: String, required: [true, "Description is Required"] },
  image: { type: String, required: [true, "Image is Required"] },
  price: { type: Number, required: [true, "Price is Required"] },
  availability: inStockSchema,
});

productSchema.pre("save", async function (next) {
  const existingProduct = await Product.findOne({
    title: this.title,
    category: this.category,
    description: this.description,
  });
  if (existingProduct) {
    throw new AppError(409, "Product already Exist");
  }
  next();
});

export const Product = mongoose.model<IProduct>("Product", productSchema);
