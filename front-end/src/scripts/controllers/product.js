/* eslint-disable func-names */
import positionView from "../views/product.art";
import http from "../models/request";
import productAddView from "../views/product.add.art";
import productUpDataView from "../views/product.update.art";

const _ = require("lodash");

const count = 5;
// const currentPage = 1;

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

async function removeHandle(req, res, obj) {
  const id = $(obj).attr("data-id");
  const tempImg = $(obj).attr("data-img");
  const result = await http.upData({
    url: "/api/product",
    type: "DELETE",
    data: {
      id,
      tempImg,
    },
  });
  if (result.msg) {
    res.go(`/product_list/${req.params.page || 1}?r=${new Date().getTime()}`);
  }
}
async function searchHandle(res, keywords) {
  if (keywords === "") {
    res.go("/product");
    return;
  }

  const result = await http.upData({
    url: "/api/product/search",
    type: "POST",
    data: {
      keywords,
    },
  });
  if (result) {
    res.render(positionView({
      list: result.message.list,
      flag: false,
    }));
  }
  $("#go-back").on("click", () => {
    // eslint-disable-next-line no-restricted-globals
    history.back();
  });
}

function pageNumberHandel(obj, req, res, type, pageCount) {
  // eslint-disable-next-line no-bitwise
  const page = ~~req.params.page;
  if (type) {
    if (type === "prev" && page > 1) {
      res.go(`/product_list/${page - 1}`);
    } else if (type === "next" && page < pageCount.length) {
      res.go(`/product_list/${page + 1}`);
    }
  } else {
    // eslint-disable-next-line no-bitwise
    res.go(`/product_list/${~~$(obj).text()}`);
  }
}

export const list = async (req, res, next) => {
  // eslint-disable-next-line no-bitwise
  const currentPage = ~~req.params.page || 1;
  const result = await http.get({
    url: "/api/product",
    data: {
      start: (currentPage - 1) * count,
      count,
    },
  });
  if (result.message.list.length === 0 && currentPage > 1) {
    res.go(`/product_list/${currentPage - 1}`);
    return;
  }

  const pageCount = _.range(1, Math.ceil(result.message.total / count) + 1);
  if (result.msg) {
    const {
      list: lists,
    } = result.message;
    res.render(positionView({
      list: lists,
      flag: true,
      pageCount,
      currentPage,
    }));
    addHandle(res);
  } else {
    res.go("/home");
  }
  // eslint-disable-next-line func-names
  $(".panel-body").on("click", "#pro-update", function () {
    updateHandle(res, this);
  });
  $(".panel-body").on("click", "#pro-remove", function () {
    removeHandle(req, res, this);
  });
  $("body").on("keyup", "#search", (e) => {
    if (e.keyCode === 13) {
      searchHandle(res, e.target.value);
    }
  });
  $("#pagination a.page-number").on("click", function () {
    pageNumberHandel(this, req, res);
  });
  $("#pagination a.page-prev").on("click", function () {
    pageNumberHandel(this, req, res, "prev");
  });
  $("#pagination a.page-next").on("click", function () {
    pageNumberHandel(this, req, res, "next", pageCount);
  });
};
export const add = async (req, res, next) => {
  res.render(productAddView());
  const $form = $("#product-info");
  // $("#pro-add").on("click", async () => {
  //   const data = $form.serialize();
  //   const result = await http.upData({
  //     url: "/api/product",
  //     data,
  //   });
  //   if (result.msg) {
  //     $form[0].reset();
  //   } else {
  //     alert(result.message.message);
  //   }
  // });
  $form.ajaxForm(() => {
    $form[0].reset();
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

  // $("#product-update").on("click", async () => {
  //   const $form = $("#product-inf");
  //   const data = $form.serialize();
  //   // eslint-disable-next-line no-shadow
  //   const result = await http.upData({
  //     url: "/api/product",
  //     type: "PATCH",
  //     data: `${data}&id=${id}`,
  //   });
  //   if (result.msg) {
  //     res.go("/product");
  //   } else {
  //     // eslint-disable-next-line no-alert
  //     alert(result.message.message);
  //   }
  // });
  $("#product-inf").ajaxForm({
    resetForm: true,
    dataType: "json",
    url: "/api/product",
    method: "patch",
    success: (result) => {
      if (result.msg) {
        res.back();
      } else {
        alert(result.message.message);
      }
    },
  });
  $("#product-back").on("click", () => {
    res.back();
  });
};
