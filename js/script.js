setTimeout(generateShop, 200);

//FILTERS
let filters = document.querySelectorAll("select");

filters.forEach((filter) => {
  filter.addEventListener("change", filterShop);
});

//FORMS
//Event listener that triggers when register button is clicked
document.querySelector("#open-register").addEventListener("click", () => {
  document.querySelector(".register-form-wrapper").classList.remove("d-none");
  document.querySelector(".overlay").classList.remove("d-none");
});

//Event listener that triggers when overlay is clicked WORKS ONLY FOR REGISTER FOR
document.querySelector(".overlay").addEventListener("click", () => {
  document.querySelector(".register-form-wrapper").classList.add("d-none");
  document.querySelector(".overlay").classList.add("d-none");
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

//Event listener that triggers when register form is submitted
document.querySelector("#register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  register();
});
