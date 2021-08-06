<template>
    <div class="App">
        <Header />
        <div class="vertical-center">
            <div class="inner-block">
                <div class="vue-tempalte">
                    <form v-on:submit="updateProfile">
                        <h3>Profile</h3>

                        <div class="form-group">
                            <label>Full Name</label>
                            <input v-model="user.fullName" id="fullName" type="text" class="form-control form-control-lg"/>
                        </div>

                        <div class="form-group">
                            <label>Email address</label>
                            <input v-model="user.email" id="email" type="email" class="form-control form-control-lg" disabled/>
                        </div>
                         
                        <div class="form-group">
                            <label>Old Password</label>
                            <input v-model="oldPass" id="oldePass" type="password" class="form-control form-control-lg" />
                        </div>

                        <div class="form-group">
                            <label>New Password</label>
                            <input v-model="newPass" id="newPass" type="password" class="form-control form-control-lg" />
                        </div>

                        <button type="submit" class="btn btn-dark btn-lg btn-block">Save changes</button>
                        <button @click="cancel" class="btn btn-block">Cancel</button>
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
            return {
                user : {},
                newPass:"",
                oldPass : ""

            }
        },
        components:{
            Header
        },
        methods: {
            getUser(){
                let user = {
                    id : localStorage.getItem('id'),
                    fullName: localStorage.getItem('fullName'),
                    email :localStorage.getItem('email'),
                    token: localStorage.getItem('token'),
                }
                this.user = user;
            },
            updateProfile(e){
                e.preventDefault() 
                let data;
                let header = { headers: {"x-token": this.user.token}}
                let changePass = false
           
                if(this.newPass != "" && this.oldPass != ""){
                    changePass = true
                }
                if(changePass){
                    data = {
                        "user":{
                            "fullName" : this.user.fullName,
                            "password" : this.newPass
                        },
                        "oldPass" : this.oldPass,
                        "changePass" : changePass
                    }
                }else{
                    data = {
                        user:{
                            fullName : this.user.fullName,
                        },
                        changePass : changePass,
                    }
                }
                
                axios.post("http://localhost:8085/user/update", data,header)    
                    .then((resp) => {
                        if(resp.data.res == "ok") {
                            console.log("RESPONSE > Name : "+resp.data.user.fullName)
                            this.setUser(resp.data.user)
                            console.log("name : "+localStorage.getItem("fullName"))
                            router.push("/home")
                        }else{
                            this.showError(resp.data.message)
                        } 
                    })    
                    .catch((error) => {    
                        this.showError(error.message)  
                    })
                
                
            },
            setUser(user){
                localStorage.removeItem('id')
                localStorage.removeItem('fullName')
                localStorage.removeItem('email')

                localStorage.setItem('id',user._id)
                localStorage.setItem('fullName',user.fullName)
                localStorage.setItem('email',user.email)
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
            },
            cancel(){
                router.push("/home")
            },
        },
        mounted() {
            this.getUser()
            if(!this.user.fullName){
                router.push("/")
            }
            
        }
    }
</script>
<style scoped>
.inner-block{
    margin-top:120px;
}
</style>