const express = require("express");
const { isAuthenticated } = require("../middleware/checkAuth");
const { stripePaymentProcess, stripeApiKeyFunction } = require("../controllers/paymentController");
const router = express.Router();


router.route("/payment/process").post(isAuthenticated,stripePaymentProcess);

router.route("/stripeApiKey").get(isAuthenticated,stripeApiKeyFunction);
module.exports = router;