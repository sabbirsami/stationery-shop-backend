import { Request, Response } from 'express';
import { z } from 'zod';
import { productValidationSchema } from './product.validations';
import {
  createProductIntoDB,
  deleteProductFromDB,
  getAllProductFromDB,
  getProductDetailsFromDB,
  updateProductFromDB,
} from './product.services';

// CREATE PRODUCT
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    // DO SOME CHANGES
    productData.updatedAt = new Date();
    productData.inStock = productData.quantity > 0;

    console.log(productData);
    const validateData = productValidationSchema.parse(productData);
    const result = await createProductIntoDB(validateData);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'product created successfully',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Unable to add product',
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(500).json({
        success: false,
        message: 'Unable to add product',
        error: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Unable to add product',
        error,
      });
    }
  }
};

// GET ALL PRODUCT / USING QUERY
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const query: Record<string, unknown> = {};

    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm as string, $options: 'i' } },
        { brand: { $regex: searchTerm as string, $options: 'i' } },
        { category: { $regex: searchTerm as string, $options: 'i' } },
      ];
    }
    const result = await getAllProductFromDB(query);
    if (result) {
      res.status(200).json({
        status: true,
        message: 'Product retrieved successfully',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Unable to get product',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to add product',
      error,
    });
  }
};

// GET SINGLE PRODUCT BY ID
const getSingleProductDetails = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await getProductDetailsFromDB(productId);
    if (result) {
      res.status(200).json({
        status: true,
        message: 'Product retrieved successfully',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Unable to get product details',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Cannot get product details',
      error,
    });
  }
};

// UPDATE PRODUCT BY ID
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;

    const result = await updateProductFromDB(productId, updatedData);

    // HANDLE RESPONSE
    if (result) {
      res.status(200).json({
        status: true,
        message: 'Product updated successfully',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Unable to update product details',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Cannot update product details',
      error,
    });
  }
};

// DELETE PRODUCT BY ID
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await deleteProductFromDB(productId);

    // HANDLE RESPONSE
    if (result?.deletedCount) {
      res.status(200).json({
        status: true,
        message: 'Product deleted successfully',
        data: {},
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Unable to delete product details',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Cannot delete product details',
      error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProductDetails,
  updateProduct,
  deleteProduct,
};
