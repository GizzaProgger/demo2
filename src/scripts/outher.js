export default () => {
  (() => {
    let oldImgUrl = "";
    let oldHTML = "";
    if (!document.querySelector(".div-pole-otcritka img")) return;
    document.querySelector(".div-pole-otcritka img").addEventListener("mouseover", e => {
      oldImgUrl = e.target.getAttribute("src");
      oldHTML = e.target.nextElementSibling.innerHTML;
      e.target.nextElementSibling.innerHTML = "";
      e.target.nextElementSibling.insertAdjacentHTML("afterbegin", `
        <div style="text-align: center; font-size: 13px; width: 300px; margin-left: -50px; line-height: 15px;">
          <strong>Мы вас ждем!</strong> <br>
          Уберите курсор и записывайтесь!:)
        </div>
      `)
      e.target.setAttribute("src", "../src/assets/images/mark-side.jpg");
    })
    document.querySelector(".div-pole-otcritka img").addEventListener("mouseout", e => {
      e.target.setAttribute("src", oldImgUrl);
      e.target.nextElementSibling.innerHTML = oldHTML;
    })
  })()
  let date = new Date();
  function getWorkTime(dateStr) {
    let date = dateStr ? new Date(dateStr) : new Date();
    let day = date.getDay();
    // Если воскресенье или суббота или пятница
    let workTime;
    if (day == 0 || day == 6 || day == 5) {
      workTime = "12:00, 16:30";
    } else {
      workTime = "12:00, 21:30";
    }
    return workTime;
  }
  // Установить текущею дату
  let setV = () => {
    if (!document.querySelector(".text-field-data")) return
    document.querySelector(".text-field-data").value = date.toISOString().substring(0, 10); 
  }
  setV();
  (() => {
    const scalingBody = () => {
      if (!document.querySelector(".section-header")) return
      let docWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (docWidth < 991) return
      let docHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      let kScaling =  docHeight / 786;
      kScaling = 0.9 < kScaling && kScaling < 1 ? kScaling : 0.9;
      document.querySelector(".section-header").style.zoom = kScaling;
    }
    document.addEventListener("resize", scalingBody);
    scalingBody();
  })()
  function setTimeToCallInput(dateStr) {
    if (!document.querySelector("#time")) return;
    let workTime = getWorkTime(dateStr);
    let times = generateArrOptionFromWorkTime(workTime.split(",")[0], workTime.split(",")[1]);
    times.forEach(time => {
      document.querySelector("#time").insertAdjacentHTML("beforeend", `<option ${time.selected} value="${time.value}">${time.value}</option>`);
    });
  }
  
  function generateArrOptionFromWorkTime(start, end) {
    let res = [];
    let i = 0;
    start = new Date(2021, 0, 1, start.split(":")[0], start.split(":")[1])
    end = new Date(2021, 0, 1, end.split(":")[0], end.split(":")[1])
    let sum = start.getTime();
    let hulfHour = 1000 * 60 * 30;
    let now, minutes, hours;
    while (sum < end.getTime() + 1 && i < 24) {
      i++;
      now = new Date(sum);
      minutes = String(now.getMinutes());
      minutes = minutes.length < 2 ? minutes + "0" : minutes;
      hours = String(now.getHours());
      // Заказчик попросил обработать особый случай и вставлять 15:15 в форму
      if (minutes == "00" && hours == "15") {
        res.push({
          selected: "selected",
          value: `15:15`
        });  
      }
      res.push({
        selected: "",
        value: `${hours}:${minutes}`
      });
      sum += hulfHour;
    }
    return res;
  }
  setTimeToCallInput();
  
  function getDateInSPB() {
    let date = new Date();
    return new Date(+date + (date.getTimezoneOffset() + 3 * 60) * 60 * 1000);
  }

  function officeIsWork() {
    let workTime = getWorkTime().split(",");
    let dateInSPB = getDateInSPB();
    let startDate = new Date(2021, 1, 1, workTime[0].split(":")[0], workTime[0].split(":")[1]);
    let endDate = new Date(2021, 1, 1, workTime[1].split(":")[0], workTime[1].split(":")[1]);
    let currentDate = new Date(2021, 1, 1, dateInSPB.getHours(), dateInSPB.getMinutes());

    if (+startDate <= +currentDate && +currentDate <= +endDate) return true;
    return false;
  }

  (() => {
    if (!document.querySelector(".online--work") || !document.querySelector(".online--dont-work")) return;
    let officeDontWork = !officeIsWork();
    if (officeDontWork) {
      document.querySelector(".online--work").classList.add("online--hidden")
      document.querySelector(".online--dont-work").classList.remove("online--hidden")
    }
  })()
  
  document.querySelectorAll(`[data-date-format]`).forEach(el => {
    let updateDate = date => {
      let day = String(date.getDay());
      let m = String(date.getMonth() + 1);
      console.log(date.toString())
      console.log(day, day.length == 1 ? 0 + day : day)
      let parent = el.parentElement;
      el.style.position = "relative";
      el.innerHTML = `${day.length == 1 ? 0 + day : day}.${m.length == 1 ? 0 + m : m}.`;
      return parent;
    }
    let date = new Date();
    let parent = updateDate(date);
    el.insertAdjacentHTML('beforeend', "<input type='date' style='width: 100%; height: 100%; opacity: 0; position: absolute; top: 0; left: 0' />")
    let input = parent.querySelector("input[type='date']")
    console.log(input)
    input.addEventListener("change", () => {
      updateDate(new Date(input.value))
      let d = new Date(input.value)
    })
  });


  // document.querySelectorAll("[data-date-format]").forEach(el => {
  //   el.addEventListener("change", () => {
  //     el.setAttribute("data-date",
  //     moment(el.value, "YYYY-MM-DD")
  //     .format( el.getAttribute("data-date-format") )
  //     )
  //   })
  // })
};
