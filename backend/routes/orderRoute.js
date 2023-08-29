const express = require("express");
const router = express.Router();
const {createNewOrder, getSingleOrder, getAllOrders, getAllOrdersAdmin, updateOrderStatus, deleteOrder} = require("../controllers/orderController.js");
const { isAuthenticated,isAdmin } = require("../middleware/checkAuth.js");

router.route("/order/buy").post(isAuthenticated,createNewOrder);
router.route("/order/:id").get(isAuthenticated,getSingleOrder);
router.route("/orders/me").get(isAuthenticated,getAllOrders);
router.route("/admin/orders").get(isAuthenticated,isAdmin("admin"),getAllOrdersAdmin);
router.route("/admin/order/updateStatus/:id").put(isAuthenticated,isAdmin("admin"),updateOrderStatus).delete(isAuthenticated,isAdmin("admin"),deleteOrder);
module.exports = router;
