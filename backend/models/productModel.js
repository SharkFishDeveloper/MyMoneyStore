const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true,
    },
    description:{
        type:String,
        required:[true,"Please enter description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter product price"],
        maxLength:[6,"Price cannot increase more..."]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true,
            default:"s"
        },
        url:{
            type:String,
            required:true,
            default:"s"
        },
    }],
    category:{
        type:String,
        required:true
    },
    Stock:{
        type:Number,
        required:[5,"Stock cannot be in 6 figures"],
        default:10,
    },
    numberofReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    Summary:{
        type:String,
        required:true,
        default:"This is summary of this book"
    },
    real:{
        type:String,
        default:false
    }
});

module.exports = mongoose.model("Product",productSchema);