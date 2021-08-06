<template>
    <div class="App">
        <Header />
        <div class="vertical-center">
            <div class="inner-block">
                <div class="vue-tempalte">
                    <form v-on:submit="signUp">
                        <h3>Sign Up</h3>

                        <div class="form-group">
                            <label>Full Name</label>
                            <input id="fullName" type="text" class="form-control form-control-lg"/>
                        </div>

                        <div class="form-group">
                            <label>Email address</label>
                            <input id="email" type="email" class="form-control form-control-lg" />
                        </div>

                        <div class="form-group">
                            <label>Password</label>
                            <input id="password" type="password" class="form-control form-control-lg" />
                        </div>

                        <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>

                        <p class="forgot-password text-right">
                            Already registered 
                            <router-link :to="{name: 'login'}">sign in?</router-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from "axios"
import router from "../router" 
import Header from '../components/Header'

    export default {
        data() {
            return {}
        },
        components:{
            Header
        },
        methods: {
            signUp(e){
                e.preventDefault()    
                let fullName = document.getElementById("fullName").value   
                let email = document.getElementById("email").value   
                let password = document.getElementById("password").value   
                let data = { 
                    'fullName':fullName,
                    'email': email, 
                    'password': password    
                }    

                axios.post("http://localhost:8085/user/emailConfirm", {email}) 
                    .then((resp) => {
                        if(resp.data.res == "ok") {
                            let code = resp.data.code;                           
                            this.setUserData(code,data)
                            router.push("/emailConf")
                        }else{ 
                            this.showError(resp.data.message)
                        }
                           
                    })    
                    .catch((error) => { 
                        this.showError(error.message) 
                    }) 
            },
            setUserData(code,user){
                localStorage.setItem('code',code)
                localStorage.setItem('fullName',user.fullName)
                localStorage.setItem('email',user.email)
                localStorage.setItem('password',user.password)
            },
            showError(message){
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                console.log("Error :>"+message)
                document.querySelector(".div-notify").classList.add("error");
                document.querySelector(".div-notify").classList.remove("success");
                document.querySelector("#notify-title").style.color = "red"
                document.querySelector("#notify-title").innerHTML="There is a problem.";
                document.querySelector("#notify-content").innerHTML="<span>Error : </span>"+message;

                document.querySelector(".notify").classList.toggle("active");
                
                setTimeout(function(){
                    document.querySelector(".notify").classList.remove("active");
                },3000);
            }
        },
        mounted() {
            let name = localStorage.getItem('fullName')
            if(name){
                router.push("/home")
            }
        }
    }
</script>