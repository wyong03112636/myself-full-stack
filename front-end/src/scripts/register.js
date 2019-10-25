import registerModels from "./models/request";

class Register {
    constructor() {
        this.bindEvent()
    }
    bindEvent(){
        $('#register').on('click', this.request)
    }
    async request() {
        let data = $('#registerinfo').serialize();
        let result = await registerModels.get({
            url:'/api/users/register',
            data,
            type:'POST'
        })
        if(!result.msg){
            alert(result.message.message)
        }
        if(result.msg){
            location.href = '../login.html'
        }
    }
}
new Register()