const store = require("store");

module.exports = {
  get({
    url,
    type = "GET",
    data = {},
  }) {
    const token = store.get("token");
    return $.ajax({
      url,
      type,
      data,
      headers: {
        "X-Access-Token": token,
      },
      success: (result, textStatus, jqXHR) => {
        const token = jqXHR.getResponseHeader("x-access-token");
        if (token) {
          store.set("token", token);
        }
        return result;
      },
    });
  },
  upData({
    url,
    type = "POST",
    data = {},
  }) {
    return $.ajax({
      url,
      type,
      data,
      success: (result) => result,
    });
  },
};
