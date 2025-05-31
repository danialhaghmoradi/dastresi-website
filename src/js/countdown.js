const countdown = (durationHours = 50) => {
  const timerElement = document.querySelector("#countdown-timer");
  if (!timerElement) return;

  const now = Date.now();
  const savedEnd = localStorage.getItem("countdownEndTime");

  let endTime;

  if (savedEnd) {
    endTime = Number(savedEnd);
  } else {
    endTime = now + durationHours * 60 * 60 * 1000;
    localStorage.setItem("countdownEndTime", endTime);
  }

  const format = (val) => String(val).padStart(2, "0");

  const update = () => {
    const diff = endTime - Date.now();
    if (diff <= 0) {
      timerElement.textContent = "00:00:00";
      clearInterval(timer);
      localStorage.removeItem("countdownEndTime");
      return;
    }

    const h = format(Math.floor(diff / (1000 * 60 * 60)));
    const m = format(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    const s = format(Math.floor((diff % (1000 * 60)) / 1000));

    timerElement.textContent = `${h}:${m}:${s}`;
  };

  update();
  const timer = setInterval(update, 1000);
};

export default countdown;
