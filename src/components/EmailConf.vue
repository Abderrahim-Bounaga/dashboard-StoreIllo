<template>
    <div class="App">
        <Header />
        <div class="vertical-center">
            <div class="inner-block">
                <div class="vue-tempalte">
                    <form v-on:submit="confirm">
                        <h3>Email Confirm</h3>

                        <p style="text-align:center;">You will receive your confirmation code in your email</p>

                        <div class="form-group">
                            <label>Code</label>
                            <input id="code" type="text" class="form-control form-control-lg" required/>
                        </div>

                        <input type="submit" class="btn btn-dark btn-lg btn-block" value="Confirm"/>
                    </form> 
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import router from "../router"        
import axios from "axios"
import Header from '../components/Header'

    export default {
        data() {
            return {}
        },
        components:{
            Header
        },
        methods: {
            confirm(e){
                e.preventDefault()    
                let code = document.getElementById("code").value  
                const correctCode = localStorage.getItem('code')

                if(correctCode == code){
                    axios.post("http://localhost:8085/user/add",{userData: this.getUserData()})    
                    .then((resp) => {
                        if(resp.data.res == "ok") {
                            this.setUser(resp.data.user, resp.headers["x-token"])
                            router.push("/home")
                        }else{
                            console.log("Error :>"+resp.data.message)
                        }   
                    })    
                    .catch((error) => {    
                        this.showError(error.message) 
                    })
                }else{
                    document.getElementById("code").value = ""
                    this.showError("Incorrect code, Please check your email.")
                }
            },
            showError(message){
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;

                document.querySelector(".div-notify").classList.add("error");
                document.querySelector(".div-notify").classList.remove("success");
                document.querySelector("#notify-title").style.color = "red"
                document.querySelector("#notify-title").innerHTML="There is a problem.";
                document.querySelector("#notify-content").innerHTML="<span>Error : </span>"+message;

                document.querySelector(".notify").classList.toggle("active");
                
                setTimeout(function(){
                    document.querySelector(".notify").classList.remove("active");
                },3000);
            },
            getUserData(){
                let user = {
                    fullName: localStorage.getItem('fullName'),
                    email :localStorage.getItem('email'),
                    password: localStorage.getItem('password'),
                }
                return user;
            },
            setUser(user,token){
                localStorage.clear();
                localStorage.setItem('id',user._id)
                localStorage.setItem('fullName',user.fullName)
                localStorage.setItem('email',user.email)
                localStorage.setItem('token',token)
            },
        }
        
    }
</script>