let food = [];
let totalAmount = 0;

$(document).ready(function () {
  if ($(document).width() <= 992) {
    $(".navbar-nav").removeClass("ml-auto");
    $(".navbar-nav").addClass("mr-auto");
  } else {
    $(".navbar-nav").removeClass("mr-auto");
    $(".navbar-nav").addClass("ml-auto");
  }

  var scrollToTopBtn = $("#scrollToTop");

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      scrollToTopBtn.addClass("show");
    } else {
      scrollToTopBtn.removeClass("show");
    }
  });

  scrollToTopBtn.on("click", function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      "500"
    );
  });

  $(".navbar a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });

  $(".homeBtn").click(function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      let hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });

  $(".product-box-layout4").click(function () {
    $(this)
      .toggleClass("productClicked")
      .parent()
      .siblings("div")
      .children()
      .removeClass("productClicked");
    if ($(this)[0].className.search("momos productClicked") > -1) {
      $("#momos").show().siblings("div").hide();

      $("html, body").animate(
        {
          scrollTop: $("#momos").offset().top,
        },
        800,
        function () {}
      );
    } else if ($(this)[0].className.search("chinese productClicked") > -1) {
      $("#chinese").show().siblings("div").hide();

      $("html, body").animate(
        {
          scrollTop: $("#chinese").offset().top,
        },
        800,
        function () {}
      );
    } else if ($(this)[0].className.search("beverages productClicked") > -1) {
      $("#beverages").show().siblings("div").hide();

      $("html, body").animate(
        {
          scrollTop: $("#beverages").offset().top,
        },
        800,
        function () {}
      );
    } else if ($(this)[0].className.search("southindian productClicked") > -1) {
      $("#southindian").show().siblings("div").hide();

      $("html, body").animate(
        {
          scrollTop: $("#southindian").offset().top,
        },
        800,
        function () {}
      );
    }
  });

  // Fetch and generate menu items
  fetch('momos.json')
    .then(response => response.json())
    .then(data => {
      const steamedMomosContainer = document.querySelector('#steamedMomos .card-body');
      const friedMomosContainer = document.querySelector('#friedMomos .card-body');

      data.menu.forEach(section => {
        let container = section.type === "Steamed Momos" ? steamedMomosContainer : friedMomosContainer;

        section.items.forEach(item => {
          let foodItem = document.createElement('div');
          foodItem.classList.add('row', 'foodItem');
          foodItem.innerHTML = `
            <div class="col-9 foodItemName">
              <p>
                ${item.name}
                <span>
                  <img
                    class="${item.veg ? 'vegIcon' : 'nonVegIcon'}"
                    src="./images/${item.veg ? 'veg.webp' : 'non-veg.webp'}"
                    alt="${item.veg ? 'veg-icon' : 'non-veg-icon'}"
                  />
                </span>
              </p>
              <p class="text-muted-small">
                <b>Ar</b> ${item.price}
              </p>
            </div>
            <div class="col-3 addCol">
              <span class="menuBtn minus"><i class="fas fa-minus"></i></span>
              <span class="quantity">0</span>
              <span class="menuBtn plus"><i class="fas fa-plus"></i></span>
            </div>
          `;
          container.appendChild(foodItem);

          let hr = document.createElement('hr');
          hr.classList.add('foodItemHr');
          container.appendChild(hr);
        });
      });

      // Attach event listeners using event delegation
      document.querySelector('#momos').addEventListener('click', function (event) {
        if (event.target.closest('.menuBtn')) {
          let button = event.target.closest('.menuBtn');
          let quantityElement = button.parentElement.querySelector('.quantity');
          let count = parseInt(quantityElement.textContent);

          let foodName = button.closest('.foodItem').querySelector('.foodItemName p').textContent.trim();
          let singleFoodAmount = parseFloat(button.closest('.foodItem').querySelector('.text-muted-small').textContent.replace(/[^\d.]/g, ''));
          let isVeg = button.closest('.foodItem').querySelector('.vegIcon') !== null;

          if (button.classList.contains('plus')) {
            count += 1;
            quantityElement.textContent = count;
            ToCart(foodName, count, isVeg, singleFoodAmount);
          } else if (button.classList.contains('minus')) {
            if (count > 0) {
              count -= 1;
              quantityElement.textContent = count;
              ToCart(foodName, count, isVeg, singleFoodAmount);
            }
          }
        }
      });
    });

  // Fetch and generate menu items
  fetch('chinese.json')
    .then(response => response.json())
    .then(data => {
      const riceAndNoodlesContainer = document.querySelector('#riceAndNoodles .card-body');
      const appetizersContainer = document.querySelector('#appetizers .card-body');
      const mainCourseContainer = document.querySelector('#mainCourses .card-body');

      data.menu.forEach(section => {
        let container;
        if (section.type === "Rice and Noodles") {
          container = riceAndNoodlesContainer;
        } else if (section.type === "Appetizers") {
          container = appetizersContainer;
        } else if (section.type === "Main Course") {
          container = mainCourseContainer;
        }

        section.items.forEach(item => {
          let foodItem = document.createElement('div');
          foodItem.classList.add('row', 'foodItem');
          foodItem.innerHTML = `
            <div class="col-9 foodItemName">
              <p>
                ${item.name}
                <span>
                  <img
                    class="${item.veg ? 'vegIcon' : 'nonVegIcon'}"
                    src="./images/${item.veg ? 'veg.webp' : 'non-veg.webp'}"
                    alt="${item.veg ? 'veg-icon' : 'non-veg-icon'}"
                  />
                </span>
              </p>
              <p class="text-muted-small">
                <b>Ar</b> ${item.price}
              </p>
            </div>
            <div class="col-3 addCol">
              <span class="menuBtn minus"><i class="fas fa-minus"></i></span>
              <span class="quantity">0</span>
              <span class="menuBtn plus"><i class="fas fa-plus"></i></span>
            </div>
          `;
          container.appendChild(foodItem);

          let hr = document.createElement('hr');
          hr.classList.add('foodItemHr');
          container.appendChild(hr);
        });
      });

      // Attach event listeners using event delegation
      document.querySelector('#chinese').addEventListener('click', function (event) {
        if (event.target.closest('.menuBtn')) {
          let button = event.target.closest('.menuBtn');
          let quantityElement = button.parentElement.querySelector('.quantity');
          let count = parseInt(quantityElement.textContent);

          let foodName = button.closest('.foodItem').querySelector('.foodItemName p').textContent.trim();
          let singleFoodAmount = parseFloat(button.closest('.foodItem').querySelector('.text-muted-small').textContent.replace(/[^\d.]/g, ''));
          let isVeg = button.closest('.foodItem').querySelector('.vegIcon') !== null;

          if (button.classList.contains('plus')) {
            count += 1;
            quantityElement.textContent = count;
            ToCart(foodName, count, isVeg, singleFoodAmount);
          } else if (button.classList.contains('minus')) {
            if (count > 0) {
              count -= 1;
              quantityElement.textContent = count;
              ToCart(foodName, count, isVeg, singleFoodAmount);
            }
          }
        }
      });
    });
  
    // Fetch and generate menu items
    fetch('beverages.json')
    .then(response => response.json())
    .then(data => {
      const soupsContainer = document.querySelector('#soups .card-body');
      const mocktailsContainer = document.querySelector('#mocktails .card-body');

      data.menu.forEach(section => {
        let container = section.type === "Soups" ? soupsContainer : mocktailsContainer;

        section.items.forEach(item => {
          let foodItem = document.createElement('div');
          foodItem.classList.add('row', 'foodItem');
          foodItem.innerHTML = `
            <div class="col-9 foodItemName">
              <p>
                ${item.name}
                <span>
                  <img
                    class="${item.veg ? 'vegIcon' : 'nonVegIcon'}"
                    src="./images/${item.veg ? 'veg.webp' : 'non-veg.webp'}"
                    alt="${item.veg ? 'veg-icon' : 'non-veg-icon'}"
                  />
                </span>
              </p>
              <p class="text-muted-small">
                <b>Ar</b> ${item.price}
              </p>
            </div>
            <div class="col-3 addCol">
              <span class="menuBtn minus"><i class="fas fa-minus"></i></span>
              <span class="quantity">0</span>
              <span class="menuBtn plus"><i class="fas fa-plus"></i></span>
            </div>
          `;
          container.appendChild(foodItem);

          let hr = document.createElement('hr');
          hr.classList.add('foodItemHr');
          container.appendChild(hr);
        });
      });

      // Attach event listeners using event delegation
      document.querySelector('#beverages').addEventListener('click', function (event) {
        if (event.target.closest('.menuBtn')) {
          let button = event.target.closest('.menuBtn');
          let quantityElement = button.parentElement.querySelector('.quantity');
          let count = parseInt(quantityElement.textContent);

          let foodName = button.closest('.foodItem').querySelector('.foodItemName p').textContent.trim();
          let singleFoodAmount = parseFloat(button.closest('.foodItem').querySelector('.text-muted-small').textContent.replace(/[^\d.]/g, ''));
          let isVeg = button.closest('.foodItem').querySelector('.vegIcon') !== null;

          if (button.classList.contains('plus')) {
            count += 1;
            quantityElement.textContent = count;
            ToCart(foodName, count, isVeg, singleFoodAmount);
          } else if (button.classList.contains('minus')) {
            if (count > 0) {
              count -= 1;
              quantityElement.textContent = count;
              ToCart(foodName, count, isVeg, singleFoodAmount);
            }
          }
        }
      });
    });



  function ToCart(foodNameClicked, foodQuantity, isVeg, singleFoodAmount) {
    let foodAlreadyThere = false;
    let foodPos;
    let node;
    if (isVeg) {
      node = '<img class="vegIcon" src="./images/veg.webp" alt="" />';
    } else {
      node = '<img class="nonVegIcon" src="./images/non-veg.webp" alt="" />';
    }
    for (var i = 0; i < food.length; i++) {
      if (food[i][0] === foodNameClicked) {
        foodAlreadyThere = true;
        foodPos = i;
        break;
      } else {
        foodAlreadyThere = false;
      }
    }

    if (foodAlreadyThere) {
      food.splice(foodPos, 1);
      food.push([foodNameClicked, foodQuantity, singleFoodAmount, node]);
    } else {
      food.push([foodNameClicked, foodQuantity, singleFoodAmount, node]);
    }

    // Remove Food items with quantity = 0
    for (var i = 0; i < food.length; i++) {
      if (food[i][1] === 0) {
        food.splice(i, 1);
      }
    }

    if (food.length !== 0) {
      $(".shoppingCart").addClass("shoppingCartWithItems");

      $(".cartContentDiv").empty();
      for (var i = 0; i < food.length; i++) {
        let cartTxt =
          '<div class="row cartContentRow"><div class="col-10"><div style="display:flex;"><p>' +
          food[i][0] +
          '</p> <p class="text-muted-small">' +
          food[i][3] +
          '<p></div><i class="fas fa-rupee-sign"> ' +
          food[i][2] +
          '</i></p>  </div>  <div class="col-2"> <p class="text-muted-small" > <i class="fas fa-rupee-sign"></i> ' +
          food[i][1] * food[i][2] +
          '</p>  <span class="cartQuantity"> ' +
          " <span> Qty : </span>" +
          food[i][1] +
          '</span> </div>  </div> <hr class="cartHr">';
        $(".cartContentDiv").append(cartTxt);
      }
    } else {
      $(".shoppingCart").removeClass("shoppingCartWithItems");

      $(".cartContentDiv").empty();
      $(".cartContentDiv").append(
        '<h1 class="text-muted">Your Cart is Empty</h1>'
      );
    }

    $(".shoppingCartAfter").text(food.length);
    if (food.length === 0) {
      totalAmount = 0;
    } else {
      totalAmount = totalAmount + singleFoodAmount;
    }
    $(".totalAmountDiv").empty();
    $(".totalAmountDiv").append(
      '<span class="totalAmountText">TOTAL AMOUNT : </span><br/>' +
        '<i class="fas fa-rupee-sign"></i> ' +
        totalAmount
    );
  }

  function openWhatsapp() {
    if ($("#address")[0].value === "") {
      alert("Please Enter Address");
      return;
    } else {
      let total = 0;
      let address = $("#address")[0].value;
      let note = $("#note")[0].value;
      let wTxt = "*name*               *quantity* \n";

      for (var i = 0; i < food.length; i++) {
        let name = food[i][0];
        let quantity = food[i][1];
        total = total + food[i][1] * food[i][2];
        wTxt = wTxt + name + "      " + quantity + "  \n";
      }

      if ($("#note")[0].value === "") {
        wTxt =
          wTxt + "\n *Total Bill: " + total + "*" + "\n\n Address: " + address;
      } else {
        wTxt =
          wTxt +
          "\n *Total Bill: " +
          total +
          "*" +
          "\n\n Address: " +
          address +
          "\n Note: " +
          note;
      }

      let wTxtEncoded = encodeURI(wTxt);
      window.open("https://wa.me/918888956230?text=" + wTxtEncoded);
    }
  }
});
