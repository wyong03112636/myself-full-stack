import positionView from "../views/product.art";
import http from "../models/request";
import productAddView from "../views/product.add.art";
import productUpDataView from "../views/product.update.art";

function addHandle(res) {
  $("#btn-add").on("click", () => {
    res.go("/product_add");
  });
}

function updateHandle(res, obj) {
  const id = $(obj).attr("data-id");
  res.go("/product_update", {
    id,
  });
}

async function removeHandle(res, obj) {
  const id = $(obj).attr("data-id");
  const result = await http.upData({
    url: "/api/product",
    type: "DELETE",
    data: {
      id,
    },
  });
  if (result.msg) {
    res.go(`/product?r=${Date.now()}`);
  }
}

export const list = async (req, res) => {
  const result = await http.get({
    url: "/api/product",
  });
  if (result.msg) {
    res.render(positionView({
      list: result.message.list,
    }));
    addHandle(res);
  } else {
    res.go("/home");
  }
  $(".panel-body").on("click", "#pro-update", function () {
    updateHandle(res, this);
  });
  $(".panel-body").on("click", "#pro-remove", function () {
    removeHandle(res, this);
  });
};
export const add = async (req, res, next) => {
  res.render(productAddView());
  const $form = $("#product-info");
  $("#pro-add").on("click", async () => {
    const data = $form.serialize();
    const result = await http.upData({
      url: "/api/product",
      data,
    });
    if (result.msg) {
      $form[0].reset();
    } else {
      alert(result.message.message);
    }
  });
  $("#pro-back").on("click", () => {
    res.go("/product");
  });
};
export const updata = async (req, res, next) => {
  const {
    id,
  } = req.body;
  const result = await http.get({
    url: "/api/product/findOne",
    type: "GET",
    data: {
      id,
    },
  });
  res.render(productUpDataView({
    list: result.message,
  }));

  $("#product-update").on("click", async () => {
    const $form = $("#product-inf");
    const data = $form.serialize();
    const result = await http.upData({
      url: "/api/product",
      type: "PATCH",
      data: `${data}&id=${id}`,
    });
    if (result.msg) {
      res.go("/product");
    } else {
      alert(result.message.message);
    }
  });
  $("#product-back").on("click", () => {
    res.go("/product");
  });
};
