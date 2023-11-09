const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.stripePaymentProcess = catchAsyncErrors(async(req,res,next)=>{
    
        //const authorizationHeader = `Bearer ${process.env.STRIPE_API_KEY}`;
        const payment = await stripe.paymentIntents.create({
            amount : req.body.amount,
            currency:"inr",
            // headers: {
            //     Authorization: authorizationHeader,
            // },
        });
        res.status(200).json({success:true,client_secret:payment.client_secret});
});


exports.stripeApiKeyFunction = catchAsyncErrors(async(req,res,next)=>{
    console.log("Stripe API Key route hit");
    res.status(200).json({stripeApiKeyReveal : process.env.STRIPE_API_KEY});
});