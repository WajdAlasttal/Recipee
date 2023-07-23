$(window).on("load scroll", function () {
  if ($(window).scrollTop() >= 30) {
    $(".navbar").css({
      background: "#fff",
      "box-shadow": "0 .2rem .5rem rgba(0,0,0,.4)",
      color: "#000",
    });
  } else {
    $(".navbar").css({
      background: "black",
      "box-shadow": "none",
      color: "#fff",
    });
  }
});


var myRecipies = [];
var recipeDetails = [];
var links = document.querySelectorAll(".link");
var search = document.querySelector('.form_input');
var searchBtn = document.querySelector('.btn');

async function getRecipes(meal){
    var response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    var data = await response.json();
    myRecipies = data.recipes;
    displayData();
}
searchBtn.addEventListener('click',function(e){
    e.preventDefault();
    var searchInput = search.value.trim();
    getRecipes(searchInput);
})
for(var i=0;i<links.length;i++){
    links[i].addEventListener('click',function(event){
        console.log(event.target.text)
        getRecipes(event.target.text);
    })
}
async function getId(recipe){
  var recipeId = recipe.id;
  var response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
  var data = await response.json();
  recipeDetails = data.recipe;
  console.log(recipeDetails);
  displayDetails();
}

getRecipes('pizza');
function displayData() {
    var result = ``;
    for (var i = 0; i < myRecipies.length; i++) {
      result += `
      <div class="col-12-xs col-6-md col-3-lg col-3-xl">
              <div class="card p-1 m-2">
              <img src="${myRecipies[i].image_url}" class="card-image" alt="${myRecipies[i].title}">
              <p class="card-title">${myRecipies[i].title}</p>
              <button id="${myRecipies[i].recipe_id}" onclick="getId(this)">View Recipe</button>
              </div>
      </div>
      `;
    }
    document.getElementById('data').innerHTML = result;
  }
function displayDetails(){
  var result =``;
  result +=`
  <div class=" recipe-details p-1 m-2">
  <img src="${recipeDetails.image_url}" class="card-image" alt="${myRecipies[i].title}">
  <div class="recipe-content">
  <h2 class="card-title">Publisher:${recipeDetails.publisher}</h2>
  <h3>Ingredients:</h3>
  <p>${recipeDetails.ingredients}</p>
  </div>
  </div>
  `;
  document.getElementById('data').innerHTML = result;
}
