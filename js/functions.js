// FUNCTION THAT GENERATES THE SHOP ITEMS ONLOAD
const generateShop = () => {
  let shopEl = document.querySelector("#shop-container"); //It takes the shop containter element

  let shopHTML = ""; //Creates the html string that will contain html code for the store

  products.forEach((product) => {
    //Iterates through the products object and creates the html string for each product containing the html code for that product and ADDS it to the shopHTML string

    let dNoneCLass = "d-none"; //Setting the d-none hmtl to inital value

    if (localStorage.getItem(`${product.id}`)) dNoneCLass = ""; //If this product is in cart then it needs to be displayed so we set the d-none html to ''

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
        <div class="item-action-btn ms-2 remove-btn ${dNoneCLass}" onclick="removeFromCart(this)">
          <button class="bi bi-dash-lg"></button>
        </div>
        <div class="item-action-btn ms-2 add-btn" onclick="addToCart(this)">
          <button class="bi bi-plus-lg"></button>
        </div>
      </div>
    </div>
  </div>
  `;

    shopHTML += productHTML;
  });

  shopEl.innerHTML = shopHTML; //Then it replaces the html code of the shop container with the shopHTML string

  let cartCount = localStorage.getItem("cart_count"); //We select the cartCount from localStorage

  if (cartCount) {
    //If there are items in cart we remove the d-none class from the count wrapper and set the count span inner text to cartCount value
    document.querySelector(".count-wrapper").classList.remove("d-none");
    document.querySelector("#cart-count").innerText = cartCount;
  } else {
    if (!document.querySelector(".count-wrapper").classList.contains("d-none"))
      document.querySelector(".count-wrapper").classList.add("d-none");
  }
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
const register = async () => {
  let email = document.querySelector("#register-email").value;
  let password = document.querySelector("#register-password").value;

  if (email && password) {
    //Checks if user entered email and password
    let user = new User(); //Creates a new user object
    user.email = email; //Sets values
    user.password = password;

    openDialog("", "", true);
    let userValid = await user.registerUser(); //Calls registerUser method which registers the new user
    closeDialog(true);

    setTimeout(() => {
      if (userValid) {
        openDialog(
          "Register succesfull!",
          `You have registered succesfully as ${user.email}.`
        );
        closeRegister();
      } else {
        openDialog("Email already taken!", `Try again with different email.`);
      }
    }, 400);
  } else {
    //If not we display the error
    openDialog(
      "Empty form!",
      "The form is empty, please enter the data and try again."
    );
  }
};

//FUNCTION THAT LOGS THE USER IN
const login = async () => {
  let email = document.querySelector("#login-email").value;
  let password = document.querySelector("#login-password").value;

  if (email && password) {
    //Checks if user entered email and password
    let user = new User(); //Creates new user object
    user.email = email; //Sets values
    user.password = password;

    openDialog("", "", true); //Opens the loader dialog
    let userValid = await user.loginUser(); //Calls loginUser method which logs in the new user if valid and returns a boolean value
    closeDialog(true); //Closes it

    setTimeout(() => {
      //We need to set a timeout so the animation ends
      if (userValid) {
        //If the user exists
        closeLogin(); //We close the login form
        openDialog(
          "Login succesfull!",
          `You are now logged in as ${user.email}.`
        ); //And open the dialog to inform the user that he is logged in
      } else {
        openDialog("Invalid data!", "Check your data and then try again."); //If not we open the dialog to inform the user that his data is incorrect
      }
    }, 400);
  } else {
    //If not then we display the error message
    openDialog(
      "Empty form!",
      "The form is empty, please enter the data and try again."
    );
  }
};

//FUNCTION THAT ADDS SELECTED ITEM TO CART
const addToCart = (btn) => {
  let productWrapper = btn.closest(".product"); //Selecting all the needed elements and values
  let productId = productWrapper.getAttribute("data-product-id");
  let cartCount = localStorage.getItem("cart_count");
  let itemQuantity = localStorage.getItem(`${productId}`);

  if (itemQuantity === null) {
    //Checking if itemQuantity is null so it means it still isn't added to the cart
    itemQuantity = 1; //Setting it to 1

    let removeBtn = productWrapper.querySelector(".remove-btn");
    removeBtn.classList.remove("d-none"); //Displaying the remove button now that itemQuantity is greater than 0
  } else {
    //If not then we just increase the itemQuantity
    itemQuantity = parseInt(itemQuantity);
    itemQuantity++;
  }

  if (cartCount === null) {
    //Checking if the cartCount is null so it means that there is still no items in the cart
    cartCount = 1; //Setting it to 1
    document.querySelector(".count-wrapper").classList.remove("d-none"); //Displaying the count wrapper
  } else {
    //If not then we just increase the cartCount
    cartCount = parseInt(cartCount);
    cartCount++;
  }
  document.querySelector("#cart-count").innerText = cartCount; //Setting the cartCount element to its value

  localStorage.setItem(`${productId}`, itemQuantity); //Saving data in localStorage so it's not lost when user refreshes the page
  localStorage.setItem("cart_count", cartCount);
};

//FUNCTION THAT REMOVES SELECTED ITEM FROM CART
const removeFromCart = (btn) => {
  let productWrapper = btn.closest(".product"); //Selecting all the needed elements and values
  let productId = productWrapper.getAttribute("data-product-id");
  let cartCount = localStorage.getItem("cart_count");
  let itemQuantity = localStorage.getItem(`${productId}`);

  cartCount--; //Decreasing the cartCount and selected item quantity
  itemQuantity--;

  if (itemQuantity == 0) {
    //If itemQuantity is 0 we hide the minus button because this item is not in the cart anymore so we can only add it, and we remove it from the localStorage
    btn.classList.add("d-none");
    localStorage.removeItem(`${productId}`);
  } else {
    //If not we store the new value in the localStorage
    localStorage.setItem(`${productId}`, itemQuantity);
  }

  if (cartCount == 0) {
    //We check if cartCount is 0 which means there are no more items of any kind in the cart
    document.querySelector("#cart-count").innerText = 0; //Setting the cart count span inner text to 0
    document.querySelector(".count-wrapper").classList.add("d-none"); //Hiding the count wrapper element
    localStorage.clear(); //Clearing the localStorage since there are no more items to store
  } else {
    //If not we set the inner text of the cart count span to cartCount and store the value in the localStorage
    document.querySelector("#cart-count").innerText = cartCount;
    localStorage.setItem("cart_count", cartCount);
  }
};

//FUNCTION WHICH GENERATES THE CART
const generateCart = () => {
  let cartCount = localStorage.getItem("cart_count"); //Takes the amount of items in cart

  if (cartCount != null) {
    //If not empty then the cart is generated
    let productIds = []; //Creates the array in which product ids will be stored
    products.forEach((product) => productIds.push(product.id));

    let cartHTML = ""; //Creates the cartHTMl string which will contain the html code for the cart
    let totalPrice = 0; //Creates the total price variable which will hold the value for total price of the items in cart

    for (let key in localStorage) {
      //Iterates through the localStorage object
      if (productIds.includes(parseInt(key))) {
        //If localStorage contains the id of a product that means that product is in cart
        let product = products.filter((product) => product.id == key); //So we take that product
        product = {
          //And make it an object because it Array.filter() function made it an array
          ...product[0],
        };

        let itemHTML = `
        <li class="cart-item">
          <div class="col-xl-2 col-sm-3 col-3">
            <div class="item-image" style="background-image: url(${
              product.image
            })" >
              <span id="number">${localStorage.getItem(`${key}`)}</span>
            </div>
          </div>
          <div class="col-xl-2 col-sm-3 col-3">
            <span class="item-name">${product.name}</span>
          </div>
          <div class="col-xl-2 col-sm-3 col-3 d-flex align-items-center justify-content-end">
            <span class="item-price">${product.price.toFixed(2)}$</span>
          </div>
        </li>
        `; //We create the HTML string for that item

        cartHTML += itemHTML; //And than add it to cartHTML string
        totalPrice +=
          parseInt(product.price) * parseInt(localStorage.getItem(`${key}`)); //Finally we add the price of that item multiplied by the quantity of it in cart to the total price
      }

      document.querySelector("#cart-list").innerHTML = cartHTML; //Then we add the html code to cart list element
      document.querySelector("#total").innerText = `Total: ${totalPrice.toFixed(
        2
      )}$`; //And change the total price also
    }

    openCart(); //Finally we call the openCart helper function which displays the cart window
  } else {
    //If empty the error is displayed
    if (window.innerWidth < 576) {
      toggleMenu();
    }
    openDialog(
      "Empty cart!",
      "Your cart is empty, add some items to it and try again!"
    );
  }
};

//FUNCTION WHICH SENDS THE USER ORDER TO THE SERVER
const placeOrder = async () => {
  let session = new Session();
  session.getSession();

  if (session.userId) {
    let productIds = products.map((product) => product.id);
    let cart = [];
    let totalPrice = 0;

    for (let key in localStorage) {
      if (productIds.includes(parseInt(key))) {
        cart.push({
          id: key,
          quantity: localStorage[key],
        });

        let product = products.find((product) => {
          if (product.id == key) return product.price;
        });

        totalPrice += parseInt(product.price) * parseInt(localStorage[key]);
      }
    }

    let order = new Order();
    order.userId = session.userId;
    order.products = cart;
    order.totalPrice = totalPrice;
    openDialog("", "", true);
    if (await order.sendOrder()) {
      closeDialog(true);
      setTimeout(() => {
        localStorage.clear();
        openDialog(
          "Order sent!",
          "Your order is sent and it will be delivered to you in the coming days."
        );
        closeCart();
        generateShop();
      }, 400);
    } else {
      closeDialog(true);
      setTimeout(() => {
        openDialog("Something went wrong!", "Please try again later.");
      });
    }
  } else
    openDialog("Session expired!", "Please login or register and try again.");
};

//HELPER FUNCTION WHICH CLOSES THE LOGIN FORM WINDOW AND CLEARS IT
const closeLoginFormAndClearIt = () => {
  document.querySelector(".login-form-wrapper").classList.add("d-none");
  document.querySelector(".overlay").classList.add("d-none");
  document.querySelector("#login-email").value = null;
  document.querySelector("#login-password").value = null;
};
const closeLogin = closeLoginFormAndClearIt;

//HELPER FUNCTION WHICH OPENS THE LOGIN FORM
const openLogin = () => {
  if (window.innerWidth < 576) {
    toggleMenu();
  }
  document.querySelector(".login-form-wrapper").classList.remove("d-none");
  document.querySelector(".overlay").classList.remove("d-none");
};

//HELPER FUNCTION WHICH CLOSES THE REGISTER FORM WINDOW AND CLEARS IT
const closeRegisterFormAndClearIt = () => {
  document.querySelector(".register-form-wrapper").classList.add("d-none");
  document.querySelector(".overlay").classList.add("d-none");
  document.querySelector("#register-email").value = null;
  document.querySelector("#repeat-register-password").value = null;
};
const closeRegister = closeRegisterFormAndClearIt;

//HELPER FUNCTION WHICH OPENS THE REGISTER FORM
const openRegister = () => {
  if (window.innerWidth < 576) {
    toggleMenu();
  }
  document.querySelector(".register-form-wrapper").classList.remove("d-none");
  document.querySelector(".overlay").classList.remove("d-none");
};

//HELPER FUNCTION WHICH OPENS THE CART
const openCart = () => {
  if (window.innerWidth < 576) {
    toggleMenu();
  }
  document.querySelector(".cart-container").classList.remove("d-none");
  document.querySelector(".overlay").classList.remove("d-none");
};

//HELPER FUNCTION WHICH CLOSES THE CART
const closeCart = () => {
  document.querySelector(".cart-container").classList.add("d-none");
  document.querySelector(".overlay").classList.add("d-none");
};

//HELPER FUNCTION WHICH TOGGLES THE RESPONSIVE MENU
const toggleMenu = () => {
  let topBar = document.querySelector(".top-bar");
  let middleBar = document.querySelector(".middle-bar");
  let bottomBar = document.querySelector(".bottom-bar");
  let menu = document.querySelector("#navbar");

  topBar.classList.toggle("rotate-top-animation");
  middleBar.classList.toggle("opacity-0");
  middleBar.classList.toggle("swipe-middle-animation");
  bottomBar.classList.toggle("rotate-bottom-animation");
  menu.classList.toggle("menu-open");
};

//HELPER FUNCTION THAT OPENS A DIALOG BOX
const openDialog = (
  headerText = "An error occured!",
  paragraphText = "There has been an error, check everything and try again.",
  loader = false
) => {
  let dialogBox = document.querySelector(".message-box");
  let dialogBtn = dialogBox.querySelector("#message-box-btn");
  let overlay = document.querySelector(".dialog-overlay");
  let header = dialogBox.querySelector("h2");
  let paragraph = dialogBox.querySelector("p");

  if (loader == false) {
    header.innerText = headerText;
    paragraph.innerText = paragraphText;

    overlay.classList.remove("d-none");
    dialogBox.classList.add("fade-in");
    dialogBox.classList.add("d-flex");

    dialogBtn.addEventListener(
      "click",
      (e) => {
        e.preventDefault();

        closeDialog();
      },
      { once: true }
    );

    document
      .querySelector(".dialog-overlay")
      .addEventListener("click", () => closeDialog(), { once: true });
  } else {
    header.innerText = "Loading...";
    paragraph.remove();

    let footer = dialogBox.querySelector("footer");
    footer.remove();

    let spinnerElement = document.createElement("div");
    spinnerElement.classList.add("spinner-border");
    spinnerElement.setAttribute("role", "status");
    let spinnerSpan = document.createElement("span");
    spinnerSpan.classList.add("visually-hidden");
    spinnerSpan.innerText = "Loading...";
    spinnerElement.appendChild(spinnerSpan);

    dialogBox.appendChild(spinnerElement);

    overlay.classList.remove("d-none");
    dialogBox.classList.add("fade-in");
    dialogBox.classList.add("d-flex");
  }
};

//HELPER FUNCTION WHICH CLOSES THE DIALOG
const closeDialog = (loader = false) => {
  let dialogBox = document.querySelector(".message-box");
  let overlay = document.querySelector(".dialog-overlay");

  dialogBox.classList.remove("fade-in");
  dialogBox.offsetWidth;
  dialogBox.classList.add("fade-in-reverse");

  dialogBox.addEventListener(
    "animationend",
    () => {
      dialogBox.classList.remove("d-flex");
      overlay.classList.add("d-none");
      dialogBox.classList.remove("fade-in-reverse");

      if (loader === true) {
        let paragraph = document.createElement("p");
        paragraph.innerText = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident,
        quibusdam, non ab pariatur ullam, rem delectus placeat modi alias rerum
        quisquam nihil! Nostrum explicabo similique mollitia qui facilis ad
        fuga!`;
        dialogBox.appendChild(paragraph);

        let footer = document.createElement("footer");

        let dialogBtn = document.createElement("button");
        dialogBtn.setAttribute("type", "button");
        dialogBtn.id = "message-box-btn";
        dialogBtn.innerText = "Ok";
        footer.appendChild(dialogBtn);

        dialogBox.appendChild(footer);

        let dialogSpinner = dialogBox.querySelector("div");
        dialogSpinner.remove();
      }
    },
    { once: true }
  );
};
