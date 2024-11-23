import { Request, Response } from 'express';
import { orderValidationSchema } from './orders.validations';
import { z } from 'zod';
import { createUserOrderIntoDB } from './orders.services';

const createUserOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    // ADD UPDATE TIME
    order.updatedAt = new Date();
    const validateData = orderValidationSchema.parse(order);

    const result = await createUserOrderIntoDB(validateData);

    res.status(200).json({
      status: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error.errors,
      });
    } else if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unexpected error occurred',
      });
    }
  }
};

export const OrderController = {
  createUserOrder,
};
