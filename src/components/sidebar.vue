<template>

    <div class="sidebar shadow" >
        <!-- <h1 >side bar</h1> -->
        <nav class="side-nave" id="app">
            <ul class="nav-sid" id="app">
                <li class="nav-bar "><router-link  to="/Home" class=" pr-3 sid-btn btn btn-outline-primary" v-on:click="isActive = !isActive" v-bind:class="{ active: isActive }">home</router-link></li>
                <li class="nav-bar "><router-link to="/AllPoducts" class="pr-3 sid-btn btn btn-outline-primary" v-on:click="isActive = !isActive" v-bind:class="{ active: isActive }">Products</router-link></li>
                <li class="nav-bar "><router-link to="#" class="pr-3 sid-btn btn btn-outline-primary" v-on:click="isActive = !isActive" v-bind:class="{ active: isActive }">Profil</router-link></li>
                
            </ul>
        </nav>
    </div>

</template>

<script>
export default {

el: '#app',
data() {
    return(

        this.isActive=false
    )
 },
  methods: {
    myFilter: function() {
      this.isActive = !this.isActive;
      // some code to filter users
    }
  }


}
</script>
<style scoped>
body{
    text-decoration: none;
    list-style: none;
    
}
.sidebar{
    width: 15%;
    height: 100vh;
    left: 0;
    top: 0;
    position: fixed;
    margin-top: 53px;
    background-color: #ffffff;
    z-index: 9999;
}
.side-nave{
    margin-top: 30px;
   margin-left: -40px;
}
.nav-sid{
    list-style: none;
}
.nav-bar{
    width: 100%;
    margin-bottom: 10px;
    text-align: center;

}
.sid-btn:hover{
    background-color: rgba(128, 128, 128, 0.659);
    border-radius: 5px;
    color: white;
}
.sid-btn:focus{
    background-color: rgba(128, 128, 128, 0.659);
    border-radius: 5px;
    color: white;
}
.sid-btn:active{
    background-color: rgba(128, 128, 128, 0.659);
    border-radius: 5px;
    color: white;
}
.sid-btn{
    background: none;
    border: none;
    padding: 10px;
    width: 90%;
    text-align: left;
    color: gray;
}

</style>