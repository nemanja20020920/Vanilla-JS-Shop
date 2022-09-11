// FUNCTION THAT GENERATES THE SHOP ITEMS ONLOAD
const generateShop = () => {
  let shopEl = document.querySelector("#shop-container"); //It takes the shop containter element

  let shopHTML = ""; //Creates the html string that will contain html code for the store

  products.forEach((product) => { //Iterates through the products object and creates the html string for each product containing the html code for that product and ADDS it to the shopHTML string
    let productHTML = `
    <div
    class="col-md-4 d-flex align-items-center justify-content-center"
    data-product-id="${product.id}"
    data-color="${product.color}"
    data-sizes="${product.sizes}"
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
