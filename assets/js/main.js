const mobileNavButton = document.querySelector(".mobileNavButton");
const mainHeader = document.querySelector(".mainHeaderContainer");
const mobileHeader = document.querySelector(".mobileNav");

mobileNavButton.addEventListener("click", () => {
  if (mainHeader.classList.contains("open")) {
    mobileHeader.classList.remove("open");
    setTimeout(() => {
      mainHeader.classList.remove("open");
    }, 500);
  } else {
    mainHeader.classList.add("open");
    mobileHeader.classList.add("open");
  }
});
mobileHeader.addEventListener("click", () => {
  mainHeader.classList.remove("open");
  mobileHeader.classList.remove("open");
});
window.addEventListener("click", (e) => {
  if (
    !mobileHeader.contains(e.target) &&
    !mainHeader.contains(e.target) &&
    mainHeader.classList.contains("open")
  ) {
    mobileHeader.classList.remove("open");
    setTimeout(() => {
      mainHeader.classList.remove("open");
    }, 500);
  }
});
const footerWrapperBtns = document.querySelectorAll(".datesBtn");
const footerWrapper = document.querySelector("#datenschutzerklaerung");
footerWrapperBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("footerBtn")) {
      footerWrapper.classList.toggle("open");
    } else {
      footerWrapper.classList.add("open");
    }
  });
});
