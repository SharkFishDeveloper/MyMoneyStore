const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
//* Routes used
//* used ecom insted of apk
const product = require("./routes/productRoute.js");
const user = require("./routes/userRouter.js");
const order = require("./routes/orderRoute.js");
const errorMiddleware = require('./middleware/error.js');

app.use("/ecom/v1",product);
app.use("/ecom/v1",user);
app.use("/ecom/v1",order);

//* middlewares
app.use(errorMiddleware);




module.exports = app;