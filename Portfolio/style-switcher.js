const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
styleSwitcherToggler.addEventListener("click", () => {
  document.querySelector(".style-switcher").classList.toggle("open");
});

window.addEventListener("scroll", () => {
  if (document.querySelector(".style-switcher").classList.contains("open")) {
    document.querySelector(".style-switcher").classList.remove("open");
  }
});

// style changer
const alternatestyle = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
  localStorage.setItem("color", color);
  changeColor();
}

function changeColor() {
  alternatestyle.forEach((style) => {
    if (localStorage.getItem("color") === style.getAttribute("title")) {
      style.removeAttribute("disabled");
    } else {
      style.setAttribute("disabled", "true");
    }
  });
}

if (localStorage.getItem("color") !== null) {
  changeColor();
}
// dark light mode
const daynight = document.querySelector(".day-night");

daynight.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
  updateicon();
});

function thememode() {
  if (localStorage.getItem("theme") !== null) {
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }

  updateicon();
}
thememode();
function updateicon() {
  if (document.body.classList.contains("dark")) {
    daynight.querySelector("i").classList.remove("fa-moon-o");
    daynight.querySelector("i").classList.add("fa-sun-o");
  } else {
    daynight.querySelector("i").classList.remove("fa-sun-o");
    daynight.querySelector("i").classList.add("fa-moon-o");
  }
}

window.addEventListener("load", () => {
  if (document.body.classList.contains("dark")) {
    daynight.querySelector("i").classList.add("fa-sun-o");
  } else {
    daynight.querySelector("i").classList.add("fa-moon-o");
  }
});
