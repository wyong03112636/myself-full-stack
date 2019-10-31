let express = require("express");
let router = express.Router();

const product = require("../controllers/product");
const upload = require('../middleware/upload')

// router.get("/findAll", product.isLogin, product.findAll);
// router.post("/remove", product.remove);

router.route('/')
  .get(product.findAll) //product.isLogin,
  .post(upload, product.saveData)
  .patch(upload, product.upData)
  .delete(product.remove)
router.get("/findOne", product.findOne);
router.post("/search", product.search);
module.exports = router;