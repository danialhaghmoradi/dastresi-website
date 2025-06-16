export function swiperConfigBestSellingSlider() {
  var swiper = new Swiper(".mybestsellingproducts", {
    slidesPerView: "4",
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
