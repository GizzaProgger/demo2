const videoObjFactory = () => {
  let o = {
    init() {
      if (!document.querySelectorAll("[data-set-video]")) return
      document.querySelectorAll("[data-set-video]").forEach(el => {
        el.addEventListener("click", e => {
          console.log(el.dataset.setVideo)
          document.querySelector(".player video").setAttribute("src", el.dataset.setVideo)
        })
      })
      if (!document.querySelector(".player")) return;
      document.querySelector(".player").addEventListener("click", e => {
        let container = document.querySelector(".player");
        let media = container.querySelector("video");
        if (e.target.tagName.toLowerCase() == "video") {
          container.querySelector(".play-pause").style.opacity = Number(!media.paused);
          console.log(!media.paused)
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
    }
  }
  return o;
}

export default videoObjFactory();