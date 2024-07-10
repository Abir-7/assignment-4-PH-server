import { IProduct } from "./product.interface";
import { Product } from "./product.schema";

const createSingleProductIntoDB = async (data: IProduct) => {
  const result = await Product.create(data);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await Product.find();
  return result;
};
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateSingleProductFromDB = async (
  data: Partial<IProduct>,
  _id: string
) => {
  const { availability, ...remainData } = data;

  const modifiedData: Record<string, unknown> = { ...remainData };

  if (availability && Object.keys(availability).length) {
    for (const [key, value] of Object.entries(availability)) {
      modifiedData[`availability.${key}`] = value;
    }
  }
  const result = await Product.findByIdAndUpdate({ _id }, modifiedData, {
    new: true,
  });
  return result;
};

const deleteSingleProductFromDB = async (_id: string) => {
  const result = await Product.findByIdAndDelete(_id);
  return result;
};

export const productService = {
  getAllProductFromDB,
  createSingleProductIntoDB,
  updateSingleProductFromDB,
  deleteSingleProductFromDB,
  getSingleProductFromDB,
};
