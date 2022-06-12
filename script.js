var vue = new Vue({
  el: '#app',
  data: {
    feedbacks: null,
    item: null
  },
  mounted() {

    axios.get('https://rest.bellavka.by/api/v1/feedbacks?type=review&product=57791673&include=answers,characteristics', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: {}
      })
      .then(response => (this.feedbacks = response.data.data));
    axios.get('https://rest.bellavka.by/api/v1/products/57791673?include=brand,category,collections,colors,fabrics,heights,kits,season,sizes,photos,videos,styles', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: {}
      })
      .then(response => (this.item = response.data.data));
  },
});

$(document).ready(function () {
  $('.slider__items_height').slick({
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false
  });
  $('.slider__items_recent').slick({
    infinite: true,
    slidesToShow: 2,
    arrows: false,
    speed: 300,
  });
});
axios.get('https://rest.bellavka.by/api/v1/products/57791673?include=brand,category,collections,colors,fabrics,heights,kits,season,sizes,photos,videos,styles', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: {}
  })
  .then(function (response) {
    let imgsrc = response.data.data.photos;
    let sizes = response.data.data.sizes;
    let arr = [];
    sizes.forEach(size => {
      arr.push(size.value)
    });
    const ownSize = new Set(arr);
    let headerSlider = document.getElementById("header-slider");
    let sizeSlider = document.getElementById("size-slider");
    ownSize.forEach(e => sizeSlider.innerHTML += `<div class="slider__item"><span>${e}</span></div>`);
    $('#size-slider').slick({
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: false,
      speed: 300,
    });
    imgsrc.forEach(e => headerSlider.innerHTML += `<div class="itcss__item"><img src="${e}" alt="#"></div>`);
    $('#header-slider').slick({
      infinite: true,
      slidesToShow: 1,
      arrows: false,
      speed: 300,
      dots: true
    });
  })
