const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"]
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
    rating:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
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
    NumberofReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
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
    createdAt:{
        type:Date,
        default:Date.now
    },
    Summary:{
        type:String,
        required:true,
        default:"This is summary of this book"
    }
});

module.exports = mongoose.model("Product",productSchema);