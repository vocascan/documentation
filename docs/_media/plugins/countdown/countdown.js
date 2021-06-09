function plugin(hook) {
  hook.doneEach(function () {
    const countdowns = document.querySelectorAll(".countdown");

    countdowns.forEach(function (countdown) {
      countdown.innerHTML = `
          <ul>
            <li><span class="days"></span>days</li>
            <li><span class="hours"></span>Hours</li>
            <li><span class="minutes"></span>Minutes</li>
            <li><span class="seconds"></span>Seconds</li>
          </ul>`;

      const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

      const date = new Date(countdown.dataset.endDate).getTime();
      let id = null;

      function step() {
        const now = new Date().getTime();
        const distance = date - now;

        countdown.getElementsByClassName("days")[0].innerText = Math.floor(distance / day);
        countdown.getElementsByClassName("hours")[0].innerText = Math.floor((distance % day) / hour);
        countdown.getElementsByClassName("minutes")[0].innerText = Math.floor((distance % hour) / minute);
        countdown.getElementsByClassName("seconds")[0].innerText = Math.floor((distance % minute) / second);

        if (distance < 0) {
          countdown.innerHTML = countdown.dataset.finishLabel;
          clearInterval(id);
        }
      }

      step();
      id = setInterval(step, 1000);
    });
  });
}

window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins);
