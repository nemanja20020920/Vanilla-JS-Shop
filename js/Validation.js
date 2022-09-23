class Validation {
  constructor(formId, configObject) {
    this.form = formId;
    this.config = configObject;
    this.errors = {};

    this.generateErrorsObject();
    this.inputListener();
  }

  generateErrorsObject() {
    for (let key in this.config) {
      this.errors[key] = [];
    }
  }

  inputListener() {
    for (let key in this.config) {
      let element = document.querySelector(`${this.form} input#${key}`);
      console.log(element);
      element.addEventListener("change", this.validate.bind(this));
    }
  }

  validate(e) {
    let field = e.target;
    let fieldName = field.getAttribute("id");
    let fieldValue = field.value;
    this.errors[fieldName] = [];

    if (this.config[fieldName].required) {
      if (!fieldValue) this.errors[fieldName].push("This field is required.");
    }

    if (this.config[fieldName].email) {
      if (!this.validEmail(fieldValue))
        this.errors[fieldName].push("Email is not valid.");
    }

    if (this.config[fieldName].minLength > fieldValue.length)
      this.errors[fieldName].push(
        `This field must be minimum ${this.config[fieldName].minLength} characters long.`
      );

    if (this.config[fieldName].maxLength < fieldValue.length)
      this.errors[fieldName].push(
        `This field must be maximum ${this.config[fieldName].maxLength} characters long.`
      );

    if (this.config[fieldName].matching) {
      let matchingField = document.querySelector(
        `${this.form} input#${this.config[fieldName].matching}`
      );

      if (matchingField.value != fieldValue)
        this.errors[fieldName].push("Passwords must match!");

      if (this.errors[fieldName].length == 0) {
        this.errors[fieldName] = [];
        this.errors[this.config[fieldName].matching] = [];
      }
    }

    this.populateErrors();
  }

  populateErrors() {
    for (let list of document.querySelectorAll(".error-list")) {
      list.remove();
    }

    for (let key in this.errors) {
      document
        .querySelector(`${this.form} input#${key}`)
        .classList.remove("is-invalid");
    }

    for (let key in this.errors) {
      let input = document.querySelector(`${this.form} input#${key}`);
      let formWrapper = input.closest(".form-floating");

      let errorsList = document.createElement("ul");
      errorsList.classList.add("error-list");

      this.errors[key].forEach((error) => {
        let errorEl = document.createElement("li");
        errorEl.classList.add("error-list-element");
        errorEl.innerText = error;

        errorsList.appendChild(errorEl);
        input.classList.add("is-invalid");
      });

      formWrapper.appendChild(errorsList);
    }
  }

  validationPassed() {
    let errors;
    for (let key in this.errors) {
      if (this.errors[key].length > 0) {
        errors = 1;
      }
    }
    if (errors) return false;
    return true;
  }

  validEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }
}
