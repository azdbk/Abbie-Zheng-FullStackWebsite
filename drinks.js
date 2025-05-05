function init() {
  $.ajaxSetup({ async: false });

  let link = "https://73f6cccb-cb31-4965-8e36-ca0cc4477b02-00-mhu0hc9auw3n.spock.replit.dev";
  let route3 = "/drinks";

  let drinks = $.getJSON(link + route3).responseJSON;

  console.log(drinks);


  let output0 = document.getElementById("output0");
  let output1 = document.getElementById("output1");
  let output2 = document.getElementById("output2");

  let build0 = "";
  let build1 = "";
  let build2 = "";

  // Split data into chunks for each modal
  for (let i = 0; i < drinks.length; i++) {
    let drink = drinks[i];
    let build = `<div id="collapsible-container">`;
    build += `<br>`;
    build += `  <h2>${drink.ProductName}</h2>`;
    build += `<hr>`;
    build += `<h4>Description</h4>`;
    build += `<p>${drink.Description}</p>`;
    build += `<br>`;
    build += `<p>NOTE: ${drink.Note}</p>`;
    build += `<p>Cost: $${drink.Cost}</p>`;
    build += `<p>Quantity: ${drink.Availability}</p>`;
    build += `<br>`;
    build += `</div>`;

    if (i < 3) {
      build0 += build;
    } else if (i >= 3 && i < 6) {
      build1 += build;
    } else {
      build2 += build;
    }
  }

  output0.innerHTML = build0;
  output1.innerHTML = build1;
  output2.innerHTML = build2;
}

function scrollModalToTop(modalId) {
  var modal = document.getElementById(modalId);
  modal.scrollTop = 0;
}

function scrollModalToTop() {
  var modal = document.getElementById('myModal0');
  modal.scrollTop = 0;
}

function scrollModalToTop1() {
  var modal1 = document.getElementById('myModal1');
  modal1.scrollTop = 0;
}

function scrollModalToTop2() {
  var modal2 = document.getElementById('myModal2');
  modal2.scrollTop = 0;
}
