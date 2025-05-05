//get( ) accepts the id of an element and returns the actual element using document.getElementById().
function get(id){
  return document.getElementById(id);
}

//fillDropDown( ) accepts a key in a JSON and returns build of unique options of the key value to be used with a <select>
function fillDropDown(key){
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

//Challenge 1: Create a function card() that accepts a restaurant and displays the following fields for each restaurant: dba, cuisine description, borough, zip code, phone number, violation description, inspection type and critical flag

function card(restaurant){
  let build = "";
  build += `<div class="fitted card">`;
  build += `     <h3>${restaurant.dba}</h3><hr>`;
  build += `     <p>${restaurant.cuisine_description}</p>`;
  build += `     <p>${restaurant.zipcode}, ${restaurant.boro}</p>`;
  build += `     <p>Inspection: ${restaurant.inspection_type}</p>`;
  build += `     <p>Flag: ${restaurant.critical_flag}</p>`;
  build += `     <p>Description: ${restaurant.violation_description}</p>`;
  build += `</div>`;
  return build;
}


//Challenge 2: Create a function cards() that accepts an array of JSON of restaurants, generate and return cards for each restaurant

function cards( restaurants ){
  let build = "";
  for(let i = 0; i < restaurants.length; i++){
    build += card(restaurants[i]);
  }
  return build;
}

//Challenge 3: Create a function filter() that accepts an array of JSON of restaurants, key to filter and a value to check.  filter() returns a new array with just those elements where the key matches the value.

function filter ( restaurants, key, value ){
  let list = [];
  for(let i = 0; i < restaurants.length; i++){
    let restaurant = restaurants[i];
    if(restaurant[key] == value){
      list.push( restaurant );
    }
  }
  return list;
}


function getCheckboxValue(id) {
  var item = document.getElementById(id);
  
  if (item.checked == true){
    console.log(item.value);
  }
}