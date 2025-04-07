"use strict";

// select all elements
const signUpDiv = document.getElementById("signUpDiv");
const form = document.getElementById("signUpForm");
const errorParagraph = document.getElementById("error");
const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submit");

const dialog = document.getElementById("dialog");
const emailSpan = document.getElementById("emailAddress");
const closeDialogBtn = document.getElementById("closeDialog");

// validate email
function validateEmail() {
  const isValid = emailInput.checkValidity();
  const validityState = emailInput.validity;

  emailInput.toggleAttribute("data-invalid", !isValid);

  if (isValid) {
    errorParagraph.textContent = "";
  } else {
    errorParagraph.textContent = validityState.valueMissing
      ? "Email is required"
      : "Valid email required";
  }
}

emailInput.addEventListener("input", validateEmail);
emailInput.addEventListener("blur", validateEmail);

form.addEventListener("submit", (event) => {
  if (!form.checkValidity()) {
    event.preventDefault();
    // form.reportValidity();
    emailInput.focus();
    return;
  } else {
    event.preventDefault();
    openDialog();
  }
});

// open dialog and hide sign up div, update text content
function openDialog() {
  signUpDiv.classList.remove("flex");
  signUpDiv.classList.remove("lg:grid");
  signUpDiv.classList.add("hidden");
  dialog.showModal();
  closeDialogBtn.focus();
  emailSpan.textContent = emailInput.value.trim();
}

// close dialog and show sign up div
function closeDialog() {
  dialog.close();
  signUpDiv.classList.remove("hidden");
  signUpDiv.classList.add("flex");
  signUpDiv.classList.add("lg:grid");
  emailInput.value = "";
  errorParagraph.textContent = "";
  emailInput.focus();
}

// close dialog when the button, escape key or the dialog backdrop is clicked
closeDialogBtn.addEventListener("click", closeDialog);
dialog.addEventListener("click", function (e) {
  if (e.target === dialog) {
    closeDialog();
  }
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && dialog.open) {
    closeDialog();
  }
});
