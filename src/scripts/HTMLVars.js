export default {
  insertVar: (name, html) => {
    let el = document.querySelector(`[data-js-var='${name}']`);
    if (!el || html == undefined || html == null) return;
    el.insertAdjacentHTML("afterend", html);
    el.remove();
  },
  showIf: (name, condition) => {
    let el = document.querySelector(`[data-if='${name}']`)
    condition = condition == "true" || condition === true;
    console.log(condition)
    if (!el) return;
    if (!condition) el.remove();
  },
  getArr(string) {
    return [string.split(":")[0], string.split(":")[1]] 
  }
}