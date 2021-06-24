const videoObjFactory = () => {
  let o = {
    init() {
      if (!document.querySelectorAll("[data-set-video]")) return
      document.querySelectorAll("[data-set-video]").forEach(el => {
        el.addEventListener("click", e => {
          let selector = el.dataset.selector || ".modal-player video";
          let video = document.querySelector(selector);
          if (!video.getAttribute("poster")) video.setAttribute("poster", el.dataset.poster || "");
          if (video.getAttribute("src") != el.dataset.setVideo) {
            if (!video.getAttribute("poster")) video.currentTime = 2;
            video.setAttribute("src", el.dataset.setVideo);
          }
          document.querySelector(".modal-player .modal-wrappper").addEventListener("click", e => {
            if (e.target.classList.contains("modal-wrappper") || e.target.classList.contains("closure_link")) {
              video.pause();
            }
          })
        })
      })
      let firstClick = true;
      document.querySelectorAll(".player").forEach(container => {
        container.addEventListener("click", e => {
          let media = container.querySelector("video");
          if (firstClick) {
            media.currentTime = 0;
            firstClick = false;
          }
          media.addEventListener("pause", () => {
            container.querySelector(".play-pause").style.opacity = "1";
          })
          media.addEventListener("play", () => {
            container.querySelector(".play-pause").style.opacity = "0";
          })
        })
        container.querySelector(".play-pause").addEventListener("click", () => {
          let video = container.querySelector("video");
          if (video.paused) {
            video.play()
          } else {
            video.pause()
          }
        })
      })
    }
  }
  return o;
}

export default videoObjFactory();