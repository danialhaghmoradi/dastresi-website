const toPersianDigits = (number) => {
  return number.toLocaleString("fa-IR").replace(/٬/g, ",");
};

const isCountdownFinished = () => {
  const countdownEndTime = localStorage.getItem("countdownEndTime");
  if (!countdownEndTime) return true;
  return Date.now() > Number(countdownEndTime);
};

const productDiscount_col_1 = async () => {
  let productDiscount_col_1 = document.querySelector("#products_col_1");

  try {
    let res = await axios.get("http://localhost:3004/products");
    let discountedProducts = res.data.filter(
      (item) => item.isDiscounted === true
    );
    let col1Products = discountedProducts.slice(0, 2);

    const createProductHTML = (item) => {
      const finished = isCountdownFinished();

      return `
        <div
          class="product w-full bg-white px-2 py-4 text-[16px] rounded-2xl shadow-2xl shadow-[#909090]"
        >
          <img src="${item.image}" alt="" />
          <h3 class="font-shabnam-medium line-clamp-2">
            ${item.name}
          </h3>
          ${
            finished
              ? `<div class="flex justify-center mt-10">
                  <button class="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed" disabled>
                    ناموجود
                  </button>
                </div>`
              : `
                <div class="flex justify-between mt-10 px-2">
                  <span class="line-through font-shabnam-medium">${toPersianDigits(
                    item.price
                  )}</span>
                  <span class="text-[#FE5F55] font-shabnam-medium">  ${toPersianDigits(
                    item.discountPrice
                  )}
                    تومان تخفیف</span>
                </div>
                <div class="flex items-center justify-end font-shabnam-medium font-bold text-[18px] text-[#0A5ABD] px-2">
                 ${toPersianDigits(item.price - item.discountPrice)}
                  <span class="text-[#545C5C] font-normal pr-2 text-[14px]"> تومان </span>
                </div>
              `
          }
        </div>`;
    };

    productDiscount_col_1.innerHTML = col1Products
      .map(createProductHTML)
      .join(" ");
  } catch (error) {
    console.log(error.message);
  }
};

const productDiscount_col_2 = async () => {
  let productDiscount_col_2 = document.querySelector("#products_col_2");
  try {
    let res = await axios.get("http://localhost:3004/products");
    let discountedProducts = res.data.filter(
      (item) => item.isDiscounted === true
    );
    let col2Products = discountedProducts.slice(2, 5);

    const createProductHTML = (item) => {
      const finished = isCountdownFinished();

      return `
        <div
          class="product flex flex-row bg-white px-2 text-[16px] rounded-2xl shadow-2xl shadow-[#909090]"
        >
          <img
            src="${item.image}"
            alt="product"
            class="w-40 mx-auto rounded-r-xl"
          />

          <div>
            <h3 class="font-shabnam-medium line-clamp-2">
              ${item.name}
            </h3>
            ${
              finished
                ? `<div class="flex justify-center mt-5">
                    <button class="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed" disabled>
                      ناموجود
                    </button>
                  </div>`
                : `
                  <div class="w-full flex items-start mt-5">
                    <span class="line-through font-shabnam-medium text-[15px]">
                      ${toPersianDigits(item.price)}
                    </span>
                    <span
                      class="text-[#FE5F55] font-shabnam-medium text-[16px] px-2"
                    >
                      ${toPersianDigits(item.discountPrice)}
                    تومان <br/> تخفیف
                    </span>
                  </div>
                  <div
                    class="flex items-center justify-end font-shabnam-medium font-bold text-[18px] text-[#0A5ABD] px-2"
                  >
                    ${toPersianDigits(item.price - item.discountPrice)}
                    <span class="text-[#545C5C] font-normal pr-2 text-[14px]"> تومان </span>
                  </div>`
            }
          </div>
        </div>`;
    };

    productDiscount_col_2.innerHTML = col2Products
      .map(createProductHTML)
      .join(" ");
  } catch (error) {
    console.log(error.message);
  }
};

export { productDiscount_col_1, productDiscount_col_2 };
