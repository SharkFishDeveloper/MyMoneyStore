
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Product = require("../models/productModel.js");
const ApiFeatures = require("../utils/apiFeatures.js");
const ErrorHandler = require("../utils/errorHandler.js");


//*creating product -- jsut for admin
exports.createProduct = catchAsyncErrors(
    async (req,res,next)=>{

        req.body.user = req.user.id;
        const product = await Product.create(req.body);
        res.status(201).json({
            success:true,
            product
        })
    }  
);
//* getting all products
exports.getAllProducts= catchAsyncErrors(
    async (req,res,next)=>{
        const resultPerPage = 2;
        //const totalProducts = await Product.countDocuments();
        // const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().howManyPages(resultPerPage);

        //  let products = await apiFeatures.query;
        //  let filteredProductsCount = products.length;
        // apiFeatures.howManyPages(resultPerPage);
        // products = await apiFeatures.query;
        const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter();
        // let products = await apiFeatures.query; 
        // apiFeatures.howManyPages(resultPerPage);
        // let filteredProductsCount = products.length;
        //  products = await apiFeatures.query;
        // Only execute the query once
        let filteredProductsCount = await Product.countDocuments(apiFeatures.query.getFilter());

        // Apply pagination on top of the filters
        apiFeatures.howManyPages(resultPerPage);
        let products = await apiFeatures.query;

        const totalProducts = await Product.countDocuments();
        
        //!understand how above method works
        res.status(200).json({
            success:true,
            products,
            totalProducts,
            resultPerPage,
            filteredProductsCount
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
//* create product review
exports.createProductReview = catchAsyncErrors(
    async(req,res,next)=>{
        const{rating, comment,productId} = req.body;
        if(rating<0 || rating>5){
            res.status(400).json({
                success:false,
                message:"Enter rating in range of 0-5"
            });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        const review = {
            user:req.user._id,
            name:req.user.name,
            rating:Number(rating),
            comment
        };
        
        const userhasReviewed = product.reviews.find(revu => revu.user.toString()===req.user._id.toString());

        if(userhasReviewed){
            product.reviews.forEach(revu=>{
                if(revu.user.toString()===req.user._id.toString()){
                    revu.rating = rating;
                    revu.comment = comment;
                }
            })
        }else{
            product.reviews.push(review);
            product.numberofReviews = product.reviews.length;
        }

        let avg =0;
        product.reviews.forEach(i => {
            avg += i.rating;
        });
        product.ratings = avg / product.reviews.length;

        await product.save({validateBeforeSave:false});

        res.status(200).json({
            messagge:"for reviewd product",
            succes:true,
            productId:productId,
            productReview:product.reviews,
            finalProductRating:product.ratings,
        });
    }
);

//* get all product reviews
exports.getProductReviews = catchAsyncErrors(
    async(req,res,next)=>{
        const product = await Product.findById(req.query.productId);

        if(!product){
            return next(new ErrorHandler("Product not found",404));
        }
        res.status(200).json({
            success:true,
            reviews:product.reviews
        });
    }
);

//* delete a review
exports.deleteReview = catchAsyncErrors(
    async(req,res,next)=>{
        const product = await Product.findById(req.query.productId);

        if(!product){
            return next(new ErrorHandler("Product not found",404));
        }

        const reviews = product.reviews.filter(
            i=>  i._id.toString()!==req.query.id.toString()
        );

        let avg =0;
        reviews.forEach(i => {
            avg += i.rating;
        });
        const ratings = avg / product.reviews.length;
        const numberofReviews = reviews.length;
        await Product.findByIdAndUpdate(req.query.productId,{
            reviews,
            numberofReviews,
            ratings
        },{
            new:true,
            runValidators:false
        });
        //! useFindAnd Modify not used above

        res.status(200).json({
            success:true,
        });
    }
);