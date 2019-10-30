import formView from "../views/form-page.art";
import http from "../models/request";

export const form = async function (req, res, next) {
  const result = await http.get({
    url: "/api/product",
  });
  if (result.msg) {
    res.render(formView());
  } else {
    res.go("/home");
  }
};
