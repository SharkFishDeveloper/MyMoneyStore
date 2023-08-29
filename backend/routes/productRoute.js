const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productController.js");
const { isAuthenticated,isAdmin } = require("../middleware/checkAuth.js");

const router = express.Router();

router.route("/products").get(getAllProducts);
//* replaced "new" with create in below route
router.route("/admin/product/create").post(isAuthenticated,isAdmin("admin"),createProduct);
router.route("/admin/product/:id").put(isAuthenticated,isAdmin("admin"),updateProduct).delete(isAuthenticated,isAdmin("admin"),deleteProduct);
router.route("/user/review").put(isAuthenticated,createProductReview);
router.route("/product/:id").get(getProductDetails);
router.route("/reviews").get(getProductReviews).delete(isAuthenticated,deleteReview);
module.exports = router;