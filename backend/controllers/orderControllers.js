import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import HttpError from "../utils/httpError.js";

//Create new Order => /api/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    order,
  });
});

///Get current user orders => /api/me/orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const user = req.user._id;
  const orders = await Order.find({ user });

  if (!orders) {
    return next(new HttpError(404, "No order found with this ID"));
  }
  res.status(200).json({
    orders,
  });
});

///Get order details => /api/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id).populate("user", "name email");

  if (!order) {
    return next(new HttpError(404, "No order found with this ID"));
  }
  res.status(200).json({
    order,
  });
});

///Get all orders - Admin => /api/admin/orders
export const getAllAdminOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  if (!orders) {
    return next(new HttpError(404, "No orders found"));
  }
  res.status(200).json({
    orders,
  });
});

///Update Order - Admin => /api/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findById(id);

  if (!order) {
    return next(new HttpError(404, "No order found with this ID"));
  }
  if (order?.orderStatus === "Delivered") {
    return next(new HttpError(400, "You have already delivered this order"));
  }

  let productNotFound = false;

  // update product stock
  for (const item of order.orderItems) {
    const product = await Product.findById(item?.product?.toString());

    if (!product) {
      productNotFound = true;
      break;
    }

    if (product.stock < item.quantity) {
      return next(new HttpError(400, `Insufficient stock for ${item.name}`));
    }
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  }

  if (productNotFound) {
    return next(new HttpError(404, "No product found with one or more IDs."));
  }

  order.orderStatus = status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});

// Delete Order => /api/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) {
    return next(new HttpError(404, "No order found with this ID"));
  }

  await order.deleteOne();
  res.status(200).json({
    success: true,
  });
});

async function getSalesData(startDate, endDate) {
  const salesData = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: {
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
        },
        totalSales: {
          $sum: "$totalAmount",
        },
        numOrders: { $sum: 1 },
      },
    },
  ]);

  // Create a Map to store sales data and num of order by data
  const salesMap = new Map();
  let totalSales = 0;
  let totalNumOrders = 0;

  salesData.forEach((entry) => {
    const date = entry?._id.date;
    const sales = entry?.totalSales;
    const numOrders = entry?.numOrders;

    salesMap.set(date, { sales, numOrders });
    totalSales += sales;
    totalNumOrders += numOrders;
  });

  //Genrate array of dates between start and end Date

  const datesBetween = getDatesBetween(startDate, endDate);

  //create final sales data array
  const finalSalesData = datesBetween.map((date) => ({
    date,
    sales: (salesMap.get(date) || { sales: 0 }).sales,
    numOrders: (salesMap.get(date) || { numOrders: 0 }).numOrders,
  }));

  return { salesData: finalSalesData, totalSales, totalNumOrders };

  function getDatesBetween(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      const formattedDate = currentDate.toISOString().split("T")[0];
      dates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
}

// Get Sales Data => /api/admin/get-sales
export const getSales = catchAsyncErrors(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setUTCHours(0, 0, 0, 0);
  end.setUTCHours(23, 59, 59, 999);

  getSalesData(start, end);

  const { salesData, totalSales, totalNumOrders } = await getSalesData(
    start,
    end
  );

  res.status(200).json({
    success: true,
    sales: salesData,
    totalSales,
    totalNumOrders,
  });
});
