import SMERouter from "sme-router";
import {
  home,
} from "../controllers/home";
import {
  list,
  add,
  updata,
} from "../controllers/product";
import {
  form,
} from "../controllers/form";

const router = new SMERouter("page-wrapper");

router.route("/home", home);
router.route("/product", list);
router.route("/product_add", add);
router.route("/product_update", updata);
router.route("/form", form);
router.route("/product_list/:page", list);
router.route("*", (req, res, next) => {
  res.redirect("/home");
});

router.use((req) => {
  const url = req.url.slice(1).split("/")[0].split("?")[0].split("_")[0];
  $(`#main-menu li a[data-url=${url}]`).addClass("active-menu").parents("li").siblings()
    .children("a")
    .removeClass("active-menu");
});

export default router;
