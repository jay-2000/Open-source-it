const playerNameInput = document.getElementById("player_name_text");
const dpEls = document.querySelectorAll(".dp");
const homeSubmitBtn = document.getElementById("home_submit");

let playerName = undefined;
let playerDp = undefined;

// homepage js starts

function getPlayerDp() {
  let dpId = undefined;
  dpEls.forEach((dpEl) => {
    if (dpEl.checked) {
      dpId = dpEl.id;
    }
  });
  return dpId;
}

homeSubmitBtn.addEventListener("click", () => {
  playerName = playerNameInput.value;
  playerDp = getPlayerDp();
  // savePlayerDetails(playerName, playerDp);
  localStorage.setItem("player_name", playerName);
  localStorage.setItem("player_dp", playerDp);
  window.location.href = "quizPage.html";
});
