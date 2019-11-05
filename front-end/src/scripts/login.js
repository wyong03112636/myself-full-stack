/* eslint-disable class-methods-use-this */
const loginModel = require("./models/request");

class Login {
  constructor() {
    this.bindEvent();
  }

  bindEvent() {
    $("#login").on("click", this.login.bind(this));
  }

  async login() {
    const data = $(".userinfo").serialize();
    const result = await loginModel.get({
      url: "api/users/login",
      type: "POST",
      data,
    });

    if (result.msg) {
      // eslint-disable-next-line no-restricted-globals
      location.href = "../index.html";
    }
    if (!result.msg) {
      // eslint-disable-next-line no-alert
      alert(result.message.message);
    }
  }
}
// eslint-disable-next-line no-new
new Login();
