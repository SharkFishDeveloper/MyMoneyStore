const express = require('express');
const app = express();
app.use(express.json());
//* Routes used
//* used ecom insted of apk
const product = require("./routes/productRoute.js");
const errorMiddleware = require('./middleware/error.js');


app.use("/ecom/v1",product);
//* middlewares
app.use(errorMiddleware);

module.exports = app;