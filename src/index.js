import styles from "/src/styles/main.scss";

import OutherInit from "/src/scripts/outher.js";
import { Quiz, resultsTexts, levels } from "/src/scripts/quiz.js";
import Tip from "/src/scripts/tip.js";
import Video from "/src/scripts/video.js";
import Modals from "/src/scripts/modals.js";
import Observer from "/src/scripts/observer.js";
import SlidersInit from "/src/scripts/slidersInit.js";
import FormInit from "/src/scripts/sendForm.js";
import Sound from "/src/scripts/sound_script";

import HTMLVars from "/src/scripts/HTMLVars"

import YmapsInit from "/src/scripts/ymaps"


document.addEventListener("DOMContentLoaded", () => {
  YmapsInit();
  OutherInit();
  Tip.init();
  Video.init();

  Quiz.init("#email-form-3", {
    resultsTexts,
    levels
  });

  let modals = Modals.init({
    closeSelector: ".closure_link"
  });

  Observer.init([
    Modals.onMutation || (() => {}),
    Tip.onMutation || (() => {}),
    Video.onMutation || (() => {}),
    Quiz.onMutation || (() => {}),
    Quiz.onMutation || (() => {}),
  ]);

  SlidersInit();
  FormInit();
  Sound();
  // let exitModalDontOpened = !getCookie("exit-modal-opened");
  // document.addEventListener("mouseout", e => {
  //   if (exitModalDontOpened && !e.relatedTarget) {
  //     exitModalDontOpened = false;
  //     modals.openModal("exit");
  //     setCookie("exit-model-opened", true);
  //   }
  // })


  let initTabModules = () => {
    if (!document.querySelectorAll(".link-next-moduls").forEach) return
    document.querySelectorAll(".link-next-moduls").forEach(el => {
      el.addEventListener("click", e => {
        e.preventDefault();
        let i = getSlideIndex(".tabs-menu-modules .w--current", ".tab-link-modules", "next");
        document.querySelectorAll(".tab-link-modules")[i].click()
      })
    })
  }
  initTabModules();

  (() => {
    if (!document.querySelector(".section-teachers .tab-next")) return
    document.querySelector(".section-teachers .tab-next").addEventListener("click", () => {
      let i = getSlideIndex(".section-teachers .w--current", ".tab-link", "next");
      document.querySelectorAll(".tab-link")[i].click()
    })
  })()

  let initTabPrev = () => {
    if (!document.querySelector(".section-teachers .tab-prev")) return
    document.querySelector(".section-teachers .tab-prev").addEventListener("click", () => {
      let i = getSlideIndex(".section-teachers .w--current", ".tab-link", "back");
      document.querySelectorAll(".tab-link")[i].click()
    })
  }
  initTabPrev();

  function getSlideIndex(activeSelector, selector, direction) {
      let numElems = document.querySelectorAll(selector).length
      if (direction == "next") direction = 1
      else direction = numElems - 1
      let i = (direction + getNodeIndex(document.querySelector(activeSelector)) / 2) % numElems;
      console.log(direction + getNodeIndex(document.querySelector(activeSelector)))
      return i
  }

  let observer = new MutationObserver(m => {
    for (const key in m) {
      let el = m[key];
      if (el && el.target.classList && el.target.classList.contains("w--current") && el.attributeName == "class") {
        let indexInParent = getNodeIndex(el.target) / 2;
        document.querySelector(".div-relativ_rezult--active").classList.remove("div-relativ_rezult--active")
        document.querySelectorAll(".div-relativ_rezult")[indexInParent].classList.add("div-relativ_rezult--active")
        let moduleNum = indexInParent > 3 ? indexInParent : indexInParent + 1
        let inner = `Ваш результат модуля ${moduleNum}`
        if (indexInParent == "3") inner = "Ваш результат секретного модуля";
        document.querySelector(".result").innerHTML = inner;
      }
    }
  });
  document.querySelectorAll(".tab-link-modules").forEach(el => {
    observer.observe(el, {
      attributes: true
    })  
  })

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  params.vars.split("~").forEach(v => {
    v = HTMLVars.getArr(v)
    HTMLVars.insertVar(v[0], v[1]);
  });
  params.if.split("~").forEach(v => {
    v = HTMLVars.getArr(v)
    HTMLVars.showIf(v[0], v[1])
  })

  // document.querySelectorAll(".pulse").forEach(el => {
  //   let video;
  //   try {
  //     if (el.previousElementSibling.tagName.toLowerCase() == "video") {
  //       video = el.nextSibling;
  //     } 
  //   } catch(e) {}
  //   try {
  //     if (el.previousElementSibling.tagName.toLowerCase() == "video") {
  //       video = el.previousElementSibling;
  //     }
  //   } catch(e) {}
  //   try {
  //     console.log(video)
  //     video.addEventListener("play", () => el.style.opacity = 0);
  //     video.addEventListener("pause", () => el.style.opacity = 1);
  //     video.addEventListener("ended", () => el.style.opacity = 1);
  //   } catch(e) {}
  // })
});

function getNodeIndex(child) {
  let i = 0;
  while( (child = child.previousSibling) != null ) {
    i++;
  }
  return i - 1;
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}