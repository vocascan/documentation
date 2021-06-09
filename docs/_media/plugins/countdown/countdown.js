function plugin(hook) {
  hook.doneEach(function () {
    const countdowns = document.querySelectorAll(".countdown");

    countdowns.forEach(function (countdown) {
      countdown.innerHTML = `
          <ul>
            <li><span class="days"></span><span class="unit">days</span></li>
            <li><span class="hours"></span><span class="unit">Hours</span></li>
            <li><span class="minutes"></span><span class="unit">Minutes</span></li>
            <li><span class="seconds"></span><span class="unit">Seconds</span></li>
          </ul>`;

      const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

      const date = new Date(countdown.dataset.endDate).getTime();
      let id = null;

      function leadingZero(num) {
        return num < 10 ? "0" + num : num;
      }

      function step() {
        const now = new Date().getTime();
        const distance = date - now;

        countdown.getElementsByClassName("days")[0].innerText = leadingZero(Math.floor(distance / day));
        countdown.getElementsByClassName("hours")[0].innerText = leadingZero(Math.floor((distance % day) / hour));
        countdown.getElementsByClassName("minutes")[0].innerText = leadingZero(Math.floor((distance % hour) / minute));
        countdown.getElementsByClassName("seconds")[0].innerText = leadingZero(
          Math.floor((distance % minute) / second)
        );

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
