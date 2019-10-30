import navView from "../views/nav.art";
import isLoginModel from "../models/request";

const store = require("store");

class Index {
  constructor() {
    this.render();
    this.islogin = false;
  }

  async render() {
    const result = await isLoginModel.get({
      url: "/api/users/islogin",
    });

    if (result.msg) {
      this.islogin = true;
      const {
        username,
      } = result.message;
      const html = navView({
        username,
        islogin: this.islogin,
      });
      $("#left-nav").html(html);
    }
    if (!result.msg) {
      const html = navView();
      $("#left-nav").html(html);
    }
    this.bindEvent();
  }

  bindEvent() {
    $("#logout").on("click", this.logout.bind(this));
  }

  // eslint-disable-next-line class-methods-use-this
  async logout() {
    // let result = await isLoginModel.get({
    //     url:'/api/users/logout'
    // })
    // if(result.msg){
    //     location.reload()
    // }
    store.remove("token");
    location.reload();
  }
}
export default new Index();
