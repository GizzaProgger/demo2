const modalsFactory = () => {
  let object = {
    closeSelector: "",
    observers: [],
    init(config) {
      self.closeSelector = config.closeSelector;
      document.querySelectorAll("[data-open-modal]").forEach(self.initHandlerOpen);
      document.querySelectorAll(self.closeSelector).forEach(element => {
        let parentModal = self.getParentModal(element);
        if (parentModal) {
          element.addEventListener("click", () => self.closeModal(parentModal));
        }
      });
      self.closeModalAfterWrapClick(".lbock_bg");
      self.closeModalAfterWrapClick(".modal-wrappper");
      return self;
    },
    initHandlerOpen(node) {
      node.addEventListener("click", e => {
        e.preventDefault();
        self.openModal(node.dataset.openModal);
      })
    },
    closeModalAfterWrapClick(wrap) {
      document.querySelectorAll(wrap).forEach(el => {
        el.addEventListener("click", e => {
          if (e.target === el) {
            self.closeModal(el.parentElement.parentElement);
            self.closeModal(el.parentElement);
          }
        })
      })
    },
    openModal(selector) {
      let modal = document.querySelector([`[data-modal-name=${selector}`]) || document.querySelector(selector);
      modal.classList.add("modal--open");
      document.body.style.overflow = "hidden";
    },
    onMutation(mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type === "attributes" && mutation.attributeName === "data-open-modal") {
          self.initHandlerOpen(mutation.target);
        }
      }
    },
    closeModal(modal) {
      modal.classList.remove("modal--open");
      document.body.style.overflow = "auto";
    },
    getParentModal(children) {
      if (!children) return;
      if (children.classList.contains("modal")) return children;
      return self.getParentModal(children.parentElement)
    },
  }
  let self = object;
  return object;
};
export default modalsFactory();
