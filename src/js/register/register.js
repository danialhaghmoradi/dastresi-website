const mobileInput = document.getElementById("mobile");
const loginBtn = document.querySelector("button");
const formBox = document.getElementById("formBox");
const label = document.querySelector("label[for='mobile']");

window.addEventListener("DOMContentLoaded", () => {
  mobileInput.focus();
});

mobileInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^0-9۰-۹]/g, "");
  if (e.target.value.length === 11) {
    loginBtn.classList.add("bg-blue-600");
    loginBtn.classList.remove("bg-blue-400");
  } else {
    loginBtn.classList.remove("bg-blue-600");
    loginBtn.classList.add("bg-blue-400");
  }
  if (e.target.value.length > 11) {
    e.target.value = e.target.value.slice(0, 11);
    mobileInput.classList.add("border-red-500");
    mobileInput.setCustomValidity("شماره موبایل نباید بیشتر از ۱۱ رقم باشد");
    mobileInput.reportValidity();
  } else {
    mobileInput.classList.remove("border-red-500");
    mobileInput.setCustomValidity("");
  }

  document.addEventListener("click", (e) => {
    if (!formBox.contains(e.target)) {
      if (mobileInput.value.trim() === "" || mobileInput.value.length < 11) {
        mobileInput.classList.add("border-red-500");
      } else {
        mobileInput.classList.remove("border-red-500");
      }
    }
  });

  function checkValue() {
    if (mobileInput.value.trim() !== "") {
      label.classList.add("!top-[-1rem]", "!text-xs", "!text-blue-600");
    } else {
      label.classList.remove("!top-[-1rem]", "!text-xs", "!text-blue-600");
    }
  }

  mobileInput.addEventListener("input", checkValue);
  window.addEventListener("DOMContentLoaded", checkValue);
});
