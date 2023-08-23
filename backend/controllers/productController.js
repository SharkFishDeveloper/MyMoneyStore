
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Product = require("../models/productModel.js");
const ApiFeatures = require("../utils/apiFeatures.js");
const ErrorHandler = require("../utils/errorHandler.js");


//*creating product -- jsut for admin
exports.createProduct = catchAsyncErrors(
    async (req,res,next)=>{
        const product = await Product.create(req.body);
        res.status(201).json({
            success:true,
            product
        })
    }
);
//* getting all products
exports.getAllProducts= catchAsyncErrors(
    async (req,res)=>{
        const resultPerPage = 5;
        const totalProducts = await Product.countDocuments();
        const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().howManyPages(resultPerPage);
        const products = await apiFeatures.query;
    
        res.status(200).json({
            success:true,
            products,
            totalProducts
        });
    }
);
//* for updating products
exports.updateProduct = catchAsyncErrors(
    async (req,res,next)=>{
        let product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("No Product found",404));
        }
        product = await Product.findByIdAndUpdate(req.params.id,req.body,
            {
                new:true,
                runValidators:true,
                useFindAndModify:false
            });
            res.status(200).json({
                success:true,
                product
            })
    }
);
//*delete a product
exports.deleteProduct = catchAsyncErrors(
    async (req,res,next)=>{
        let product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("No Product found",404));
        }
        await product.deleteOne();
        res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        })
    }
);

exports.getProductDetails=catchAsyncErrors(
    async(req,res,next)=>{
        let product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("No Product found",404));
        }
        res.status(200).json({
            success:true,
            product
        })
    }
);