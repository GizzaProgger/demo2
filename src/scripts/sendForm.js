import { transliterate  } from 'transliteration';

const formFactory = () => {
  let o = {
    init() {
      document.querySelectorAll("form[data-name]").forEach(form => {
        form.addEventListener("submit", async e => {
          e.preventDefault();
          let msg = self.msgFromForm(form);
          let formData = new FormData();
          formData.append('auth_token', "qz_BX&f-~QEta'kl:H+3Qsc$*Q'/kvjDsdfdf3AETdOMr'z}[(<F2q8,]<*e?P:]Mf");
          formData.append('label', "Заявка с сайта");
          formData.append('msg', msg);
          let r = await fetch("https://chicaga.ru/rest/mail", {
            method: "POST",
            body: formData
          });
          
          r = await r.json();
          if (form.dataset.redirectTo) {
            location.href = `${form.dataset.redirectTo}?${transliterate(self.getQuery(form)).toLowerCase()}&vars=${self.getUrlVars(form)}~${form.dataset.jsVars}&if=${form.dataset.ifUrl}` ;
          } else if(r.object) {
            alert(String(r.object))
          }
        })
      })
    },
    msgFromForm(form) {
      let msg = "Заявка со страницы:" + location.href;
      let formTitle = form.dataset.name;
      if (formTitle) msg += `название формы ${formTitle}<br><br>`;
      form.querySelectorAll("input, select, textarea").forEach(el => {
        let label = el.dataset.name || el.dataset.label;
        if (!label) return;
        msg += `${label}: ${el.value}<br>`;
      })
      return msg;
    },
    getQuery(form) {
      let q = ""
      form.querySelectorAll("input, select, textarea").forEach(el => {
        let label = el.dataset.name || el.dataset.label;
        if (!label) return;
        q += `${label}=${el.value}&`;
      })
      return q;
    },
    getUrlVars(form) {
      let acc = "";
      form.querySelectorAll("[data-js-var-url]").forEach(v => {
        acc += `${v.dataset.jsVarUrl}:${v.value}~`;
      });
      return acc.slice(0, acc.length - 1);
    }
  }
  let self = o;
  return o;
}

export default () => {
  formFactory().init();
}