/* eslint-disable class-methods-use-this */
import registerModels from "./models/request";

class Register {
  constructor() {
    this.bindEvent();
  }

  bindEvent() {
    $("#register").on("click", this.request.bind(this));
    // $("#samepwd").on("blur", this.ifSame);
  }

  ifSame() {
    const pwd = $("#pwd").val();
    const pwd2 = $("#samepwd").val();
    if (pwd !== pwd2) {
      $("#tip").slideDown();
    } else {
      $("#tip").slideUp();
      return true;
    }
  }

  async request() {
    if (!this.ifSame()) {
      return;
    }
    const data = $("#registerinfo").serialize();
    const result = await registerModels.get({
      url: "/api/users/register",
      data,
      type: "POST",
    });
    if (!result.msg) {
      // alert(result.message.message);
      $("#tip span").text(result.message.message);
      $("#tip").slideDown();
    }
    if (result.msg) {
      $("#tip").slideUp();
      location.href = "../login.html";
    }
  }
}
new Register();
