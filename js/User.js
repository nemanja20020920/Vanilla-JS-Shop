class User {
  user_id = null;
  email = null;
  password = null;
  orders = [];

  registerUser() {
    fetch("https://631fa38022cefb1edc4fa75a.mockapi.io/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
        orders: this.orders,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
}
