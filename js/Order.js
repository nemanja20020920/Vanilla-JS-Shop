class Order {
  userId = null;
  products = null;
  totalPrice = null;

  async sendOrder() {
    let response = await fetch(
      "https://631fa38022cefb1edc4fa75a.mockapi.io/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: this.userId,
          products: this.products,
          totalPrice: this.totalPrice,
        }),
      }
    );

    if (response.ok) return true;
    return false;
  }
}
