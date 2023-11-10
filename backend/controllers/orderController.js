const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Order = require("../models/orderModel.js");
const ErrorHandler = require("../utils/errorHandler.js");

exports.createNewOrder = catchAsyncErrors(
    async(req,res,next)=>{
        const {
            shippingInfo,
            orderedItem,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
            } = req.body;

            const order = await Order.create({
                userOrderInfo:shippingInfo,
                orderedItem,
                paymentInfo,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                purchasedAt:Date.now() + (5.5 * 60*60*1000),
                userId:req.user._id
            }); 

            res.status(200).json({
                success:true,
                order
            });

    }
);
//* get single order only for admin
exports.getSingleOrder = catchAsyncErrors(
    async(req,res,next)=>{
        const singleOrder = await Order.findById(req.params.id).populate("userId","name email");

        if(!singleOrder){
            return next(new ErrorHandler("Order not found",404));
        }

        res.status(200).json({
            success:true,
            message:"fetching order only logged user",
            singleOrder
        });
    }
);

//* order log for logged in user
exports.getAllOrders = catchAsyncErrors(
    async(req,res,next)=>{
        const orders = await Order.find({userId:req.user._id});

        if(!orders){
            return next(new ErrorHandler("No order found",404));
        }

        res.status(200).json({
            success:true,
            message:"fetching order log for logged in user",
            orders
        });
    }
);
//* get all orders for admin
exports.getAllOrdersAdmin = catchAsyncErrors(
    async(req,res,next)=>{
        const orders = await Order.find();
        if(!orders){
            return next(new ErrorHandler("No order found",404));
        }
        let totalOrders = await Order.countDocuments();
        let totalAmout = 0;
        orders.forEach((order)=>{
            totalAmout+=order.totalPrice;
        });
        res.status(200).json({
            success:true,
            message:"fetching all orders for Admin",
            totalOrders:totalOrders,
            totalAmout:totalAmout,
            orders
        });
    }
);
//*update order status (only for admin)
exports.updateOrderStatus= catchAsyncErrors(
    async(req,res,next)=>{
        const order = await Order.findById(req.params.id);
        if(!orders){
            return next(new ErrorHandler("No order found",404));
        }
        if(order.orderStatus==="delivered"){
            return next(new ErrorHandler("Order already delivered",404));
        }
        order.orderedItem.forEach(async (i)=>{
            await updateProductStock(i.productId,i.quantity);
        });
        order.orderStatus=req.body.status;
        if(req.body.status==="delivered"){
            order.deliveredAt = Date.now();
        }
        await order.save({
            validateBeforeSave:false
        });
        res.status(200).json({
            success:true,
            message:"fetching all orders for Admin",
            totalOrders:totalOrders,
            totalAmout:totalAmout,
            orders
        });
    }
);
async function updateProductStock(productId,productQuantity){
    const product = await Product.findById(productId);
    product.Stock-=productQuantity;
    await product.save({
        validateBeforeSave:false
    });
}

//*delete order only for admin
exports.deleteOrder= catchAsyncErrors(
    async(req,res,next)=>{
        const order = await Order.findById(req.user._id);

        if(!order){
            return next(new ErrorHandler("No order found",404));
        }
        await order.deleteOne();
        res.status(200).json({
            success:true,
            message:"Order deleted successfully"
        });
    }
);