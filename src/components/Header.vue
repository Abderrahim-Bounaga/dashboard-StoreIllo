<template>
  <div>
        <nav id="header" class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
            <router-link to="/home"><img height="35" src="../assets/logo-Storeino.png" title="Storeino" alt="storeino"></router-link>
            <ul v-if="this.user.fullName == null" class="nav navbar-nav flex-row float-right">
                <li class="nav-item">
                    <router-link class="nav-link pr-3" to="/">Sign in</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="btn btn-outline-primary" to="/signup">Sign up</router-link>
                </li>
            </ul>
            <ul v-else class="nav navbar-nav flex-row float-right">
                <li v-if="storeinoLoggedin" class="nav-item">
                    <button id="div-store" class="btn btn-primary" @click="openMenu2">
                        <img height="25" src="../assets/store.png" alt="person">
                        <span>Oberlo</span>
                    </button>
                </li>
                <li v-else class="nav-item">
                    <button id="div-store" class="btn btn-primary" @click="showLogin">
                        <img height="25" src="../assets/add-store.png"/>
                        <span>connect Store</span>
                    </button>
                </li>
                <li class="nav-item">
                    <button id="div-user" class="btn btn-primary" @click="openMenu1">
                        <img height="25" src="../assets/person.png" alt="person">
                        <span>{{user.fullName.slice(0,14)}}</span>
                    </button>
                </li>
            </ul>
            <!-- not visible  -->
            <div  id="dropdown-1" class="close">
                    <a class="dropdown-item" @click="goProfile"><img src="https://img.icons8.com/material/24/000000/edit-user-male.png"/> Profile</a>
                    <a class="dropdown-item" v-on:click="logOut"><img src="https://img.icons8.com/material/24/000000/exit.png"/> Sign out</a> 
            </div>
            <div  id="dropdown-2" class="close">
                <a class="dropdown-item" v-on:click="storeinoSignOut"><img src="https://img.icons8.com/material/24/000000/exit.png"/> Sign out</a>
            </div>
            <div class="div-1">
                <div class="div-2">
                    <form v-on:submit="storeinoLogin">
                        <h3>Storeino Sign In</h3>

                        <div class="form-group">
                            <label>Email address</label>
                            <input type="text" id="email-2" class="form-control form-control-lg" required/>
                        </div>

                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="password-2" class="form-control form-control-lg" required/>
                        </div>

                        <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
                        <button @click="cancel" class="btn btn-block">Cancel</button>
                    </form>
                </div>
            </div>
        </nav>
       
  </div>
</template>

<script>
import router from "../router"
import axios from "axios"

    export default {
        data() {
            return {
                user : {},
                storeinoLoggedin : true,
            }
        },
        methods:{
            getUser(){
                let user = {
                    id : localStorage.getItem('id'),
                    fullName: localStorage.getItem('fullName'),
                    email :localStorage.getItem('email'),
                    token: localStorage.getItem('token'),
                }
                this.user = user;
                document.getElementById("body").addEventListener("click", function() {
                    document.getElementById("dropdown-1").classList.add("close")
                    document.getElementById("dropdown-2").classList.add("close")
                    console.log("BODY Clicked !!!!!!")
                });
            },
            logOut(){
                localStorage.clear()
                document.getElementById("dropdown-1").classList.add("close")
                router.push("/")
            },
            goProfile(){
                document.getElementById("dropdown-1").classList.add("close")
                router.push("/profile")
            },
            openMenu1(e){
                document.getElementById("dropdown-2").classList.add("close")
                let drop = document.getElementById("dropdown-1")
                let account = document.getElementById("div-user")
                const rect = account.getBoundingClientRect();
                drop.classList.toggle("close")
                drop.style.left =rect.left+"px"
                drop.style.top =(rect.top+account.offsetHeight)+"px"
                drop.style.width = account.offsetWidth+"px"
                e.stopPropagation();
            },
            openMenu2(e){
                document.getElementById("dropdown-1").classList.add("close")
                let drop = document.getElementById("dropdown-2")
                let account = document.getElementById("div-store")
                const rect = account.getBoundingClientRect();
                drop.classList.toggle("close")
                drop.style.left =rect.left+"px"
                drop.style.top =(rect.top+account.offsetHeight)+"px"
                drop.style.width = account.offsetWidth+"px"
                e.stopPropagation();

                console.log("acc-Width : "+account.offsetWidth+" drop-Wid "+drop.style.width)
            },
            storeinoLogin(e){
                e.preventDefault()
                let email = document.getElementById("email-2").value   
                let password =  document.getElementById("password-2").value   
                let data = {   
                    'email': email, 
                    'password': password    
                }
                axios.post("https://api-managers.storeino.com/api/users/login",data)    
                    .then((resp) => {
                        
                        localStorage.setItem('storeinoToken',resp.data.token)
                        this.storeinoToken = resp.data.token;
                        this.storeinoLoggedin = true;
                        document.querySelector("div.div-1").classList.remove("activeLogin");
                    })
                /*axios.get("http://localhost:8085/useEmailr/tokenStoreino")    
                    .then((resp) => {
                        localStorage.setItem('storeinoToken',resp.data.storeinoToken)
                        this.storeinoToken = resp.data.storeinoToken;
                        this.storeinoLoggedin = true;
                        document.querySelector("div.div-1").classList.remove("activeLogin");
                    })*/    
                    .catch((error) => {    
                        this.showError(error.message)
                    })
            },
            showLogin(){
                    document.querySelector("div.div-1").classList.add("activeLogin");                
            },
            cancel(){
                    document.querySelector("div.div-1").classList.remove("activeLogin");                
            },
            storeinoSignOut(){
                document.getElementById("dropdown-2").classList.add("close")
                localStorage.removeItem("storeinoToken")
                this.storeinoLoggedin = false;
            }
        },
        mounted() {
            this.getUser()
            this.storeinoLoggedin = localStorage.getItem('storeinoToken') != null ? true:false ;
            
        }
    }
</script>
<style scoped>
#div-user{
    padding: 5px 10px;
    width: 180px;
    overflow: hidden;
}
#div-store{
    padding: 5px 10px;
    width: 180px;
    overflow: hidden;
    justify-content: space-around !important;
    margin-right: 10px;
}
#div-user, #div-store{
    display: flex;
    align-items: center;
    justify-content: space-between;

}
#div-user img, #div-user img{
    margin-right: 2px;
}
/* #div-user:hover{
    background-color: #007bff;
} */
a:hover{
    text-decoration: underline;
}
.close{
    height: 0px !important;
    width: 0px !important;
    overflow: hidden;
    display: none;
}
#dropdown-1,#dropdown-2{
    display: block;
    position: absolute;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.3)!important;
}
#header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.dropdown-item{
    cursor: pointer;

}
.dropdown-item>img{
    margin-right:7px ;
    height: 23px;
}
</style>