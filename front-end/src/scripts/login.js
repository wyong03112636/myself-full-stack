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
           location.href = '../index.html';
       } 
       if(!result.msg){
        alert(result.message.message);
       }
    }
}
 new Login()