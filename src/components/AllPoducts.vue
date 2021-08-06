<template>
    <div class="body">
        <Header />
        <div class="flex-section">

            <sidebar />
            <div class="section2">
        <div>
            
        <div class="all-select d-flex justify-content-between">
            <div class="d-flex justify-content-start">
                <input type="checkbox" class="check-input" id="exampleCheck1" v-model="selectAll" @click="select">
                <label class="check-label" for="exampleCheck1">Select All</label>
            </div>
            <!-- <div>
                <input type="text" class="search-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <span class="input-group-text" id="basic-addon2"></span> 
            </div> -->
            <div  data-toggle="tooltip" data-placement="bottom" title="Delete product">
                <img class="remove-pro2"  @click="deleteAllProduct(selected)"  src="../assets/red-drop-1.png" >
            </div>
        </div>

        <div class=" positions" 
        id="my-products"
        :products="products"
        :per-page="perPage"
        :current-page="currentPage"
        small 
            >
            <div class="div-products col-lg-3 col-md-4 col-sm-6 " v-for="(product, index) in products" v-bind:key="product._id">
                <div class="card" >
                    <div class="div-top">
                        <div class="mb-3 form-check  check-select">
                            <input type="checkbox" class="selected" id="exampleCheck1" :value="product._id" v-model="selected">
                        </div>
                        <div  data-toggle="tooltip" data-placement="bottom" title="Delete product">
                                <img class="remove-pro" @click="deleteProduct(product,index)" src="../assets/drop.png" >
                            </div> 
                    </div>
                    <div class="image">
                        <img :src="product.images[0]" class="img-size"/>
                    </div>
                    <div class="card-inner">
                        <div class="card-subtitle mb-2 text-muted">
                            <h5>{{product.buyingPrice}}</h5>
                              
                        </div>
                        <div class="content">
                            <p>{{product.title.slice(0,40)}}...</p>
                        </div>
                        <div class="btns">
                            <button v-on:click="viewMore" :id="product._id" class="btn btnns btn-primary"><img class="btn-pro" src="../assets/pencil-square.svg" alt=""> Details</button>
                            <button v-on:click="ExportProduct(product)" :id="product._id" class="btn btnns btn-primary"><img class="btn-pro" src="../assets/arrow-bar-up.svg" alt="">Export</button>
                            <!-- <img src="../assets/remove.png" > -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <b-pagination
                class="paginations"
                
                aria-controls="my-products"
                @change="onPageChanged"
                :total-rows="rows"
                :per-page="perPage"
                v-model="currentPage"
                pills
            ></b-pagination>
   

        <!-- <p>{{selected}}</p> -->
        
        </div>
        <div class="div-1">
            <div class="div-2">
                <form v-on:submit="storeinoLogin">
                    <h3>Storeino Sign In</h3>

                    <div class="form-group">
                        <label>Email address</label>
                        <input type="email" id="email" class="form-control form-control-lg" required/>
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="password" class="form-control form-control-lg" required/>
                    </div>

                    <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
                    <button @click="cancel" class="btn btn-block">Cancel</button>
                </form>
            </div>
        </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from "../router" 
import Header from '../components/Header'
import sidebar from '../components/sidebar'

import jwt_decode from "jwt-decode";

    export default {
        data() {
            return{
                products:[],
                user : {},
                storeinoToken :"",
                storId:"",
                productToExport : "",
                perPage: 12,
                currentPage: 1,
                selected: [],
		selectAll: false,
            }
        },
        computed: {
            rows() {
                return this.products.length
            },
        },
        components:{
            Header,
            sidebar
        },
        methods:{
             paginate(page_size, page_number) {
                let itemsToParse = this.products;
                this.products = itemsToParse.slice(
                page_number * page_size,
                (page_number + 1) * page_size
            );
            },
            onPageChanged(page) {
                this.paginate(this.perPage, page - 1);
            },
            getUser(){
                let user = {
                    id : localStorage.getItem('id'),
                    fullName: localStorage.getItem('fullName'),
                    email :localStorage.getItem('email'),
                    token: localStorage.getItem('token'),
                }
                this.user = user;
            },
            select() {
                this.selected = [];
                if (!this.selectAll) {
                    for (let pro in this.products) {
                        this.selected.push(this.products[pro]._id);
                    }
                }
            },
            
            getProducts(){  
                let header = { headers: {"x-token": this.user.token}}
                axios.post("http://localhost:8085/product/", {},header)    
                    .then((resp) => {
                        if(resp.data.res == "ok") {
                            this.products = resp.data.products;
                        }else{
                           document.getElementById("email").value =""
                            document.getElementById("password").value =""
                            this.showError(resp.data.message)
                        } 
                    })    
                    .catch((error) => {    
                        this.showError(error.message)  
                    })
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
            showOk(message){
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0; 

                document.querySelector(".div-notify").classList.add("success");
                document.querySelector(".div-notify").classList.remove("error");
                document.querySelector("#notify-title").style.color = "green"
                document.querySelector("#notify-title").innerHTML="Success.";
                document.querySelector("#notify-content").innerHTML="<span>"+message+"</span>";

                document.querySelector(".notify").classList.toggle("active");
                
                setTimeout(function(){
                    document.querySelector(".notify").classList.remove("active");
                },3000);
            },
            viewMore(e){
                let id_product = e.target.getAttribute("id");
                localStorage.removeItem('product-selected')
                localStorage.setItem('product-selected',id_product)
                router.push("/product")
            },
            storeinoLogin(e){
                e.preventDefault()
                axios.get("http://localhost:8085/user/tokenStoreino")
                    .then((resp) => {
                        localStorage.setItem('storeinoToken',resp.data.storeinoToken)
                        this.storeinoToken = resp.data.storeinoToken;
                        document.querySelector("div.div-1").classList.remove("activeLogin");
                        this.showLogin()
                    })    
                    .catch((error) => {   

                        this.showError(error.message)
                        console.log('password not found')
                    })
            },
            ExportProduct(product){
                this.productToExport = product;
                this.showLogin();
            },
            showLogin(){
                console.log("**S-Token : "+this.storeinoToken)
                console.log("....S-Token : "+ localStorage.getItem("storeinoToken") )
                // if(this.storeinoToken == "" || this.storeinoToken == null){
                if(localStorage.getItem("storeinoToken") == "" || localStorage.getItem("storeinoToken") == null){
                    document.querySelector("div.div-1").classList.add("activeLogin");
                }else{
                    this.storeinoToken = localStorage.getItem("storeinoToken")
                    this.SendToStoreino(this.productToExport)
                }
            },
            
            SendToStoreino(product){
                let buyingPrice = product.buyingPrice.trim().split(" ")[0]/*.replace(".","").replace(",",".")*/
                let comparePrice = product.comparePrice.trim().split(" ")[0]
                let salePrice = product.salePrice.trim().split(" ")[0]
                let tokenDecoded = jwt_decode(this.storeinoToken);
                this.storId = tokenDecoded.store._id
                let images =[]
                product.images.forEach(url => {
                    images.push({src:url,storeId: this.storId})
                });
                let options = []
                product.properties.forEach(function(prop){
                    let pValues = []
                    if(prop.title == "Color" || prop.title == "Size"){
                        prop.list.forEach(function(v){
                            pValues.push({"value1":v,"value2":v})
                        })
                        options.push({"key":prop.title.toLowerCase(),"name":prop.title,"values":pValues})
                    }else{
                        prop.list.forEach(function(v){
                            pValues.push({"value1":v})
                        })
                        options.push({"name":prop.title,"values":pValues})
                    } 
                })
                let price = {buyingPrice: buyingPrice, salePrice: salePrice}
                comparePrice != "" ? price.comparePrice= comparePrice : "WALO" 
                let header = { headers: {"x-auth-token": this.storeinoToken}}
                axios.post("https://api-stores.storeino.com/api/products/create", 
                    {
                        html: product.description,
                        description:product.description.slice(0,248),
                        images: images,
                        name: product.title,
                        options: options,
                        price: price,
                        seo: {keywords: [], description: product.description.slice(0,248), title: product.title},
                        status: "PUBLISH",
                    },header)    
                    .then((resp) => {
                        console.log(resp.data)
                        this.showOk("Product successfully added to Storeino")
                    })    
                    .catch((error) => {    
                        this.showError("ErrOOR login ="+error.message)  
                        console.log(" Error :: "+error.message)
                    })
            },
            cancel(e){
                 e.preventDefault()
                document.querySelector("div.div-1").classList.remove("activeLogin");
            },
            deleteProduct(product,index){
                //e.preventDefault() 
                // let index = e.target.getAttribute("id")
                // console.log("index === "+index)
                // let product = this.products[index]
                if(confirm("Are you sure to delete this product !!")){
                    let header = { headers: {"x-token": this.user.token}}
                    axios.post("http://localhost:8085/product/delete", {"id":product._id},header)    
                        .then((resp) => {
                            if(resp.data.res == "ok") {
                                this.products.splice(index, 1);
                                // location.reload();
                                console.log("ok deleted ...")
                            }else{
                                this.showError(resp.data.message)
                            } 
                        })    
                        .catch((error) => {
                            this.showError(error.message)  
                        })
                }
            },
            deleteAllProduct(selected,index){
                
                if(confirm("Are you sure to delete this product !!")){
                    let header = { headers: {"x-token": this.user.token}}
                    
                                // e.preventDefault();

                        axios.post("http://localhost:8085/product/deleteAll", {"id":selected},header)    
                            .then((resp) => {
                                if(resp.data.res == "ok") {
                                    this.selected.splice(index, 1);
                                    this.showOk("ok deleted ...")
                                    console.log("ok deleted ...")
                                    location.reload();
                                }else{
                                    this.showError(resp.data.message)
                                } 
                            })    
                            .catch((error) => {
                                this.showError(error.message)  
                            })
                }
            },
        },
        mounted() {
            this.getUser()
            this.getProducts()
            if(!this.user.fullName){
                router.push("/")
            }
            this.storeinoToken = localStorage.getItem('storeinoToken')
            console.log("SToken ::: "+this.storeinoToken)
            this.paginate(this.perPage, 0);
        }
    }
</script>
<style scoped>
.body{
    margin-top: 60px;
}
.all-select{
    width: 98%;
    margin: auto;
    background: white;
    padding: 10px;
    border-radius: 7px;
    box-shadow:5px 5px 5px rgb(184, 184, 184) ;
}
.div-products{
    margin : 7px 00px;
    padding: 2px 15px;
}
.img-size{
 height: 240px;
}
.content{
    height: 65px;
    overflow: hidden;
}
.btns{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.btnns{
    width: 90%;
    margin-bottom: 5px;
    background-color: #fdfefe;
    border: 1px solid rgb(213, 212, 212);
    color: rgb(83, 81, 81);
    font-weight: 600;
}
.div-top{
    display: flex;
    justify-content: space-between;
    height: 30px;
    background-color: white;
    border: 0.1px solid rgba(128, 128, 128, 0.245);
    border-radius: 2px;
}
.card-subtitle > img{
    height: 30px;
    width: 30px;
}
.card-subtitle{
    display: flex;
    justify-content: space-between;
    align-items: center;

}
.card{
    /* height: 350px; */
    box-shadow: 0px 0px 6px 0.5px rgb(0 0 0 / 10%),0px 0px 6px 0.5px rgb(0 0 0 / 10%);

}
.card:hover{
     box-shadow: 0px 6px 8px 2px rgb(0 0 0 / 13%),0px 6px 8px 2px rgb(0 0 0 / 13%); 
}
.div-drop{
    border-radius: 5px;
    border: 1px red solid;
    background-color: #f5000017;
    height: 35px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.div-drop:hover{
    background-color: #f5000045;
}
.div-drop > img{
    height: 20px;
    width: 20px;
}
.pos{
    display: flex;
    justify-content: center;
    padding: 10px;
}
.search-control{
    border: 1px solid rgb(170, 170, 170);
    border-radius: 7px;
    margin: auto;
    margin-left: -60px;
    width: 170%;
    height: 35px;
    padding:0 10px;
}
.remove-pro{    
    opacity: 0.5;
    cursor: pointer;
    height:  20px;
    width: 20px;
    margin-left: 5px;
}
.btn-pro{    
    opacity: 0.5;
    cursor: pointer;
    height:  20px;
    width: 20px;
    margin-right: 4px;
    margin-bottom: 2px;

}
.remove-pro2{
    cursor: pointer;
    height:  23px;
    width: 20px;
}
.check-select{
    position: absolute;
    height: 20px;
    right: -2px;
}
.check-input{
    width: 20px;
    height: 20px;
    margin-top: 5px;

}
.check-label{
    margin-left: 10px;
    margin-top: 2px;

}
.selected{
    margin-top:3px;
    width: 30px;
    height: 100%;
    opacity: 0.7;
}
.paginations{
    margin: auto;
    margin-left: 45%;
    margin-top: 20px;
}
.flex-section{
    display: flex;
}
.section2{
    margin-left: 20%;
    margin-bottom: 5%;
}


</style>