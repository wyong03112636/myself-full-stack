import navView from '../views/nav.art'
import isLoginModel from '../models/request';

class Index {
    constructor() {
        this.render()
        this.islogin = false;
       
    }
    async render() {
        let result = await isLoginModel.get({
            url:'/api/users/islogin'
        }) 
        if(result.msg){
            this.islogin  = true;
            let username = result.message.username;
            let html = navView({username, islogin:this.islogin});
            $('#left-nav').html(html);
        }
        if(!result.msg){
            let html = navView();
            $('#left-nav').html(html);
        }
        this.bindEvent()
    }
    bindEvent() {
        $('#logout').on('click', this.logout.bind(this))
    }
    async logout() {
        let result = await isLoginModel.get({
            url:'/api/users/logout'
        })
        console.log(result)
        if(result.msg){
            location.reload()
        }
    }
}
export default new Index()