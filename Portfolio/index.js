/*toggle nav btn*/

const navBtn = document.querySelector(".nav-btn");
const navMenu = document.querySelector(".nav-menu");
const navcloseBtn = navMenu.querySelector(".close-menu");
navBtn.addEventListener("click", showNav);
navcloseBtn.addEventListener("click", hideNav);

function showNav() {
  navMenu.classList.add("open");
  scrollingtoggle();
}

function hideNav() {
  navMenu.classList.remove("open");
  fadeOutEffect();
  scrollingtoggle();
}

function fadeOutEffect() {
  document.querySelector(".fade-out-effect").classList.add("active");
  setTimeout(() => {
    document.querySelector(".fade-out-effect").classList.remove("active");
  }, 300);
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("link-item")) {
    if (event.target.hash !== "") {
      event.preventDefault();
      const hash = event.target.hash;
      document.querySelector(".section.active").classList.add("hide");
      document.querySelector(".section.active").classList.remove("active");
      document.querySelector(hash).classList.add("active");
      document.querySelector(hash).classList.remove("hide");
      navMenu
        .querySelector(".active")
        .classList.add("outer-shadow", "hover-shadow");
      navMenu
        .querySelector(".active")
        .classList.remove("active", "inner-shadow");
      if (navMenu.classList.contains("open")) {
        event.target.classList.add("active", "inner-shadow");
        event.target.classList.remove("hover-shadow", "outer-shadow");
        hideNav();
      } else {
        let navItems = navMenu.querySelectorAll(".link-item");
        navItems.forEach((item) => {
          if (hash === item.hash) {
            item.classList.add("active", "inner-shadow");
            item.classList.remove("hover-shadow", "outer-shadow");
          }
        });
        fadeOutEffect();
        window.location.hash = hash;
      }
    }
  }
});

/*toggle end*/
/*about section tabs*/
const aboutsection = document.querySelector(".about-section");
const tabcontainer = document.querySelector(".about-tabs");
tabcontainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("tab-item") &&
    !e.target.classList.contains("active")
  ) {
    const target = e.target.getAttribute("data-target");
    tabcontainer
      .querySelector(".active")
      .classList.remove("outer-shadow", "active");
    e.target.classList.add("active", "outer-shadow");
    aboutsection
      .querySelector(".tab-content.active")
      .classList.remove("active");
    aboutsection.querySelector(target).classList.add("active");
  }
});

function scrollingtoggle() {
  document.body.classList.toggle("hidden-scrolling");
}

/* project filter and popup*/

const filterContainer = document.querySelector(".project-filter");
const projectItemsContainer = document.querySelector(".project-items");
const projectItems = document.querySelectorAll(".project-item");
const popup = document.querySelector(".project-popup");
const prevBtn = popup.querySelector(".pp-prev");
const nextBtn = popup.querySelector(".pp-next");
const closeBtn = popup.querySelector(".pp-close");
const projectDetailsContainer = popup.querySelector(".pp-details");
const projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
let itemIndex, slideIndex, screenshots;

/*filter project items*/

filterContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("filter-item") &&
    !e.target.classList.contains("active")
  ) {
    filterContainer
      .querySelector(".active")
      .classList.remove("outer-shadow", "active");
    e.target.classList.add("active", "outer-shadow");
    const target = e.target.getAttribute("data-target");
    projectItems.forEach((item) => {
      if (target === item.getAttribute("data-category") || target === "All") {
        item.classList.remove("hide");
        item.classList.add("show");
      } else {
        item.classList.remove("show");
        item.classList.add("hide");
      }
    });
  }
});

projectItemsContainer.addEventListener("click", (e) => {
  if (e.target.closest(".project-item-inner")) {
    const projectItem = e.target.closest(".project-item-inner").parentElement;
    itemIndex = Array.from(projectItem.parentElement.children).indexOf(
      projectItem
    );
    screenshots = projectItems[itemIndex]
      .querySelector(".project-item-img img")
      .getAttribute("data-screenshots");
    screenshots = screenshots.split(",");
    if (screenshots.length === 1) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    } else {
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
    }
    slideIndex = 0;
    popuptoggle();
    popupslideshow();
    popupDetails();
  }
});

closeBtn.addEventListener("click", () => {
  popuptoggle();
  if (projectDetailsContainer.classList.contains("active")) {
    popupDetailsToggle();
  }
});

function popuptoggle() {
  popup.classList.toggle("open");
  scrollingtoggle();
}

function popupslideshow() {
  const imgsrc = screenshots[slideIndex];
  const popupImg = popup.querySelector(".pp-img");
  popup.querySelector(".pp-loader").classList.add("active");
  popupImg.src = imgsrc;
  popupImg.onload = () => {
    popup.querySelector(".pp-loader").classList.remove("active");
  };
  popup.querySelector(".pp-counter").innerHTML =
    slideIndex + 1 + " of " + screenshots.length;
}

nextBtn.addEventListener("click", () => {
  if (slideIndex === screenshots.length - 1) {
    slideIndex = 0;
  } else {
    slideIndex++;
  }
  popupslideshow();
});

prevBtn.addEventListener("click", () => {
  if (slideIndex === 0) {
    slideIndex = screenshots.length - 1;
  } else {
    slideIndex--;
  }
  popupslideshow();
});

function popupDetails() {
  const details = projectItems[itemIndex].querySelector(
    ".project-item-details"
  ).innerHTML;
  popup.querySelector(".pp-project-details").innerHTML = details;
  const title = projectItems[itemIndex].querySelector(
    ".project-item-title"
  ).innerHTML;
  popup.querySelector(".pp-title h2").innerHTML = title;
  const category = projectItems[itemIndex].getAttribute("data-category");
  popup.querySelector(".pp-project-category").innerHTML = category;
}

projectDetailsBtn.addEventListener("click", () => {
  popupDetailsToggle();
});

function popupDetailsToggle() {
  if (projectDetailsContainer.classList.contains("active")) {
    projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
    projectDetailsBtn.querySelector("i").classList.add("fa-plus");
    projectDetailsContainer.classList.remove("active");
    projectDetailsContainer.style.maxHeight = 0 + "px";
  } else {
    projectDetailsContainer.classList.add("active");
    projectDetailsBtn.querySelector("i").classList.add("fa-minus");
    projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
    projectDetailsContainer.style.maxHeight =
      projectDetailsContainer.scrollHeight + "px";
    popup.scrollTo(0, projectDetailsContainer.offsetTop);
  }
}

// hide all sections except active
const sections = document.querySelectorAll(".section");
sections.forEach((section) => {
  if (!section.classList.contains("active")) {
    section.classList.add("hide");
  }
});

// preloader

window.addEventListener("load", () => {
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 600);
});
