let express = require("express");

let router = express.Router();

const product = require("../controllers/product");

// router.get("/findAll", product.isLogin, product.findAll);
// router.post("/remove", product.remove);

router.route('/')
  .get(product.isLogin, product.findAll)
  .post(product.saveData)
  .patch(product.upData)
  .delete(product.remove)
router.get("/findOne", product.findOne);
module.exports = router;