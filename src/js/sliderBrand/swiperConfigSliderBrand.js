export function swiperConfigSliderBrand() {
  var swiper = new Swiper(".sliderBrand", {
    slidesPerView: "6",
    spaceBetween: 10,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
  });
}
