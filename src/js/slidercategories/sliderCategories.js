const sliderCategories = async () => {
  let slide = "";
  let swiperSliderCategories = document.getElementById("swiper-wrapper-slideCategories");
  try {
    let res = await axios.get("http://localhost:3004/sliderCategories");
    slide = res.data
      .map((item) => {
        return `<div class="swiper-slide">
        <a href="#">
        <img class='w-[10px] h-[10px]' src="${item.image}" alt="${item.name}">
        </a>
        </div>`
      })
      .join(" ");
  } catch (error) {
    console.log(error.message);
  }
  swiperSliderCategories.innerHTML = slide;
};
export default sliderCategories;
