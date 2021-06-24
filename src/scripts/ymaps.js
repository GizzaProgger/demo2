export default () => {
  const yMapsPlacemarkers = [];
  if (ymaps) {
    ymaps.ready(init);
    function init() {
      if(window.innerWidth < 768) {
        var myMap = new ymaps.Map('map-adult', {
          center: [59.9322873752093, 30.361370919607534],
          controls: ['zoomControl'],
          zoom: 10,
        });
      } else {
        var myMap = new ymaps.Map('map-adult', {
          center: [59.9322873752093, 30.361370919607534],
          zoom: 10,
        });
      }
      function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
      }
      httpGetAsync("https://chicaga.ru/rest/ScholsInfo", e => {
        let r = JSON.parse(e);
        let scools = JSON.parse(r.object);
        scools.forEach(data => {
          let placemark = new ymaps.Placemark([data.lat, data.lng], {
            balloonContent: `  
              <div class="div-location">
                <img src="https://uploads-ssl.webflow.com/605b19076a686a415c04845f/6098800891abe5c248189f08_ozerki.png" loading="lazy" alt="">
                <div class="location">${data.title}</div>
                <div class="address_location">${data.address}</div>
                <div class="text-dop-location">5 минут ходьбы от <span class="text-span-blue-location">ст. м. Озерки</span></div>
                <div class="text-block-contact">${data.phone}</div>
                <div class="location-indicator"></div>
                <div class="block-location-indicator">
                  <div data-open-modal="enter-map" data-photo-url="https://chicaga.ru/${data.file}">Место входа на карте</div>
                </div>
              </div>
                  `
          }, {
            iconLayout: 'default#image',
            iconImageHref: 'https://chicaga.ru/sharedFiles/imgs/location.png',
            iconImageSize: [36, 36],
            hideIconOnBalloonOpen: false,
            balloonOffset: [0, -44],
          });
          yMapsPlacemarkers.push({
            id: data.MIGX_id,
            placemark
          });
          myMap.geoObjects.add(placemark);
        });
        myMap.geoObjects.events.add('click', clickOnPlacemark);
        function clickOnPlacemark(e) {
          // myMap.setZoom(13, {
          //   smooth: true
          // });
          document.querySelectorAll(".active__placemark").forEach(el => el.classList.remove("active__placemark"))
          let _this = e.get('target').getOverlaySync().getLayoutSync().getElement(); // Родительский контейнер html.
          let pinner = _this.children[0]; // Вложенный элемент.
          $(pinner).addClass('active__placemark');
          setTimeout(initModalMap, 100)
        }
      })
    }
  }

  function initModalMap() {
    document.querySelectorAll("[data-photo-url]").forEach(el => {
      el.addEventListener("click", () => {
        document.querySelector(".modal-enter img").src = el.dataset.photoUrl;
      })
    })
  }
  initModalMap()
}