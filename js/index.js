$(document).ready(function (){
  $("#spinerr").fadeOut(1000 , function (){
    $("body").css('overflow' , 'auto')
  })




  let x=$(".nav-tap").outerWidth();
  function closWindo(){
      $(".slidnav").css("left" , -x)
  
  }
  closWindo()
  $(".clos").click(function () { 
      
      if( $(".slidnav").css("left")=='0px'){
          $(".slidnav").animate({left:-x} ,1000)
          $(".clos").removeClass("fa-x").addClass("fa-align-justify")
          
      }
      else{
          $(".slidnav").animate({left:"0px"} ,1000)
          $(".clos").removeClass("fa-align-justify").addClass("fa-x")
  
          
      }
  
  });
  // removeClass("d-none").addClass("d-flex").addClass("d-none")
  $("a").click(function (even){
      let href=$(even.target).attr('href')
     $( href).removeClass("d-none").addClass("d-flex").nextAll("section").addClass("d-none")
     
     if($(".slidnav").css("left" , x)){
      closWindo()
      $(".clos").removeClass("fa-x").addClass("fa-align-justify")
     }
  })
  
  
  $("#nameinput").keyup(function (e) {
    let ss= e.target.value
     let regex =/^[A-Za-z]+$/.test(ss)
     
  if(regex == false){
     $("#namealert").removeClass("d-none").addClass("d-flex")
   }
   else{
     $("#namealert").removeClass("d-flex").addClass("d-none")
   }
  })
  $("#emailinput").keyup(function (e) {
    let ss= e.target.value
     let regex =/(@gmail|yahoo)\.com$/.test(ss)
     
  if(regex == false){
     $("#emailalert").removeClass("d-none").addClass("d-flex")
   }
   else{
     $("#emailalert").removeClass("d-flex").addClass("d-none")
   }
  })
  $("#phoneinput").keyup(function (e) {
    let ss= e.target.value
     let regex =/^01[0125][0-9]{8}$/.test(ss)
     
  if(regex == false){
     $("#phonealert").removeClass("d-none").addClass("d-flex")
   }
   else{
     $("#phonealert").removeClass("d-flex").addClass("d-none")
   }
  })
  $("#ageinput").keyup(function (e) {
    let ss= e.target.value
     let regex =/^[1-7][0-9]|80$/.test(ss)
     
  if(regex == false){
     $("#agealert").removeClass("d-none").addClass("d-flex")
   }
   else{
     $("#agealert").removeClass("d-flex").addClass("d-none")
   }
  })
  
  $("#passinput").keyup(function (e) {
      let ss= e.target.value
      rePassword(ss)
     let regex =/([A-Za-z]{8,}|[0-9]{8,})/.test(ss)
     
  if(regex == false){
     $("#password").removeClass("d-none").addClass("d-flex")
   }
   else{
     $("#password").removeClass("d-flex").addClass("d-none")
   }
  })
function rePassword(pas){
  $("#repasinput").keyup(function (e) {
    let repa= e.target.value
  if( repa == pas ){
    
     $("#repasswordalert").removeClass("d-flex").addClass("d-none")
   }
   else{
      $("#repasswordalert").removeClass("d-none").addClass("d-flex")
   }
  })
}
  

  async function getApistart(category){
    
      let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`)
      let response = await api.json()
      displayStartapi(response.meals)
      getId()
      
      
      
  }
  getApistart("")
  function displayStartapi(api){
      cartona=``
      for(let i=0 ; i < api.length ; i++){
          cartona+=`
          <div data-id="${api[i].idMeal}" class="col-md-3 ">
          <div class="meal position-relative">
           <img src= ${api[i].strMealThumb} alt="">
           <div class="layer d-flex align-items-center text-black">
              <h2 class="fs-1">${api[i].strMeal}</h2>
           </div>
          </div>
  
       </div>
          `
      }
      
      document.getElementById("start").innerHTML=cartona
  }
  async function getApidetl(id){
      let api2 = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      let response2 = await api2.json()
      disPlaydetl(response2.meals)
      
      
  }
  
  function getId(){
      document.querySelectorAll("#start .col-md-3").forEach(item=>{
          $(item).click(function (){
              let id=item.dataset.id
              getApidetl(id)
              show()
  
          })
      })
  }
  function show(){
      $("#openstart").removeClass("d-flex").addClass("d-none")
      $("#details").removeClass("d-none").addClass("d-flex")
      // $("#openstart").fadeOut(200 , function (){
      //   $("#details").fadeIn(200)
      // })
      
  }
  function disPlaydetl(arr){
   
     let cartona=`
          <div class="col-md-4">
                <img src=${arr[0].strMealThumb} class="w-100" alt="">
                <h2 class="fs-1">${arr[0].strMeal}</h2>
              </div>
              <div class="col-md-8">
                  <h2>Instructions</h2>
                  <p class="fs-5">${arr[0].strInstructions}</p>
                  <h3>Area : ${arr[0].strArea} </h3>
                  <h3 class="py-3">Category : ${arr[0].strCategory}</h3>
                  <h3>Recipes :</h3>
                    
                  <div class="item">
                      <ul class="d-flex flex-wrap">
                      
                          <li class="alert alert-info m-2 p-1">${arr[0].strMeasure1}${arr[0].strIngredient1}</li>
                          <li class="alert alert-info m-2 p-1">${arr[0].strMeasure2}${arr[0].strIngredient2}</li>
                          <li class="alert alert-info m-2 p-1">${arr[0].strMeasure3}${arr[0].strIngredient3}</li>
                         
                      </ul>
                  </div>
                  <h3>Tags :</h3>
                  <div class="item">
                      <ul class="d-flex flex-wrap">
                          <li class="alert alert-danger m-2 p-1">${arr[0].strTags}</li>
                      </ul>
                  </div>
                  <a href=${arr[0].strSource} class="btn btn-success">Source</a>
                  <a href=${arr[0].strYoutube} class="btn btn-danger">Youtube</a>
              </div>
          `
      document.getElementById("detail").innerHTML=cartona
  }
  async function getCategori(){
    let apicat =await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let respons =await apicat.json()
    disPlaycategory(respons.categories)
    getIdd()
  }
  getCategori()
  function disPlaycategory(arr){
  cartona=``;
  for(let i=0 ; i< arr.length ; i++){
    cartona+=`
    <div data-category="${arr[i].strCategory}" class="col-md-3 ">
    <div  class="meal-category position-relative" >
     <img src=${arr[i].strCategoryThumb}  alt="">
     <div class="layer-category text-center text-black">
        <h2 class="pb-1">${arr[i].strCategory}</h2>
        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
     </div>
    </div>
  
  </div>
    
    
    `
  }
  document.getElementById("start-category").innerHTML=cartona;
  }
  
  function getIdd(){
    document.querySelectorAll("#start-category .col-md-3").forEach(item=>{
        $(item).click(function (){
          let category =item.dataset.category
          getApistart(category)
          showw()
          
            
        })
    })
  }
  
  function showw(){
    $("#category").removeClass("d-flex").addClass("d-none")
    $("#openstart").removeClass("d-none").addClass("d-flex")
  }
  async function getArea(){
   
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let respons = await api.json()
    
    disPlayarea(respons.meals)
    getarea()
   
  }
  getArea()
  function disPlayarea(arr){
    cartona=``
    for(let i=0 ; i<arr.length;i++ ){
    cartona+=` 
     <div data-category="${arr[i].strArea}"   class="col-md-3">
    <div class="text-center">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h2>${arr[i].strArea}</h2>
    </div>
    </div>`
    }
    document.getElementById("areaa").innerHTML=cartona
  }
  async function apiArea(area){
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let respons = await api.json()
    displayStartapi(respons.meals)
    disPlaydetl(respons.meals)
    getId()
    
  }
  function getarea(){
    document.querySelectorAll("#areaa .col-md-3").forEach(item=>{
        $(item).click(function (){
          let category =item.dataset.category
          apiArea(category)
          showarea()
   
        })
    })
  }
  
  function showarea(){
    $("#area").removeClass("d-flex").addClass("d-none")
    $("#openstart").removeClass("d-none").addClass("d-flex")
  }
  async function getIngredients(){
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let respons = await api.json()
    disPlayIngredients(respons.meals.slice(0,20))
    getIngredientsss()
  }
  getIngredients()
  function disPlayIngredients(arr){
    cartona=``
    for(let i=0 ; i<arr.length;i++ ){
      
    cartona+=` 
    <div data-category="${arr[i].strIngredient}" class="col-md-3">
              <div class="text-center">
                  <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                  <h2 class="pb-2">${arr[i].strIngredient}</h2>
                  <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
              </div>
              </div>
     `
    }
    document.getElementById("open-ingredients").innerHTML=cartona
  }
  async function apiIngredients(Ingredients){
    let api = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`)
    let respons = await api.json()
    displayStartapi(respons.meals)
    disPlaydetl(respons.meals)
    getId()
    
  }
  function getIngredientsss(){
    document.querySelectorAll("#open-ingredients .col-md-3").forEach(item=>{
        $(item).click(function (){
          let category =item.dataset.category
          apiIngredients(category)
          showareaIngredients()
          
            
        })
    })
  }
  
  function  showareaIngredients(){
    $("#ingredients").removeClass("d-flex").addClass("d-none")
    $("#openstart").removeClass("d-none").addClass("d-flex")
  }
  $("#searchh").keyup(function (e) {
   let val=e.target.value
   searchMeal(val)
  })
  async function searchMeal(val){
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`)
    let respons = await api.json()
    displaysearch(respons.meals)
    disPlaydetl(respons.meals)
    getName()
  }
  
  function displaysearch(api){
    cartona=``
    for(let i=0 ; i < api.length ; i++){
        cartona+=`
        <div data-id="${api[i].idMeal}" class="col-md-3 ">
        <div class="meal position-relative">
         <img src= ${api[i].strMealThumb} class="w-100" alt="">
         <div class="layer d-flex align-items-center text-black">
            <h2 class="fs-1">${api[i].strMeal}</h2>
         </div>
        </div>
  
     </div>
        `
    }
    
    document.getElementById("searchname").innerHTML=cartona
  }
  function getName(){
    document.querySelectorAll("#searchname .col-md-3").forEach(item=>{
        $(item).click(function (){
            let id=item.dataset.id
            getApidetl(id)
            showName()
  
        })
    })
  }
  function showName(){
    $("#search").removeClass("d-flex").addClass("d-none")
    $("#details").removeClass("d-none").addClass("d-flex")
  }
  $("#searchletter").keyup(function (e) {
    let val=e.target.value
    searchletter(val)
   })
  async function searchletter(val){
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${val}`)
    let respons = await api.json()
    displaysearch(respons.meals)
    disPlaydetl(respons.meals)
    getNamelatter()
  }
  function getNamelatter(){
    document.querySelectorAll("#searchname .col-md-3").forEach(item=>{
        $(item).click(function (){
            let id=item.dataset.id
            getApidetl(id)
            showNamelatter()
  
        })
    })
  }
  function showNamelatter(){
    $("#search").removeClass("d-flex").addClass("d-none")
    $("#details").removeClass("d-none").addClass("d-flex")
  }
  



  
})

