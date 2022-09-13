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
        let session = new Session();
        session.userId = data.id;
        session.startSession();

        document
          .querySelector(".register-form-wrapper")
          .classList.add("d-none");
        document.querySelector(".overlay").classList.add("d-none");
        document.querySelector("#register-email").value = null;
        document.querySelector("#register-password").value = null;
        document.querySelector("#repeat-register-password").value = null;
      });
  }

  async loginUser() {
    let response = await fetch(
      "https://631fa38022cefb1edc4fa75a.mockapi.io/users"
    );

    let data = await response.json();
    let userValid = false;

    data.forEach((user) => {
      if (user.email == this.email && user.password == this.password) {
        userValid = true;

        let session = new Session();
        session.userId = user.id;
        session.startSession();
      }
    });

    return userValid;
  }
}
