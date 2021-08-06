<template>
    <div class="body">
        <Header />
        <div class="flex-section">

            <sidebar />
            <div class="section2">

            <div class="div-all">
                <div class="all-select d-flex justify-content-between">
                    <h5>New Products</h5>
                    <a href="/home">Show More</a>
                </div>
                <table class="table table2" >
                    <thead>
                        <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
                        <th scope="col">Disc</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody v-for="(product, index) in products.slice(0, 4)" v-bind:key="product._id">
                        <tr>
                        <th ><img :src="product.images[0]" class="img-size"/></th>
                        <td>{{product.buyingPrice}}</td>
                        <td>{{product.title.slice(0,20)}}</td>
                        <button  class="btn-clr" v-on:click="viewMore" :id="product._id"><img src="../assets/pencil-square.svg" alt=""></button>
                        <td><img class="remove-pro" @click="deleteProduct(product,index)" src="../assets/drop.png" ></td>
                        </tr>
                        
                    </tbody>
                </table>
            
            </div>
            <div class="div-all-profil">
                <div class="all-select d-flex justify-content-between">
                    <h5>Profile</h5>
                    <a href="/home">Show More</a>
                </div>
                <div class="flex_pro">
                    <img class="img-pro" src="../assets/logo.png" alt="">
                    <div class="info-pro">
                    <h5>Abderrahim Bounaga</h5>
                    <h6>Email@gmail.com</h6>
                    </div>
                    <button  class="btn-clr-pro" ><img src="../assets/pencil-square.svg" alt=""></button>
                </div>

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
    width: 78%;
    margin: auto;
}

.div-all{
    background-color: white;
    width: 90%;
    margin:10px auto;
    padding-top: 30px;
    border: 1px solid rgb(228, 226, 226);
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.div-all-profil{
    background-color: white;
    width: 45%;
    margin-top:10px;
    margin-left:5%;
    padding-top: 30px;
    border: 1px solid rgb(228, 226, 226);
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.table2{
    width: 70%;
    margin:30px auto;

}
.clr{
    margin-left: 10px;
    cursor: pointer;
}
.btn-clr{
    border: none;
    background-color: rgba(255, 255, 255, 0);
    margin-top: 12px;
    margin-left: 10px;
}
.btn-clr-pro{
    border: none;
    background-color: rgba(255, 255, 255, 0);
    margin-left: 100px;
    margin-top: -20px;
}
.img-size{
    border-radius: 7px;
    height: 50px;
}
.img-pro{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 20px 0px;
    background-color: rgb(209, 209, 209);
}
.info-pro{
    border-radius: 50%;
    margin: 20px 0  20px 20px;
}
.flex_pro{
    display: flex;
    width: 80%;
    margin: auto;
}
.remove-pro{    
    cursor: pointer;
    height:  20px;
    width: 20px;
    margin-left: 20px;
}
.flex-section{
    display: flex;
}
.section2{
    width: 80%;
    margin-left: 20%;
    margin-bottom: 5%;
}

</style>