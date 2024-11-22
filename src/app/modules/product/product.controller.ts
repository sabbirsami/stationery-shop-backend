import { Request, Response } from 'express';
import { z } from 'zod';
import { productValidationSchema } from './product.validations';
import { createProductIntoDB } from './product.services';

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

export const ProductController = {
  createProduct,
};
