document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const username = document.getElementById("user");
  const email = document.getElementById("userEmail");
  const password = document.getElementById("userPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const successMessage = document.querySelector(".success-message");

  String.prototype.isEmail = function () {
      return !!this.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
  };

  function showError(input, message) {
      const inputGroup = input.parentElement;
      inputGroup.classList.remove("success");
      inputGroup.classList.add("error");
      const errorMessage = inputGroup.querySelector(".error-message");
      errorMessage.textContent = message;
      errorMessage.style.visibility = "visible";
  }

  function showSuccess(input) {
      const inputGroup = input.parentElement;
      inputGroup.classList.remove("error");
      inputGroup.classList.add("success");
      const errorMessage = inputGroup.querySelector(".error-message");
      errorMessage.style.visibility = "hidden";
  }

  function checkRequired(inputs) {
      let allValid = true;
      inputs.forEach((input) => {
          if (input.value.trim() === "") {
              showError(input, `${input.getAttribute("data-label")} is required`);
              allValid = false;
          } else {
              showSuccess(input);
          }
      });
      return allValid;
  }

  function checkLength(input, min, max) {
      const length = input.value.trim().length;
      if (length < min) {
          showError(input, `${input.getAttribute("data-label")} must be at least ${min} characters`);
          return false;
      } else if (length > max) {
          showError(input, `${input.getAttribute("data-label")} must be less than ${max} characters`);
          return false;
      } else {
          showSuccess(input);
          return true;
      }
  }

  function checkEmail(input) {
      if (!input.value.trim().isEmail()) {
          showError(input, `Please enter a valid email address`);
          return false;
      } else {
          showSuccess(input);
          return true;
      }
  }

  function checkPasswordsMatch(password, confirmPassword) {
      if (password.value !== confirmPassword.value) {
          showError(confirmPassword, `Passwords do not match`);
          return false;
      } else if (confirmPassword.value.trim() === "") {
          showError(confirmPassword, `Confirm Password is required`);
          return false;
      } else {
          showSuccess(confirmPassword);
          return true;
      }
  }

  signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const isFormValid =
          checkRequired([username, email, password, confirmPassword]) &&
          checkLength(username, 5, 15) &&
          checkLength(password, 6, 20) &&
          checkEmail(email) &&
          checkPasswordsMatch(password, confirmPassword);

      if (isFormValid) {
          successMessage.style.visibility = "visible";
          signupForm.classList.add("submitted");
      }
  });
});
