const arrivalsslider = async (params) => {
  const toPersianDigits = (number) => {
    return number.toLocaleString("fa-IR").replace(/٬/g, ",");
  };
  function shuffleArray(array) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
  let slide = "";
  let swipersliderarrivalsslider = document.querySelector(
    ".myarrivalssliderswapper"
  );
  try {
    const res = await axios.get("http://localhost:3004/products");

    const now = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(now.getDate() - 3);

    let newproducts = shuffleArray(
      res.data.filter((item) => {
        const createdAt = new Date(item.createdAt);
        return createdAt >= threeDaysAgo;
      })
    );

    slide = newproducts
      .map((item) => {
        const isAvailable = item.count > 0;
        let priceSection = "";
        if (!isAvailable) {
          priceSection = `
            <div class="text-[#9B2C2C] p-2 mt-3 bg-[#E5DCDC] font-shabnam-medium text-[16px]  text-center">
              ناموجود
            </div>
          `;
        } else if (item.isDiscounted === true) {
          priceSection = `
            <div class="font-shabnam-medium text-[14px] line-through text-[#828282] text-end">
              ${toPersianDigits(item.price)}
            </div>
            <div class="font-shabnam-medium flex items-center justify-end gap-2 text-[20px] text-[#0951AA] text-end">
              ${toPersianDigits(item.price - item.discountPrice)}
              <span class="text-[18px] text-[#828282]">تومان</span>
            </div>
          `;
        } else {
          priceSection = `
            <div class="font-shabnam-medium flex items-center justify-end gap-2 text-[20px] text-[#0951AA] pt-5 text-end">
             ${toPersianDigits(item.price)}
              <span class="text-[18px] text-[#828282]">تومان</span>
            </div>
          `;
        }

        return `
          <div class="swiper-slide rounded-2xl shadow-2xl">
            <a class="block" href="#">
              <div class="p-4 rounded-2xl bg-white">
           <div class="w-full flex justify-end">
             <div
                class="w-[15px] h-[15px] rounded-full"
              style="background-color: ${item.colors};"
            ></div>
            </div>
                <img src="${item.image}" alt="" />
                <div class="line-clamp-1 font-shabnam-medium text-[14px] text-[#1F1F1F] pt-2 px-4">
                  ${item.name}
                </div>
                ${priceSection}
              </div>
            </a>
          </div>
        `;
      })
      .join("");
  } catch (error) {
    console.log(error.message);
  }

  swipersliderarrivalsslider.innerHTML = slide;
};
export default arrivalsslider;
