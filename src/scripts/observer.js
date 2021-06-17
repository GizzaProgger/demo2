// Данный объект нужен, чтобы каждый модуль не следил в отдельности за Dom
// Он помогает уменьшить нагрузку
export default {
  observer: "",
  callbacks: [],
  config: {
    attributes: true,
    childList: true,
    subtree: true
  },
  init(callbacks) {
    this.callbacks = callbacks;
    if (!document.querySelectorAll("*")) return;
    this.setObserver();
    document.querySelectorAll("*").forEach(e => {
      this.observer.observe(e, this.config);
    });
  },
  setObserver() {
    this.observer = new MutationObserver((mutationsList, observer) => {
      this.callbacks.forEach(callback => callback(mutationsList, observer));
    });
  }
}