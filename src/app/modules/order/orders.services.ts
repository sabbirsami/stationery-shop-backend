import mongoose from 'mongoose';
import { OrderType } from './orders.interface';
import { ProductModal } from '../product/product.model';
import { OrderModal } from './orders.model';

export const createUserOrderIntoDB = async (order: OrderType) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(order?.product)) {
      throw new Error('Invalid product ID format');
    }
    const productEexist = await ProductModal.exists({ _id: order?.product });
    if (!productEexist) {
      throw new Error('Product not found with the provided ID');
    }

    // FIND PRODUCT QUANTITY
    const productQuantityFindById = await ProductModal.find(
      { _id: order.product },
      { quantity: 1 }
    );

    // IF PRODUCT QUANTITY ZERO
    if (!productQuantityFindById[0].quantity) {
      await ProductModal.findByIdAndUpdate(order?.product, { inStock: false });
      throw new Error('Product out of stock');
    }
    // IF DON'T HAVE ENOUGH PRODUCT
    if (productQuantityFindById[0].quantity < order?.quantity) {
      throw new Error(
        `Only ${productQuantityFindById[0].quantity} product available`
      );
    }

    // CALCULATE NEW PRODUCT QUANTITY
    const productQuantity = productQuantityFindById[0].quantity;
    const newProductQuantity = order?.quantity;
    const updatedProductQuantity = productQuantity - newProductQuantity;

    // UPDATE NEW PRODUCT QUANTITY
    const updateQuantityIntoDB = await ProductModal.findByIdAndUpdate(
      order?.product,
      { quantity: updatedProductQuantity }
    );
    // IF UNABLE TO UPDATE PRODUCT QUANTITY FROM PRODUCT DB
    if (!updateQuantityIntoDB) {
      throw new Error('Unable to update product quantity');
    }

    // CREATE ORDER IN DB
    const result = await OrderModal.create(order);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(String(error));
  }
};

export const getTotalRevenueIntoDB = async () => {
  try {
    const revenueData = await OrderModal.aggregate([
      {
        $project: {
          revenue: { $multiply: ['$totalPrice', '$quantity'] },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$revenue' },
        },
      },
    ]);

    // console.log(revenueData);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;
    return totalRevenue;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(String(error));
  }
};
