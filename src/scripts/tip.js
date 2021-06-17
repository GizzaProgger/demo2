// Если хочешь, чтобы при наведении на элемент появлялась подсказка,
// то на него вешай data-tip="Какой-то html"
const tipFactory = () => {
  let o = {
    init() {
      self.appendTipToPage();
      document.querySelectorAll("[data-tip]").forEach(el => {
        el.addEventListener("mouseover", e => self.showTip(el, el.dataset.tip));
        el.addEventListener("mouseout", self.hiddenTip)
      }) 
    },
    showTip(el, text) {
      let tip = document.querySelector(".div-hint");
      tip.querySelector(".text-hint").innerHTML = text;
      let box = el.getBoundingClientRect();
      tip.style.left = box.x + box.width / 2 - tip.getBoundingClientRect().width / 2 + "px";
      let top = box.bottom;
      if (top + tip.getBoundingClientRect().height > window.innerHeight) {
        top -= top + tip.getBoundingClientRect().height - window.innerHeight + 10;
      }
      tip.style.top = top + "px";
      tip.classList.add("div-hint--active");
    },
    hiddenTip() {
      document.querySelector(".div-hint").classList.remove("div-hint--active")
    },
    appendTipToPage() {
      let tip = `
      <div class="div-hint">
        <div class="text-hint"></div>
        <div class="point-block-hint"></div>
      </div>
      `;
      document.body.insertAdjacentHTML("beforeend", tip);
    }
  };
  let self = o;
  return o;
}

export default tipFactory();