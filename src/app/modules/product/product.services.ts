import { FilterQuery } from 'mongoose';
import { ProductType } from './product.interface';
import { ProductModal } from './product.model';

// CREATE PRODUCT
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

// GET ALL PRODUCT / USING QUERY

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

// GET SINGLE PRODUCT BY ID

export const getProductDetailsFromDB = async (productId: string) => {
  try {
    const result = await ProductModal.findById({ _id: productId });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
};

// UPDATE PRODUCT BY ID

export const updateProductFromDB = async (
  productId: string,
  updatedData: object
) => {
  try {
    const updatedDataWithUpdatedAtTime = {
      ...updatedData,
      updatedAt: new Date(),
    };

    const result = await ProductModal.findByIdAndUpdate(
      productId,
      updatedDataWithUpdatedAtTime,
      { new: true }
    );

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
};

// DELETE PRODUCT BY ID

export const deleteProductFromDB = async (productId: string) => {
  try {
    const result = await ProductModal.deleteOne({ _id: productId });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
};
