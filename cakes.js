let cakes;

function init() {
  $.ajaxSetup({ async: false });
  let link = "https://73f6cccb-cb31-4965-8e36-ca0cc4477b02-00-mhu0hc9auw3n.spock.replit.dev";

  let route1 = "/home";
  let route2 = "/cakes";
  let route3 = "/drinks";
  let route4 = "/pastries";

  home = $.getJSON(link + route1).responseJSON;
  cakes = $.getJSON(link + route2).responseJSON;
  pastries = $.getJSON(link + route4).responseJSON;
  drinks = $.getJSON(link + route3).responseJSON;

  console.log("Cakes data loaded:", cakes);

  get("sort-cakes").innerHTML = fillDropDown("TypeName", cakes);
  generateCollapsibles(cakes, "shortcakes", "Shortcake");
  generateCollapsibles(cakes, "cheesecakes", "Cheesecake");
  generateCollapsibles(cakes, "bundtcakes", "Bundt Cake");
  generateCollapsibles(cakes, "spongecakes", "Sponge Cake");

  AOS.init();  // Initialize AOS
}

function get(id) {
  return document.getElementById(id);
}

function fillDropDown(key, data) {
  let list = [];
  let build = "";
  for (let i = 0; i < data.length; i++) {
    let data_field = data[i];
    if (!list.includes(data_field[key])) {
      list.push(data_field[key]);
    }
  }
  list.sort();
  for (let field of list) {
    build += `<option>${field}</option>`;
  }
  return build;
}

function applyFilters() {
  let availability = document.querySelector('input[name="Stock"]:checked')?.id;
  let sortCake = document.getElementById("sort-cakes").value;
  let priceSort = document.getElementById("sort-price").value;

  let filteredData = filter(cakes, 'Availability', availability === 'choice1' ? 1 : (availability === 'choice2' ? 0 : null));

  // Sort by cake type
  if (sortCake !== "All") {
    filteredData = filteredData.filter(item => item.TypeName === sortCake);
  }

  // Sort by price
  if (priceSort === "High to Low") {
    filteredData.sort((a, b) => b.Cost - a.Cost);
  } else {
    filteredData.sort((a, b) => a.Cost - b.Cost);
  }

  generateCollapsibles(filteredData, "shortcakes", "Shortcake");
  generateCollapsibles(filteredData, "cheesecakes", "Cheesecake");
  generateCollapsibles(filteredData, "bundtcakes", "Bundt Cake");
  generateCollapsibles(filteredData, "spongecakes", "Sponge Cake");

  AOS.refresh();  // Refresh AOS after applying filters
}

function text(item) {
  let build = "";
  build += `<h3> ${item.ProductName} </h3>`;
  return build;
}

function content(item, i) {
  let build = "";
  build += `<div class="cakes-item-small">`;
  build += `  <img src="${item.ImageURL}">`;
  build += `  <div id="intro-info">`;
  build += `<h1>${item.ProductName}</h1>`;
  build += `<hr>`;
  build += `<br>`;
  build += `<h2>Description</h2>`;
  build += `<p>${item.Description}</p>`;
  build += `<br>`;
  build += `<p>NOTE: ${item.Note}</p>`;
  build += `<br>`;
  build += `<p>Cost: $${item.Cost}</p>`;
  build += `<br>`;
  build += `<p>Quantity: ${item.Availability}</p>`;
  let output = "button" + i;
  build += `    <div id="${output}"> </div>`;
  build += `  </div>`;
  build += `</div>`;
  return build;
}

function generateCollapsibles(data, container, typeName) {
  let parent = document.getElementById(container).parentElement;
  get(container).innerHTML = "";
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].TypeName === typeName) {
      let item = data[i];
      let head = text(item);
      let cont = content(item, i);
      let collapsible = new Collapsible(head, cont);
      collapsible.render(container);
      count++;
    }
  }
  parent.style.display = count === 0 ? "none" : "block";
  AOS.refresh();  // Refresh AOS after generating collapsibles
}

function filter(data, key, searchedValue) {
  if (searchedValue == null) return data;
  let list = [];
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    if (key === 'Availability') {
      let availability = parseInt(item[key], 10);
      if (searchedValue === 1 && availability > 0) {
        list.push(item);
      } else if (searchedValue === 0 && availability === 0) {
        list.push(item);
      }
    } else {
      if (item[key] === searchedValue) {
        list.push(item);
      }
    }
  }
  console.log("Filtered list:", list);
  return list;
}

function applyCakeNameFilter() {
  let cakeName = document.getElementById("cake-name").value.trim().toLowerCase();

  // Filter cakes by cake name
  let filteredCakes = cakes.filter(cake => cake.ProductName.toLowerCase().includes(cakeName));

  // Clear previous results
  document.getElementById("shortcakes").innerHTML = "";
  document.getElementById("cheesecakes").innerHTML = "";
  document.getElementById("bundtcakes").innerHTML = "";
  document.getElementById("spongecakes").innerHTML = "";

  // Generate collapsibles for filtered cakes
  generateCollapsibles(filteredCakes, "shortcakes", "Shortcake");
  generateCollapsibles(filteredCakes, "cheesecakes", "Cheesecake");
  generateCollapsibles(filteredCakes, "bundtcakes", "Bundt Cake");
  generateCollapsibles(filteredCakes, "spongecakes", "Sponge Cake");

  AOS.refresh();  // Refresh AOS after filtering
}

// Event listener for applying filters on button click
document.addEventListener('DOMContentLoaded', function () {
  init(); // Initialize the page

  // Event listener for search button click
  document.getElementById("cakes-search-button").addEventListener('click', applyCakeNameFilter);

  // Event listener for radio button change
  document.querySelectorAll('input[name="Stock"]').forEach(item => {
    item.addEventListener('change', function () {
      applyFilters();
    });
  });

  // Event listener for sorting dropdowns
  document.getElementById("sort-cakes").addEventListener('change', function () {
    applyFilters();
  });

  document.getElementById("sort-price").addEventListener('change', function () {
    applyFilters();
  });
});
