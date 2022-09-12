// FUNCTION THAT GENERATES THE SHOP ITEMS ONLOAD
const generateShop = () => {
  let shopEl = document.querySelector("#shop-container"); //It takes the shop containter element

  let shopHTML = ""; //Creates the html string that will contain html code for the store

  products.forEach((product) => {
    //Iterates through the products object and creates the html string for each product containing the html code for that product and ADDS it to the shopHTML string
    let productHTML = `
    <div
    class="col-md-4 d-flex align-items-center justify-content-center product"
    data-product-id="${product.id}"
    data-category="any ${product.type}"
    data-color="any ${product.color}"
    data-sizes="any ${product.sizes}"
    data-price="${product.price}"
  >
    <div class="item-wrapper p-0 my-3">
      <img src="${product.image}" />
      <div
        class="price-and-actions-wrapper d-flex align-items-center jusitfy-content-center"
      >
        <div class="name-and-price text-start name">
          <span class="text-uppercase name">${product.name}</span><br />
          <i class="bi bi-dash-lg"></i>
          <span class="price">${product.price}$</span>
        </div>
        <div class="item-action-btn ms-2 d-none">
          <button class="bi bi-plus-lg"></button>
        </div>
        <div class="item-action-btn ms-2">
          <button class="bi bi-plus-lg"></button>
        </div>
      </div>
    </div>
  </div>
  `;

    shopHTML += productHTML;
  });

  shopEl.innerHTML = shopHTML; //Finally it replaces the html code of the shop container with the shopHTML string
};

// FUNCTION THAT FILTERS THE SHOP
const filterShop = () => {
  let category = document.querySelector("#category-selector").value; //Selected category
  let size = document.querySelector("#size-selector").value; //Selected size
  let color = document.querySelector("#color-selector").value; //Selected color

  let itemsEl = document.querySelectorAll(".product"); //All shop item elements

  itemsEl.forEach((itemEl) => {
    //Iterating through all of them
    let itemCategory = itemEl.getAttribute("data-category"); //Item categories
    let itemSizes = itemEl.getAttribute("data-sizes"); //Item sizes
    let itemColor = itemEl.getAttribute("data-color"); //Item color

    itemEl.classList.remove("d-none"); //Removing d-none class from each element

    if (
      !itemCategory.includes(category) ||
      !itemSizes.includes(size) ||
      !itemColor.includes(color)
    ) {
      //Checking if element doesn't have one of the selected filters
      itemEl.classList.add("d-none"); //Adding it the d-none class if true
    }
  });
};

//FUNCTION THAT REGISTERS A NEW USER
const register = () => {
  let email = document.querySelector("#register-email").value;
  let password = document.querySelector("#register-password").value;

  if (email && password) {
    //Checks if user entered email and password WILL ADD VALIDATION LATER
    let user = new User(); //Creates a new user object
    user.email = email; //Sets values
    user.password = password;
    user.registerUser(); //Calls registerUser method which registers the new user
  }
};
