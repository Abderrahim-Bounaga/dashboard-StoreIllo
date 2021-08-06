<template>
  <div class="vue-tempalte" id="body">
    <!-- Navigation -->
    <!-- <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <a class="navbar-brand float-left" href="https://www.positronx.io" target="_blank">
           positronX.io
        </a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/login">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/">Sign up</router-link>
          </li>
        </ul>
      </div>
    </nav> 
    <Header />-->

    <!-- Main -->
    <router-view />
    <div class="notify"><div class="div-notify"><h3 id="notify-title"></h3> <p id="notify-content">...</p></div></div>
  </div>
</template>
<script>
// import Header from './components/Header'
// import router from "../router"  

export default {
	name: 'App',
	data() {
		return{}
	},
	components:{	},
	methods:{

	},
	mounted() {	
		
	}
}

</script>
