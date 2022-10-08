var icon = document.getElementById("icon");
icon.onclick = function () {
  if (typeof Storage !== "undefined") {
    if (localStorage.clickcount) {
      localStorage.clickcount = Number(localStorage.clickcount) + 1;
      if (localStorage.clickcount % 2 == 0) {
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")) {
          icon.src =
            "C:/Users/AKHILESH/OneDrive/Desktop/dark theme icon/sun.png";
        } else {
          icon.src =
            "C:/Users/AKHILESH/OneDrive/Desktop/dark theme icon/moon.png";
        }
      }
    } else {
      localStorage.clickcount = 1;
    }
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, your browser does not support web storage...";
  }
};

// let icon = document.getElementById('icon');
// let stored = localStorage.getItem('mode');
// icon.onclick = function () {
//     if (stored) {
//         document.body.classList.toggle("dark-theme");
//         if (document.body.classList.contains("dark-theme")) {
//             icon.src = "C:/Users/AKHILESH/OneDrive/Desktop/dark theme icon/sun.png";
//         } else {
//             icon.src = "C:/Users/AKHILESH/OneDrive/Desktop/dark theme icon/moon.png";
//         }
//     }
//     else {
//          document.body.classList.toggle("dark-theme");
//          if (document.body.classList.contains("dark-theme")) {
//            icon.src =
//              "C:/Users/AKHILESH/OneDrive/Desktop/dark theme icon/sun.png";
//          } else {
//            icon.src =
//              "C:/Users/AKHILESH/OneDrive/Desktop/dark theme icon/moon.png";
//          }
//     }
// }
// }
//   document.body.className = 'dark-theme';
//   icon.clicked = true;
//   icon.addEventListener('change', function () {
//     if (icon.clicked) {
//         document.body.classList.toggle('dark-theme');

//     } else {
//       document.body.classList.remove('dark-theme');
//       localStorage.removeItem('mode');
//     }
//   });
// } else {
//   icon.addEventListener('change', function () {
//     if (icon.clicked) {
//       document.body.className = 'dark-theme';
//       localStorage.setItem('mode', 'dark-theme');
//     } else {
//       document.body.classList.remove('dark-theme');
//       localStorage.removeItem('mode');
//     }
//   });
// }
//     // var icon = document.getElementById("icon");
//         // icon.onclick = function () {
//         // document.body.classList.toggle("dark-theme");
//         // if (document.body.classList.contains("dark-theme")) {
//         //   icon.src = "C:/Users/AKHILESH/OneDrive/Desktop/dark theme icon/sun.png";
//         // } else {
//         //   icon.src = "C:/Users/AKHILESH/OneDrive/Desktop/dark theme icon/moon.png";
//         // }
