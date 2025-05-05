let home, cakes, pastries, drinks;

function init(){
  $.ajaxSetup({async: false});
  let link = "https://73f6cccb-cb31-4965-8e36-ca0cc4477b02-00-mhu0hc9auw3n.spock.replit.dev";
  
  let route1 = "/home";
  let route2 = "/cakes";
  let route3 = "/drinks";
  let route4 = "/pastries";

  let home = $.getJSON(link+route1).responseJSON;
  let cakes = $.getJSON(link+route2).responseJSON;
  let pastries = $.getJSON(link+route4).responseJSON;
  let drinks = $.getJSON(link+route3).responseJSON;

  console.log(home);
  console.log(cakes);
  console.log(pastries);
  console.log(drinks);
  frontCard(cakes, "cakes");
}

function get(id) {
  return document.getElementById(id);
}

function frontCard(data, container) { 
  get(container).innerHTML = "";
  let build = "";
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    build += `<div>`;
    build += `  <img src="${item.ImageURL}">`;
    build += `  <p> ${item.ProductName} </p>`;
    build += `</div>`;
  }
  get(container).innerHTML = build;
}

// function generateCards(data, container) {
//   get(container).innerHTML = "";
//   let build = "";
//   for (let i = 0; i < data.length; i++) {
//     let item = data[i]
//     let front = frontCard(item);
//     let back = '';
//     let flipcard = new FlipCard(front, back);
//     flipcard.render(container);
//   }
// }