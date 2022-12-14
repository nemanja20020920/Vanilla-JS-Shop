setTimeout(generateShop, 200);

let session = new Session();
session.userId = session.getSession();

//FILTERS
let filters = document.querySelectorAll("select");

filters.forEach((filter) => {
  filter.addEventListener("change", filterShop);
});

//FORMS

//Register form validation config object
const registerConfig = {
  "register-email": {
    required: true,
    email: true,
  },
  "register-password": {
    required: true,
    minLength: 6,
    maxLength: 18,
    matching: "repeat-register-password",
  },
  "repeat-register-password": {
    required: true,
    minLength: 6,
    maxLength: 18,
    matching: "register-password",
  },
};

let validate = new Validation("#register-form", registerConfig);

//Event listener that triggers when register button is clicked
document
  .querySelector("#open-register")
  .addEventListener("click", () => openRegister());

//Event listener that triggers when login button is clicked
document
  .querySelector("#open-login")
  .addEventListener("click", () => openLogin());

//Event listener that triggers when overlay is clicked WORKS FOR ALL FORMS INCLUDING THE CART
document.querySelector(".overlay").addEventListener("click", () => {
  let register = document.querySelector(".register-form-wrapper").classList;
  let cart = document.querySelector(".cart-container").classList;

  if (register.contains("d-none")) {
    if (cart.contains("d-none")) closeLogin();
    else closeCart();
  } else closeRegister();
});

//Event listeners for close buttons of each form WORKS FOR BOTH FORMS
document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let btn = e.target;
    let wrapper = btn.closest(".container");
    wrapper.classList.add("d-none");
    document.querySelector(".overlay").classList.add("d-none");
  });
});

//Event listener that triggers when register form is submited
document.querySelector("#register-form").addEventListener("submit", (e) => {
  e.preventDefault();

  if (validate.validationPassed()) register();
});

//Event listener that triggers when login form is submited
document.querySelector("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});

//CART
//Event listener that triggers when user opens the cart
document.querySelector(".cart-btn").addEventListener("click", (e) => {
  e.preventDefault();
  generateCart();
});

//Event listener that triggers when user places the order
document.querySelector("#order-btn").addEventListener("click", (e) => {
  e.preventDefault();
  placeOrder();
});

//Event listener that triggers when user clicks the responsive menu button
document
  .querySelector(".responsive-menu-btn")
  .addEventListener("click", (e) => {
    e.preventDefault();
    toggleMenu();
  });

//Event listener that handles the go to top link
window.addEventListener("scroll", () => {
  let goToBtn = document.querySelector(".go-to-wrapper");

  if (window.scrollY > 100) {
    if (goToBtn.classList.contains("d-none")) {
      goToBtn.classList.add("slide-in-rotate-animation");
      goToBtn.classList.remove("d-none");
      goToBtn.classList.add("d-flex");
    }
  } else {
    if (goToBtn.classList.contains("d-flex")) {
      goToBtn.classList.remove("slide-in-rotate-animation");
      goToBtn.offsetWidth;
      goToBtn.classList.add("slide-in-rotate-animation-reverse");

      goToBtn.addEventListener(
        "animationend",
        () => {
          goToBtn.classList.add("d-none");
          goToBtn.classList.remove("d-flex");
          goToBtn.classList.remove("slide-in-rotate-animation-reverse");
        },
        { once: true }
      );
    }
  }
});
