export function swiperConfigSliderCategories() {
  var swiper = new Swiper(".sliderCategories", {
    slidesPerView: "6",
    spaceBetween: 20,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
  });
}
