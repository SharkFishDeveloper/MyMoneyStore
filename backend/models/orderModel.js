const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userOrderInfo:{
        address:{type:String,default:null,required:true},
        city:{type:String,default:null,required:true},
        state:{type:String,default:null,required:true},
        country:{type:String,default:null,required:true},
        pincode:{type:Number,default:null,required:true},
        phone:{type:String,required:true,
            validate: {
                validator: function(v) {
                    // Convert the number to a string and check its length
                    return v.toString().length === 10;
                },
                message: "Phone number should be 10 digits long"
            }},
    },
    orderedItem:[
        {
            name:{type:String,required:true,
            minLength:[4,"Name should be greater than 4 letters"]   
            ,maxLength:[40,"Name is too big"]},
            price:{type:Number,required:true},
            quantity:{type:Number,default:1},
            image:{type:String,required:true},
            productid:{type:mongoose.Schema.ObjectId,ref:"Product",required:true}
        }
    ],
    userId:{type:mongoose.Schema.ObjectId,ref:"User",required:true},
    paymentInfo:{
        id:{type:String,required:true},
        status:{type:String,required:true},
    },
    purchasedAt:{type:Date,required:true},//! 
    itemsPrice:{type:Number,required:true},
    taxPrice:{type:Number,default:0},
    shippingPrice:{type:Number,default:0},
    totalPrice:{type:Number,required:true},
    orderStatus:{type:String,required:true,default:"Processing your order"},
    deliveredAt:{type:Date}
});

module.exports = mongoose.model("Order",orderSchema);

//! most of them are default null, check is required necessary