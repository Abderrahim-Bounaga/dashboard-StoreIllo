<template>
    <div class="body">
        <Header />
        <div class="flex-section">

            <sidebar />
            <div class="section2">
    <div id="accordion" class="bottom-marge">

        <div class="cardss">
            <div @click="togeleOpen1" class="card-header" id="headerOne">
                <h5 class="">Basic informations</h5>
                <img src="https://img.icons8.com/material/24/000000/double-up--v1.png" >
            </div>
            <div id="collapseOne" class="collapse  show">
                <!-- <div class="inner-div"> -->
                    <div class=" card-body border-color base-info">
                        <h6>Title</h6>
                        <input type="text" id="title" class="" v-model="product.title" >
                        <h6 class="h6-marge-top">Description</h6>
                        <textarea name="description" id="description" v-model="product.description" ></textarea>
                        <div class="div-price row">
                            <div class="price col-lg-4 col-md-6 col-sm-6">
                                <h6>Sale price</h6>
                                <input class="price-input" id="sale-price" type="text" v-model="product.salePrice">
                            </div>
                            <div class="price col-lg-4 col-md-6 col-sm-6">
                                <h6>Compare price</h6>
                                <input class="price-input" id="compare-price" type="text" v-model="product.comparePrice">
                            </div>
                            <div class="price col-lg-4 col-md-6 col-sm-6">
                                <h6>Buying price</h6>
                                <input class="price-input" id="buying-price" type="text" v-model="product.buyingPrice">
                            </div>
                        </div>
                    </div>
                <!-- </div> -->
            </div>
        </div>
        <div class="cardss">
            <div @click="togeleOpen2" class="card-header" id="headerTow">
                <h5 class="text-xl font-semibold">Images</h5>
                <img  src="https://img.icons8.com/material/24/000000/double-down--v1.png">
            </div>

            <div id="collapseTow" class="collapse show close">
                <div class="card-body border-color">
                    <div class="images row">
                        <div class="div-imgs  col-sm-4 col-lg-2 col-md-3" >
                            <div class="card border-none ">
                                <div class="add-img">
                                    <img src="../assets/add-img.png" >
                                </div>
                            </div>
                        </div>
                        <div class="div-imgs col-sm-4 col-lg-2 col-md-3 " v-for="(image,index) in product.images" v-show="image != null" :id="image" v-bind:key="index">
                            <div class="border-color">
                                <div class="img-product ">
                                    <img :src="image" >
                                </div>
                                <img v-on:click="removeImg(index)" class="float-btn" src="../assets/red-drop.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="cardss">
            <div @click="togeleOpen3" class="card-header" id="headerThree">
                <h5 class="">Properties</h5>
                <img src="https://img.icons8.com/material/24/000000/double-down--v1.png" >
            </div>
            <div id="collapseThree" class="collapse show close">
                <div class="card-body border-color">
                    <button v-on:click="addProp(product.properties)" class="btn btn-block btn-add-prop">+ Add new property</button>
                    <div id="properties" class="properties row  "> 
                        <div class="div-prop col-lg-5 col-md-6 col-sm-12" v-for="(property,index) in product.properties"  v-bind:key="index" >
                            <div class="title-prop">
                                <input class="title-input" type="text" v-model="property.title">
                                <div class="prop-actions">
                                    <div>
                                        <img v-on:click="addPropValue(property)" src="../assets/blue-add.png"/>
                                    </div>
                                    <div>
                                        <img v-on:click="removeProp(index)" src="../assets/red-drop.png"/>
                                    </div>
                                </div>
                                <!-- <button v-on:click="removeProp(index)" class="btn remove-btn btn-prop radius"><img src="../assets/remove.png" alt="remove"></button> -->
                            </div>
                            <div id="content-prop" class="content-prop row">
                                <div class="value-prop col-lg-6 col-md-6 col-sm-4" v-for="(value,index) in property.list" v-bind:key="index" >
                                    <input class="input-value-prop" type="text" v-model="property.list[index]">
                                    <button v-on:click="removePropValue(property,index)" class=""><img src="../assets/drop.png" alt="remove">
                                   
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <div class="footer px-4 py-3 rounded">
            <button @click="save" class="btn-size btn btn-primary btn-save">Save</button>
            <button @click="ExportProduct(product)" class="btn-size btn btn-primary btn-save">Export</button>
            <button @click="deleteProduct" class="btn-size btn btn-danger btn-save">Delete</button>
            <button @click="cancel" class="btn-size btn btn-secondary btn-cancel">Cancel</button>
        </div>
        <div class="div-1">
            <div class="div-2">
                <form v-on:submit="storeinoLogin">
                    <h3>Storeino Sign In</h3>

                    <div class="form-group">
                        <label>Email address</label>
                        <input type="email" id="email-2" class="form-control form-control-lg" required/>
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="password-2" class="form-control form-control-lg" required/>
                    </div>

                    <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
                    <button @click="cancel_2" class="btn btn-block">Cancel</button>
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
import _ from 'lodash';
import Header from '../components/Header'
import sidebar from '../components/sidebar'
import jwt_decode from "jwt-decode";

    export default {
        data() {
            return{
                product:{},
                user : {},
                id_product:"",
                sale_price:"...",
                imgRemoved :[],
                videVProp : "...",
                newValuesProp : "",
                storeinoToken :"",
                storId:"",
                productToExport : ""
            }
        },
        components:{
            Header,
            sidebar
        },
        methods:{
            togeleOpen1(){
                document.querySelector('#collapseOne').classList.toggle("close")
                document.querySelector('#collapseTow').classList.add("close")
                document.querySelector('#collapseThree').classList.add("close")
                let src = document.querySelector("#headerOne > img").getAttribute("src");
                if(src.includes("double-up")){
                    document.querySelector("#headerOne > img").setAttribute("src","https://img.icons8.com/material/24/000000/double-down--v1.png") 
                }else{
                    document.querySelector("#headerOne > img").setAttribute("src","https://img.icons8.com/material/24/000000/double-up--v1.png") 
                }
            },
            togeleOpen2(){
                document.querySelector('#collapseTow').classList.toggle("close")
                document.querySelector('#collapseOne').classList.add("close")
                document.querySelector('#collapseThree').classList.add("close")
                let src = document.querySelector("#headerTow > img").getAttribute("src");
                if(src.includes("double-up")){
                    document.querySelector("#headerTow > img").setAttribute("src","https://img.icons8.com/material/24/000000/double-down--v1.png") 
                }else{
                    document.querySelector("#headerTow > img").setAttribute("src","https://img.icons8.com/material/24/000000/double-up--v1.png") 
                }
            },
            togeleOpen3(){
                document.querySelector('#collapseThree').classList.toggle("close")
                document.querySelector('#collapseOne').classList.add("close")
                document.querySelector('#collapseTow').classList.add("close")
                let src = document.querySelector("#headerThree > img").getAttribute("src");
                if(src.includes("double-up")){
                    document.querySelector("#headerThree > img").setAttribute("src","https://img.icons8.com/material/24/000000/double-down--v1.png") 
                }else{
                    document.querySelector("#headerThree > img").setAttribute("src","https://img.icons8.com/material/24/000000/double-up--v1.png") 
                }
            },
            getUser(){
                let user = {
                    id : localStorage.getItem('id'),
                    fullName: localStorage.getItem('fullName'),
                    email :localStorage.getItem('email'),
                    token: localStorage.getItem('token'),
                }
                this.id_product = localStorage.getItem('product-selected')
                this.user = user;
            },
            getProduct(){  
                let header = { headers: {"x-token": this.user.token}}
                axios.post("http://localhost:8085/product/getOne", {id:this.id_product},header)    
                    .then((resp) => {
                        if(resp.data.res == "ok") {
                            this.product = resp.data.product;
                        }else{
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
            deleteProduct(e){
                e.preventDefault() 
                if(confirm("Are you sure to delete this product !!")){
                    let header = { headers: {"x-token": this.user.token}}
                    axios.post("http://localhost:8085/product/delete", {"id":this.product._id},header)    
                        .then((resp) => {
                            if(resp.data.res == "ok") {
                                router.push("/home")
                            }else{
                                this.showError(resp.data.message)
                            } 
                        })    
                        .catch((error) => {
                            this.showError(error.message)  
                        })
                }
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
                /*axios.get("http://localhost:8085/user/tokenStoreino")    
                    .then((resp) => {
                        localStorage.setItem('storeinoToken',resp.data.storeinoToken)
                        this.storeinoToken = resp.data.storeinoToken;
                        document.querySelector("div.div-1").classList.remove("activeLogin");
                        this.showLogin()
                    })    */
                    .catch((error) => {    
                        this.showError(error.message)
                    })
            },
            dropStoreinoToken(){
                localStorage.removeItem('storeinoToken')
            },
            ExportProduct(product){
                this.productToExport = product;
                this.showLogin();
            },
            showLogin(){
                if(localStorage.getItem("storeinoToken") == "" || localStorage.getItem("storeinoToken") == null){
                    document.querySelector("div.div-1").classList.add("activeLogin");
                }else{
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
                comparePrice != "" ? price.comparePrice= comparePrice : "1" 
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
            removeImg(index){
                this.product.images.splice(index, 1);
            },
            viewImage(img){
                console.log(img)
            },
            removeProp(index){
                this.product.properties.splice(index, 1);
            },
            removePropValue(property,index){
                property.list.splice(index, 1);
            },
            addPropValue(property){
                property.list.push("");
            },
            addProp(props){
                props.push({"list":[],"title":""})
            },
            cancel(){
                router.push("/home")
            },
            cancel_2(e){
                e.preventDefault()
                document.querySelector("div.div-1").classList.remove("activeLogin");
            },
            save(){
                let prod = _.pick(this.product,["images","title","description","salePrice","buyingPrice","comparePrice","properties","idUser"])

                let header = { headers: {"x-token": this.user.token}}
                axios.post("http://localhost:8085/product/update", {"id":this.product._id,"product":prod},header)    
                    .then((resp) => {
                        if(resp.data.res == "ok") {
                            router.push("/home")
                        }else{
                            this.showError(resp.data.message)
                        } 
                    })    
                    .catch((error) => {
                        this.showError(error.message)  
                    })
            }
        },
        mounted() {
            this.getUser()
            this.getProduct()
            if(!this.user.fullName){
                router.push("/")
            }
            this.storeinoToken = localStorage.getItem('storeinoToken')
            console.log("SToken ::: "+this.storeinoToken)
        }
    }
</script>
<style scoped>
.inner-div{
    /* margin: 25px 10px; */
    background-color: #f8f8f8;
}
.body{
    margin-top: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-bottom: 30px;
}
.basic-info{
    width: 97%;
    height: auto;
}
h5{
    margin: 5px 0px;
    font-size: 1.25rem!important;
}
#title{
    width: 100%;
    height: auto;
    border: #0084ff6e 2px solid;
    border-radius: 7px;
    color: #03539e;

}
#description{
    width: 100%;
    height: 150px;
    border: #0084ff6e 2px solid;
    border-radius: 7px;
    color: #03539e;
}
.div-price{
    margin-top: 10px;
}
.price{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
}

.price-input{
    height: auto;
    text-align: center;
    margin-left: 0px;
    width: 90%;
    border: #0084ff6e 2px solid;
    border-radius: 7px;
    
}
@media(max-width: 575px) {
    .price-input{
        width: 100%;
    }
}
.div-imgs{
    margin : 7px 00px;
    padding: 2px 15px; 
}
.div-imgs:nth-child(1){
    height: 170px;
}
.img-product{
    height: 170px;
}
.img-product > img{
    height: 170px;
}
.btns{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.float-btn{
    width: 25px;
    height: 25px;
    right: 0px !important;
    top: 0px !important;
    position: absolute !important;
    border-radius: 100%;
}
.float-btn:hover {
  box-shadow: 0 5px 5px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

.remove-btn{
    background-color: #ff2f2f;
}
.view-btn{
    background-color: #00ffe26b;
}
.properties{
    margin: 30px 20px !important;
    width: 90%;
    display: flex;
    justify-content:space-evenly;
}
.div-container{
    margin: 0px 20px;
    width: 100%;
} 
.images{
    margin: 5px 20px !important;
}
.div-prop{
    width: 100%;
    border: #0084ff6e 2px solid;
    background-color: rgb(255, 255, 255);
    border-radius: 7px;
    margin-bottom: 10px;
}
.div-prop:hover{
    box-shadow: 0 5px 5px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.title-prop{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    background-color: #007bff27;
width: 108%;
    height: 45px;
    margin-left: -15px;
}
.title-input{
    border: 1px solid #0084ff6e;
    border-radius: 7px;
    color: #03539e;
    text-align: center;
}
.title-prop:hover {
    /* box-shadow: 0 5px 5px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23); */
    background-color: #007bff4d;
}
.content-prop{
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 300px;
    height: auto;
    overflow: auto;
}
.value-prop{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
}
.value-prop>input{
    width: 90px;
    height: 30px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.356);
    border-right: none;
    border-radius: 7px 0 0 7px;
    padding: 0 5px;

}
.value-prop>button{
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.356);
    border-left: none;
    border-radius: 0 7px 7px 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;    
    width: 30px;
    height: 30px;
    
}
.value-prop>button>img{
    width: 20px;
    height: 20px;
}
.value-prop>button>img:hover{
    width: 25px;
    height: 25px;
}
.btn-prop{
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.grren{
    background-color: #2cf779 !important;
}
.radius{
    border-radius: 4px;
}
.btn-prop:hover {
  box-shadow: 0 5px 5px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.btn-prop>img{
    width: 30px;
    height: 30px;
}
.row{
    margin-left: 0 !important;
    margin-right: 0 !important;
}
.btn-add-prop{
    border: 1px solid rgb(54, 0, 179);
    background-color: #007bff1f;
    width: 60% !important;
    color:#0065d1;
}
.btn-add-prop:hover {
    /* box-shadow: 0 5px 5px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23); */
    background-color: #007bff4d;
}
.div-add-prop{
    display: flex;
    align-items: center;
    justify-content: center;
}
.btn-save{
    /* width: auto; 
    padding: 3px 5px;*/
    margin: 2px 10px;
}
.btn-cancel{
    margin: 2px 10px;
}
.footer {
    position: fixed;
    bottom: 0;
    width: 80%;
    right: 30px;
    height: 60px;
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 4px solid #007bff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.3)!important;
}
.bottom-marge{
    margin-bottom: 40px;
    width: 70%;
}
.h6-marge-top{
    margin-top: 15px !important;
}
.close{
    height: 0px !important;
    overflow: hidden;
    border-bottom: 0px !important;
}
#accordion{
    width: 80%;
    margin: auto;
}
#accordion >.card{
    border: none !important;
    border-radius: 0 !important;
    background-color: #fff0 !important;
}
.border-none{
    border: none !important;
}
.card-body{
    background-color: #ffffff;
    /* width: 60vw; */
    margin: 15px 5px;
    /* border: red 1px solid; */
    border-radius: 5px;
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.1)!important;
}
#collapseThree > .card-body{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.card-header{
    background-color: #ffffff !important;
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.1)!important;
    border-radius: .5rem;
    border:none !important;
}
.base-info textarea,.base-info input{
    border-radius: 7px;
    /* border: 1px solid #bbbbbb; */
    color: #03539e;
    padding: 1px 5px;
}
.card-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.card-header >img{
    height: 20px;
    width: 20px;
}
.btn-size{
    height: 40px !important;
    width: 100px !important;
}
.collapse{
    background-color: #fff0 !important;
}
.add-img{
    height: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px #cccccc dashed;
    cursor: pointer;
}
.add-img > img{
    width: 48px !important;
    height: 48px !important;
}
.card-header > h5{
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 1.3rem !important;
    font-weight: 600!important;
    color:#626262;
}
.prop-actions{
    display: flex;
    justify-content: center;
    align-items: center;
}
.prop-actions >div{
    width: 36px;
}
.prop-actions >div> img{
    height: 30px;
    width: 30px;
}
.prop-actions >div> img:hover{
    height: 35px;
    width: 35px;
}
.flex-section{
    display: flex;
}
.section2{
    /* width: 80%; */
    /* margin-left: 20%; */
    margin-bottom: 5%;
}

</style>