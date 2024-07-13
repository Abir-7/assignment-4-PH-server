import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { Product } from "../product/product.schema";
import { IOrder } from "./order.interface";
import { Order } from "./order.schema";

const saveOrderIntoDB = async (data: IOrder) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updateOperations = data.products.map(async (item) => {
      const orderedProductId = item.id;
      const orderedQuantity = item.quantity;

      const product = await Product.findById(orderedProductId).session(session);

      if (!product) {
        throw new AppError(
          404,
          `Product with id ${orderedProductId} not found.`
        );
      }

      if (product.availability.quantity < orderedQuantity) {
        throw new AppError(
          400,
          `Not enough quantity available for product ${product.title}.`
        );
      }

      const newQuantity = product.availability.quantity - orderedQuantity;
      const newStatus =
        newQuantity === 0 ? "stockOut" : product.availability.status;

      await Product.updateOne(
        { _id: orderedProductId },
        { availability: { quantity: newQuantity, status: newStatus } },
        { session }
      );
    });

    // Await all updateOperations
    await Promise.all(updateOperations);

    // Create the order
    const result = await Order.create([data], { session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    // Rollback transaction on error
    await session.abortTransaction();
    session.endSession();
    throw new AppError(500, error as string);
  }
};

const getAllOrderFromDB = async () => {
  const result = await Order.find().populate("products.id");

  return result;
};
export const orderService = {
  saveOrderIntoDB,
  getAllOrderFromDB,
};