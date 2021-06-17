const videoObjFactory = () => {
  let o = {
    init() {
      if (!document.querySelectorAll("[data-set-video]")) return
      document.querySelectorAll("[data-set-video]").forEach(el => {
        el.addEventListener("click", e => {
          console.log(el.dataset.setVideo)
          document.querySelector(".block-lbock_video video").setAttribute("src", el.dataset.setVideo)
        })
      })
      document.querySelectorAll(".player").forEach(container => {
        container.addEventListener("click", e => {
          let media = container.querySelector("video");
          if (e.target.tagName.toLowerCase() == "video") {
            container.querySelector(".play-pause").style.opacity = Number(!media.paused);
            return
          };
          if (media.paused) {
            container.querySelector(".play-pause").style.opacity = "0";
            media.play();
          } else {
            media.pause();
          }
          media.addEventListener("pause", () => {
            container.querySelector(".play-pause").style.opacity = "1";
          })
        })
      })
    }
  }
  return o;
}

export default videoObjFactory();