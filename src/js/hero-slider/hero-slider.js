const heroSlider = async () => {
  let slider = "";
  let swipersliderhero = document.querySelector(".swiper-wrapper");
  try {
    let res = await axios.get("http://localhost:3004/slider");
    slider = res.data
      .map((item) => {
        return `<div class="swiper-slide  "><img src="${item.image}" alt="${item.name}"></div>`;
      })
      .join(" ");
  } catch (error) {
    console.log(error.message);
  }
  swipersliderhero.innerHTML = slider;
};
export default heroSlider;
