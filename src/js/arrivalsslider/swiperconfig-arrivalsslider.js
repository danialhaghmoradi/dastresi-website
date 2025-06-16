export function swiperConfigArrivalsSlider() {
  var swiper = new Swiper(".myarrivalsslider", {
    slidesPerView: 4,
    spaceBetween: 20,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
