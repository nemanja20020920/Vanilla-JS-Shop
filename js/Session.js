class Session {
  userId = null;

  startSession() {
    let date = new Date();

    date.setTime(date.getTime() + 30 * 60 * 1000);

    let expires = ";expires=" + date.toUTCString();

    document.cookie = "user_id=" + this.userId + expires;
  }

  getSession() {
    let userId = "user_id=";
    let cookie = document.cookie.split(";");

    for (let part = 0; part < cookie.length; part++) {
      while (cookie[part] == " ") {
        cookie[part] = cookie[part].substring(1);
      }

      if (cookie[part].indexOf(userId) == 0) {
        this.userId = cookie[part].substring(
          userId.length,
          cookie[part].length
        );
      }
    }
  }
}
