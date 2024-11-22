import { Request, Response } from 'express';
import { z } from 'zod';
import { productValidationSchema } from './product.validations';
import {
  createProductIntoDB,
  getAllProductFromDB,
  getProductDetailsFromDB,
} from './product.services';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
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
const getSingleProductDetails = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    console.log(productId);
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

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProductDetails,
};
