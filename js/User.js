class User {
  user_id = null;
  email = null;
  password = null;
  orders = [];

  async registerUser() {
    let checkResponse = await fetch(
      "https://631fa38022cefb1edc4fa75a.mockapi.io/users"
    );

    let checkData = await checkResponse.json();

    let userValid = true;

    checkData.forEach((user) => {
      if (user.email === this.email) userValid = false;
    });

    if (userValid) {
      let response = await fetch(
        "https://631fa38022cefb1edc4fa75a.mockapi.io/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            orders: this.orders,
          }),
        }
      );

      let data = await response.json();

      let session = new Session();
      session.userId = data.id;
      session.startSession();
    }

    return userValid;
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
