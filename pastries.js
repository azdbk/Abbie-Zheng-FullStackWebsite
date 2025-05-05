let home, cakes, pastries, drinks;

function init(){
  $.ajaxSetup({async: false});
  let link = "https://73f6cccb-cb31-4965-8e36-ca0cc4477b02-00-mhu0hc9auw3n.spock.replit.dev";

  let route1 = "/home";
  let route2 = "/cakes";
  let route3 = "/drinks";
  let route4 = "/pastries";

  home = $.getJSON(link+route1).responseJSON;
  cakes = $.getJSON(link+route2).responseJSON;
  pastries = $.getJSON(link+route4).responseJSON;
  drinks = $.getJSON(link+route3).responseJSON;

  console.log(pastries);
  generateCards(pastries, "output");
  get("sort-cakes").innerHTML = fillDropDown("TypeName", pastries);
}

function get(id) {
  return document.getElementById(id);
}

function fillDropDown(key, data){
  let list = [];
  let build = ""
  for(let i = 0; i < data.length; i++){
    let data_field = data[i];
    if(!list.includes(data_field[key])){
      list.push(data_field[key]);
    }
  }
  list.sort();
  for(let field of list){
      build += `<option>${field}</option>`;
  }
  return build;
}

function frontCard(item){
  let build = "";
  build += `<div>`;
  build += `  <img src="${item.ImageURL}">`;
  build += `  <h1> ${item.ProductName} </h1>`;
  build += `  <h3> $${item.Cost} </h3>`;
  build += `</div>`;
  return build;
}

function backCard(item){
  let build = ``;
  build += `<div>`;
  build += ` <h3> ${item.TypeName} </h3>`;
  build += ` <h3> Description: ${item.Description} </h3>`;
  build += ` <h3> Quantity: ${item.Availability} </h3>`;
  build += ` <h3> *${item.Note} </h3>`;
  build += `</div>`;
  return build;
}

function generateCards(data, container) {
  get(container).innerHTML = "";
  let build = "";
  for (let i = 0; i < data.length; i++) {
    let item = data[i]
    let front = frontCard(item);
    let back = backCard(item);
    let flipcard = new FlipCard(front, back);
    flipcard.render(container);
  }
}

function filter(data, key, searchedValue){
  let list = [];
  console.log(data.length)
  for(let i = 0; i < data.length; i++){
    let item = data[i];
    if(item[key] == searchedValue){
      list.push(item);
    }
  }
  return list;
}

function radio(value, data, key, id) {
  get(id).innerHTML = "";
  let subdata = filter(data, key, value);
  generateCards(subdata, id);
}

function getCakes() {
  get("output").innerHTML = "";
  let searchedCakes = get("sort-cakes").value;
  subdata = filter(pastries, "TypeName", searchedCakes);
  generateCards(subdata, "output");
}

function sortCakesHighToLow() {
  let sortedList = [];
  pastries.sort((a, b) => parseFloat(b.Cost) - parseFloat(a.Cost));
  for (let i = 0; i < pastries.length; i++) {
    sortedList.push(pastries[i]);
  }
  return sortedList;
}

function sortCakesLowToHigh() {
  let sortedList = [];
  pastries.sort((a, b) => parseFloat(a.Cost) - parseFloat(b.Cost));
  for (let i = 0; i < pastries.length; i++) {
    sortedList.push(pastries[i]);
  }
  return sortedList;
}

function getPrice() {
  get("output").innerHTML = "";
  let subdata = [];
  let searchedPrice = get("sort-price").value;
  if(searchedPrice == "High to Low"){
    subdata = sortCakesHighToLow();
  } else if(searchedPrice == "Low to High"){
    subdata = sortCakesLowToHigh();
  }
  generateCards(subdata, "output");
}