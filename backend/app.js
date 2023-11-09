const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const dotenv = require("dotenv");
dotenv.config({path: "backend/config/config.env"});


app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000',credentials:true}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileupload());
//* Routes used
//* used ecom insted of apk
const product = require("./routes/productRoute.js");
const user = require("./routes/userRouter.js");
const order = require("./routes/orderRoute.js");
const errorMiddleware = require('./middleware/error.js');
const payment = require("./routes/paymentRoute.js");

app.use("/ecom/v1",product);
app.use("/ecom/v1",user);
app.use("/ecom/v1",order);
app.use("/ecom/v1",payment);

//* middlewares
app.use(errorMiddleware);




module.exports = app;