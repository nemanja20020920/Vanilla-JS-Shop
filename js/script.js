setTimeout(generateShop, 200);

let session = new Session();
session.userId = session.getSession();

//FILTERS
let filters = document.querySelectorAll("select");

filters.forEach((filter) => {
  filter.addEventListener("change", filterShop);
});

//FORMS
//Event listener that triggers when register button is clicked
document
  .querySelector("#open-register")
  .addEventListener("click", () => openRegister());

//Event listener that triggers when login button is clicked
document
  .querySelector("#open-login")
  .addEventListener("click", () => openLogin());

//Event listener that triggers when overlay is clicked WORKS FOR BOTH FORMS
document.querySelector(".overlay").addEventListener("click", () => {
  let register = document.querySelector(".register-form-wrapper").classList;

  if (register.contains("d-none")) closeLogin();
  else closeRegister();
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
  register();
});

//Event listener that triggers when login form is submited
document.querySelector("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});
