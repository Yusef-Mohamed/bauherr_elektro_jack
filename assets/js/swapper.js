// // Utility functions
// const debounce = (func, wait) => {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// };

// const querySelector = (selector) => {
//   const element = document.querySelector(selector);
//   if (!element) throw new Error(`Element not found: ${selector}`);
//   return element;
// };

// const querySelectorAll = (selector) => {
//   const elements = document.querySelectorAll(selector);
//   if (elements.length === 0) throw new Error(`No elements found: ${selector}`);
//   return elements;
// };

// // Swapper class
// class Swapper {
//   constructor(options) {
//     this.options = {
//       className: "",
//       autoplay: 0,
//       defaultSlides: 1,
//       breakPoints: [],
//       haveButtons: false,
//       havePagination: false,
//       ...options,
//     };

//     this.initializeElements();
//     this.initializeState();
//     this.attachEventListeners();
//     this.handleResize();

//     if (this.options.autoplay) this.startAutoplay();
//     if (this.options.haveButtons) this.setupButtons();
//     if (this.options.havePagination) this.createPagination();
//   }

//   initializeElements() {
//     const { className } = this.options;
//     this.slides = querySelector(`${className} .slides`);
//     this.slideElements = querySelectorAll(`${className} .slide`);
//     if (this.options.havePagination) {
//       this.paginationContainer = querySelector(`${className} .pagination`);
//     }
//   }

//   initializeState() {
//     this.currentIndex = 0;
//     this.slideCount = this.slideElements.length;
//     this.slidesPerView = this.options.defaultSlides;
//     this.isDragging = false;
//     this.startX = 0;
//   }

//   attachEventListeners() {
//     this.slides.addEventListener("mousedown", this.handleDragStart.bind(this));
//     this.slides.addEventListener("mousemove", this.handleDragMove.bind(this));
//     this.slides.addEventListener("mouseup", this.handleDragEnd.bind(this));
//     this.slides.addEventListener("mouseleave", this.handleDragEnd.bind(this));
//     this.slides.addEventListener(
//       "touchstart",
//       this.handleDragStart.bind(this),
//       { passive: true }
//     );
//     this.slides.addEventListener("touchmove", this.handleDragMove.bind(this), {
//       passive: true,
//     });
//     this.slides.addEventListener("touchend", this.handleDragEnd.bind(this));
//     window.addEventListener(
//       "resize",
//       debounce(this.handleResize.bind(this), 300)
//     );
//   }

//   handleResize() {
//     this.updateSlideWidth();
//     this.updateSlidesPerView();
//     this.updateSlideStyles();
//   }

//   updateSlideWidth() {
//     const slideWidth = this.slideElements[0].clientWidth;
//     this.slides.style.transform = `translateX(-${
//       this.currentIndex * slideWidth
//     }px)`;
//   }

//   updateSlidesPerView() {
//     const rootFontSize = parseFloat(
//       getComputedStyle(document.documentElement).fontSize
//     );
//     const windowWidthRem = window.innerWidth / rootFontSize;

//     const breakPoint = this.options.breakPoints.reduce(
//       (acc, bp) =>
//         windowWidthRem >= bp.rem && (!acc || bp.rem > acc.rem) ? bp : acc,
//       null
//     );

//     this.slidesPerView = breakPoint
//       ? breakPoint.slidesPerView
//       : this.options.defaultSlides;
//   }

//   updateSlideStyles() {
//     this.slideElements.forEach((slide) => {
//       slide.style.width = `${100 / this.slidesPerView}%`;
//     });
//   }

//   showSlide(index) {
//     const slideWidth = this.slideElements[0].clientWidth;
//     this.slides.style.transform = `translateX(-${index * slideWidth}px)`;
//     this.currentIndex = index;
//     if (this.options.havePagination) this.updatePagination();
//   }

//   handleDragStart(event) {
//     this.startX =
//       event.type === "touchstart" ? event.touches[0].clientX : event.clientX;
//     this.isDragging = true;
//     this.slides.style.transition = "none";
//     this.slides.style.cursor = "grabbing";
//   }

//   handleDragMove(event) {
//     if (!this.isDragging) return;
//     const currentX =
//       event.type === "touchmove" ? event.touches[0].clientX : event.clientX;
//     const diff = currentX - this.startX;
//     const slideWidth = this.slideElements[0].clientWidth;
//     requestAnimationFrame(() => {
//       this.slides.style.transform = `translateX(${
//         -this.currentIndex * slideWidth + diff
//       }px)`;
//     });
//   }

//   handleDragEnd(event) {
//     if (!this.isDragging) return;
//     this.isDragging = false;
//     this.slides.style.transition = "transform 0.5s ease";
//     this.slides.style.cursor = "grab";
//     const endX =
//       event.type === "touchend"
//         ? event.changedTouches[0].clientX
//         : event.clientX;
//     const diff = endX - this.startX;
//     if (diff < -100)
//       this.showSlide(Math.min(this.currentIndex + 1, this.slideCount - 1));
//     else if (diff > 100) this.showSlide(Math.max(this.currentIndex - 1, 0));
//     else this.showSlide(this.currentIndex);
//   }

//   createPagination() {
//     this.paginationContainer.innerHTML = "";
//     this.slideElements.forEach((_, index) => {
//       const button = document.createElement("button");
//       button.classList.add("pagination-item");
//       button.setAttribute("aria-label", `Go to slide ${index + 1}`);
//       button.addEventListener("click", () => this.showSlide(index));
//       this.paginationContainer.appendChild(button);
//     });
//     this.updatePagination();
//   }

//   updatePagination() {
//     const paginationItems = this.paginationContainer.children;
//     Array.from(paginationItems).forEach((item, index) => {
//       item.classList.toggle("active", index === this.currentIndex);
//     });
//   }

//   setupButtons() {
//     const prevButton = querySelector(`${this.options.className} .prev`);
//     const nextButton = querySelector(`${this.options.className} .next`);
//     prevButton.addEventListener("click", () =>
//       this.showSlide(Math.max(this.currentIndex - 1, 0))
//     );
//     nextButton.addEventListener("click", () =>
//       this.showSlide(Math.min(this.currentIndex + 1, this.slideCount - 1))
//     );
//   }

//   startAutoplay() {
//     setInterval(() => {
//       this.showSlide((this.currentIndex + 1) % this.slideCount);
//     }, this.options.autoplay);
//   }
// }

// // Usage
// new Swapper({
//   className: "#aktuellesSection",
//   autoplay: 20000,
//   defaultSlides: 1,
//   breakPoints: [{ rem: 1, slidesPerView: 1 }],
//   haveButtons: false,
//   havePagination: true,
// });
function debounce(func, wait) {
  let timeout;

  return function (...args) {
    // Clear the timeout if it already exists
    clearTimeout(timeout);

    // Set a new timeout
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
const makeSwapper = (options) => {
  const {
    className = "",
    autoplay,
    defSlides = 1,
    breakPoints = [],
    haveButtons,
    havePagination,
  } = options;
  const prevButton = document.querySelector(className + " .prev");
  const nextButton = document.querySelector(className + ".next");
  const slides = document.querySelector(className + ".slides");
  const slidesElements = document.querySelectorAll(className + ".slide");
  const paginationContainer = document.querySelector(className + ".pagination");
  const slideCount = slidesElements.length;
  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;
  let sidesPerView = defSlides;
  let numberOfSlideViews = slideCount - sidesPerView + 1;
  function calcNextIndex() {
    if (currentIndex === numberOfSlideViews - 1) {
      currentIndex = 0;
    } else {
      currentIndex += 1;
    }
    createPagination();
  }
  function calcPrevIndex() {
    if (currentIndex === 0) {
      currentIndex = numberOfSlideViews - 1;
    } else {
      currentIndex -= 1;
    }
    createPagination();
  }
  function updateSlideWidth() {
    const slideWidth = document.querySelector(".slide").clientWidth;
    slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
  function handelResize() {
    updateSlideWidth();
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const windowWidthPx = window.innerWidth;
    const windowWidthRem = windowWidthPx / rootFontSize;
    let breakPoint = undefined;
    breakPoints.forEach((bp) => {
      if (windowWidthRem >= bp.rem) {
        if (!breakPoint) {
          breakPoint = bp;
        } else {
          if (bp.rem > breakPoint.rem) {
            breakPoint = bp;
          }
        }
      }
    });
    if (breakPoint) {
      sidesPerView = breakPoint.slidesPerView;
    } else {
      sidesPerView = defSlides;
      console.log("No breakpoint found");
    }
    slidesElements.forEach((slide) => {
      slide.style.width = `${100 / sidesPerView}%`;
    });
  }
  const debouncedResize = debounce(handelResize, 300);
  function showSlide(index) {
    const slideWidth = document.querySelector(".slide").clientWidth;
    slides.style.transform = `translateX(-${index * slideWidth}px)`;
  }
  function handleDragStart(e) {
    startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    isDragging = true;
    slides.style.transition = "none"; // Disable transition while dragging
    slides.style.cursor = "grabbing"; // Change cursor to grabbing
  }
  function handleDragMove(e) {
    if (!isDragging) return;
    const moveX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const offsetX = moveX - startX;
    slides.style.transform = `translateX(calc(-${
      currentIndex * document.querySelector(".slide").clientWidth
    }px + ${offsetX}px))`;
  }
  function handleDragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    slides.style.transition = "transform 0.5s ease"; // Re-enable transition
    slides.style.cursor = "grab"; // Change cursor back to grab
    const endX =
      e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
    const offsetX = endX - startX;
    if (offsetX < -100) calcNextIndex();
    else if (offsetX > 100) calcPrevIndex();

    showSlide(currentIndex);
  }
  function createPagination() {
    paginationContainer.innerHTML = "";
    slidesElements.forEach((_, index) => {
      const paginationItem = document.createElement("button");
      paginationItem.classList.add("pagination-item");
      if (index === currentIndex) paginationItem.classList.add("active");
      paginationItem.dataset.index = index;
      paginationItem.addEventListener("click", () => {
        currentIndex = index;
        showSlide(currentIndex);
      });
      paginationContainer.appendChild(paginationItem);
    });
    handlePaginationFunctional();
  }
  function handlePaginationFunctional(e) {
    const paginationItems = document.querySelectorAll(
      className + ".pagination-item"
    );
    paginationItems.forEach((e) => {
      e.addEventListener("click", (e) => {
        currentIndex = +e.target.dataset.index;
        createPagination();
      });
    });
  }
  slides.addEventListener("mousedown", handleDragStart);
  slides.addEventListener("mousemove", handleDragMove);
  slides.addEventListener("mouseup", handleDragEnd);
  slides.addEventListener("mouseleave", handleDragEnd);
  slides.addEventListener("touchstart", handleDragStart);
  slides.addEventListener("touchmove", handleDragMove);
  slides.addEventListener("touchend", handleDragEnd);
  debouncedResize();
  if (autoplay)
    setInterval(() => {
      calcNextIndex();
      showSlide(currentIndex);
    }, autoplay);
  if (haveButtons) {
    prevButton.addEventListener("click", () => {
      calcPrevIndex();
      showSlide(currentIndex);
    });

    nextButton.addEventListener("click", () => {
      calcNextIndex();
      showSlide(currentIndex);
    });
  }
  if (havePagination) {
    createPagination();
  }
  window.addEventListener("resize", debouncedResize);
};
// "#aktuellesSection ", 20000, 1, [{ rem: 1, slidesPerView: 1 }]
makeSwapper({
  className: "#aktuellesSection ",
  autoplay: 20000,
  defSlides: 1,
  breakPoints: [{ rem: 1, slidesPerView: 1 }],
  haveButtons: false,
  havePagination: true,
});
