import { FilterQuery } from 'mongoose';
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
export const getAllProductFromDB = async (
  query: FilterQuery<typeof ProductModal>
) => {
  try {
    const result = await ProductModal.find(query);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
};

export const getProductDetailsFromDB = async (productId: string) => {
  try {
    const result = await ProductModal.findById({ _id: productId });
    console.log(result);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
};
