
function tick() {
  const t = new Date()
  const clock = document.getElementById("clock")
  clock.innerHTML = `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
}

function setTimer() {

  setInterval(tick, 1000);
}

window.addEventListener("load", setTimer) 