let resultsTexts = {
  1: {
    top: `
    Прекрасно, что вы только начинаете изучать язык!
    <br><br>
    Вам подойдет стандартный курс английского языка для взрослых с нуля.
    <br><br>
    После него вы сможете говорить на английском. Пока простыми предложениями – достаточными, чтобы рассказать о себе, узнать дорогу в поездке за границей, понять основной смысл разговора.
    <br>
    <br>
    `,
    list: `
    <li class="list-item-sait">
      <div class="text-list">и даже можно посетить бесплатно 3 пробных занятия<br>на разных курсах: стандартный, разговорный и т. д.</div>
    </li>
    `
  },
  2: {
    top: `
    Обучение деловому английскому языку поможет вам общаться на профессиональные темы и уверенно чувствовать себя в англоязычной среде.
    <br><br>
    Курс «Business English» рассчитан на уровень Intermediate и выше. Если уровень ниже, рекомендуем сначала пройти базовый курс английского языка. 
    <br>
    <br>
    `,
  },
  3: {
    top: `
    Для подготовки к международным экзаменам IELTS, TOEFL и Cambridge English должен быть уровень английского языка не ниже Intermediate. 
    <br><br>
    Чаще всего выбирают индивидуальные занятия для максимально эффективной подготовки к экзамену .
    <br><br>
    `
  },
  4: {
    top: `
    При хорошем знании английского рекомендуем взрослым занятия с носителем. 
    <br><br>
    Общение в непринужденной обстановке с опытным преподавателем поможет быстро преодолеть языковой барьер, расширить словарный запас и улучшить произношение.
    <br><br>
    `,
    list: `
    <li class="list-item-sait">
      <div class="text-list">и даже можно посетить бесплатно 3 пробных занятия на разных курсах: стандартный, разговорный и т. д.</div>
    </li>
    `
  },
  5: {
    top: `
    Улучшить произношение помогут занятия с носителем или фонетический курс.
    <br><br>
    Этот курс анлийского предназначен для начинающих взрослых и для тех, кто хочет исправить ошибки в произношении. Он поможет поставить правильное британское или американское произношение.
    <br><br>
    `,
  },
  6: {
    top: `
    Курс для студентов подойдет учащимся с базовым уровнем английского, а также для подготовки к учебе и стажировке за границей, к работе в международных компаниях.
    <br><br>
    На занятиях вы научитесь грамотно говорить и писать, читать профессиональную литературу и делать резюме прочитанного, уверенно общаться с носителями языка.
    <br><br>
    `,
  },
  7: {
    top: `
    Для IT-специалистов есть специальный курс английского. Он рассчитан на уровень Intermediate и выше. Если уровень ниже, рекомендуем сначала пройти стандартный курс. 
    <br><br>
    `,
  },
  8: {
    top: `
    Если вам нужно за 1–2 месяца получить базовые знания или быстро перейти на следующий уровень владения английским языком, вам подойдет интенсивный курс.
    <br><br>
    Ежедневные занятия помогают погрузиться в языковую среду и начать не только говорить, а еще и думать на английском.
    <br><br>
    `,
  },
  default: {
    top: `
    Оптимальный вариант – стандартный курс английского языка для взрослых. На нем вы научитесь разговаривать, читать, писать и понимать иностранцев. 
    <br><br>
    На занятиях вы будете слушать песни и записи носителей с британским и американским акцентами, смотреть отрывки из фильмов, играть в разговорные игры.
    `,
    list: `
    <li class="list-item-sait">
      <div class="text-list">и даже можно посетить бесплатно 3 пробных занятия</div>
    </li>
    <li class="list-item-sait">
      <div class="text-list">на разных курсах: стандартный, разговорный и т. д.</div>
    </li>
    `
  },
}

let levels = {
  1: "8, 9",
  2: "2, 19",
  3: 5,
  4: "10, 11",
  5: 17,
  6: 18,
  7: 20,
  8: 23
}

let Quiz = {
  currentStep: 1,
  block: null,
  numberSteps: 1,
  resultsTexts: {},
  levels: {},
  init(selector, { resultsTexts, levels }) {
    this.resultsTexts = resultsTexts;
    this.levels = levels;
    this.block = document.querySelector(`${selector}`);
    if (!this.block) return;
    this.setNumberSteps();
    if (!document.querySelector(`${selector} .block-button .button`)) return
    document.querySelector(`${selector} .block-button .button`)
      .addEventListener("click", e => {
        this.goToNextStep();
      })
    this.selectingInit();
  },
  goToNextStep() {
    if (this.currentStep == this.numberSteps) this.finish();
    if (this.currentStep >= this.numberSteps) return;
    this.currentStep++;
    this.updateBlock();
    this.updateProgressbar();
    if (this.getPercentCompleted() > 45) this.changeProgressBarColor("#fff");
    if (this.currentStep == this.numberSteps) this.setBeforeFinalView();
  },
  updateBlock() {
    if (!this.block.querySelectorAll(".form-block-choice-block")) return;
    this.block.querySelectorAll(".form-block-choice-block").forEach(e => {
      e.classList.remove("form-block-choice-block--active")
    });
    if (!this.block.querySelector(`.form-block-choice-block:nth-child(${this.currentStep})`)) return
    this.block.querySelector(`.form-block-choice-block:nth-child(${this.currentStep})`)
      .classList.add("form-block-choice-block--active");
  },
  updateProgressbar() {
    if (!this.block.querySelector(".bar-choice")) return;
    this.block.querySelector(".bar-choice").style.width = this.getPercentCompleted() + "%";
    if (!this.block.querySelector(".current_step")) return;
    this.block.querySelector(".current_step").innerHTML = `${this.currentStep} из ${this.numberSteps}`
  },
  finish() {
    let level = this.getLevel();
    console.log(level)
    this.updateResultsModal(level);
  },
  updateResultsModal(vars) {
    for (const key in vars) {
      this.setHtmlInsteadEl(key, vars[key]);
    }
  },
  setHtmlInsteadEl(name, html) {
    let el = document.querySelector(`[data-js-var='${name}']`);
    el.insertAdjacentHTML("afterend", html);
    el.remove();
  },
  getLevel() {
    let res = [];
    this.block.querySelectorAll("input").forEach((inp, i) => {
      if (inp.checked) {
        console.log(inp.parentNode.querySelector(".w-form-label").innerHTML)
        let levels = Object.values(this.levels);
        res.push(
          levels.findIndex(item => {
            return String(item).split(",").find(itemI => String(itemI) == String(i + 1))
          })
        )
      }
    });
    let firstIndex = res.filter(r => r != -1)[0];
    let level = this.resultsTexts[Object.keys(this.levels)[firstIndex]]
    console.log(res)
    return level || this.resultsTexts.default;
  },
  getPercentCompleted() {
    let percent;
    if (this.currentStep === 1) percent = 21;
    else if (this.currentStep === 2) percent = 36;
    else percent = (100 / this.numberSteps) * this.currentStep;
    return percent; 
  },
  setBeforeFinalView() {
    document.querySelector(".block-button .button").innerHTML = `
      Узнать свой идеальный формат
      <br>
      и получить подарок
    `;
    document.querySelector(".block-button .button").dataset.openModal = "finish-qiuz";
  },
  changeProgressBarColor(color) {
    this.block.querySelector(".current_step").style.color = color;
  },
  setNumberSteps() {
    this.numberSteps = this.block.querySelector(".quiz-steps").children.length;
  },
  selectingInit() {
    let setView = (parent, val) => parent.querySelector(".dynamic").style = `opacity: ${val ? "1" : "0"};`
    document.querySelectorAll(".quiz .w-checkbox").forEach(el => {
      el.addEventListener("click", e => {
        let parent = el.parentElement.parentElement;
        parent.querySelectorAll("input").forEach((e, i) => {
          setView(e.parentElement, e.checked);
        })
      })
    })
  }
}


export { Quiz, resultsTexts, levels };