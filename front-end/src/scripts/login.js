const loginModel = require('./models/request');
class Login{
    constructor() {
        this.bindEvent()
    }
    bindEvent(){
        $('#login').on('click', this.login.bind(this))
    }
    async login(){
       let data = $('.userinfo').serialize();
       let result = await loginModel.get({
           url:'api/users/login',
           type:'POST',
           data,
       })
       if(result.msg){
           location.href = '../index.html'
           this.setCookie(result.message.name, 3);
       } else{
           alert(result.message.message);
       }
    }
    setCookie(name, day) {
        if(day !== 0){
            let expiress = day * 24 *60 * 60 * 1000;
            let date = new Date()
            document.cookie = `name=${name};expires=${date.setDate(date.getDate() + expiress)};`
        }
    }
}
 new Login()