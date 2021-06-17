import { tns } from "tiny-slider/src/tiny-slider"

const slidersFactory = () => {
  let o = {
    init() {
      self.photoSlider = tns({
        container: ".slider-photo",
        items: 1,
        center: true,
        gutter: 30,
        prevButton: ".slider-foto-schools [data-slider-prev]",
        nextButton: ".slider-foto-schools [data-slider-next]",
        controlsContainer: ".photo-slider__nav"
      })
      self.autoPlayWhileNotClicked(self.photoSlider);
      self.reviewsSlider = tns({
        container: ".reviews-slider",
        controlsContainer: ".reviews__nav",
        nav: false,
        items: 1
      })
      return self;
    },
    initNavs(slider) {
      let parent = slider.carouselElement.parentElement; 
      let next = parent.querySelector("[data-slider-next]");
      let back = parent.querySelector("[data-slider-back]");
      if (next) {
        next.addEventListener("click", () => slider.next());
      }
      if (back) {
        back.addEventListener("click", () => slider.prev());
      }
      return self;
    },
    autoPlayWhileNotClicked(slider, interval = 5000) {
      if (!slider) return;
      let iId = setInterval(() => {
        slider.goTo("next")
      }, interval);
      slider.getInfo().container.addEventListener("click", () => {
        clearInterval(iId);
      })
    }
  }
  let self = o;
  return o;
}

export default () => {
  return slidersFactory().init();
}