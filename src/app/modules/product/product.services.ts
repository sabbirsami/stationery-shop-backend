import { ProductType } from './product.interface';
import { ProductModal } from './product.model';

export const createProductIntoDB = async (product: ProductType) => {
  try {
    const result = await ProductModal.create(product);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(String(error));
  }
};
export const getAllProductFromDB = async () => {
  try {
    const result = await ProductModal.find();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(String(error));
  }
};
