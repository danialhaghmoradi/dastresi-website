import header from "../header/header.js";
import menu from "../menu/Menu.js";
import { getQueryParam } from "../utils/helpers.js";

const toPersianDigits = (number) => {
  return number.toLocaleString("fa-IR").replace(/٬/g, ",");
};

const loadCategoryPage = async () => {
  const categoryName = getQueryParam("name");
  document.getElementById("category-title").innerText = categoryName;

  try {
    const res = await axios.get(
      `http://localhost:3004/products?category=${encodeURIComponent(
        categoryName
      )}`
    );
    const products = res.data;
    const container = document.getElementById("products-container");

    if (products.length === 0) {
      container.innerHTML = `
        <p class="text-center col-span-full text-gray-500">
          محصولی یافت نشد.
        </p>`;
      return;
    }

    const html = products
      .map((item) => {
        const priceSection = `
          <div class="font-shabnam-medium flex items-center justify-end gap-2 text-[20px] text-[#0951AA] pt-5 text-end">
            ${toPersianDigits(item.price)}
            <span class="text-[18px] text-[#828282]">تومان</span>
          </div>
        `;

        return `
          <div class="swiper-slide rounded-2xl shadow-2xl">
            <a class="block" href="product.html?id=${item.id}">
              <div class="p-4 rounded-2xl bg-white">
                <div class="w-full flex justify-end">
                  <div
                    class="w-[15px] h-[15px] rounded-full"
                    style="background-color: ${item.colors};"
                  ></div>
                </div>
                <img src="${item.image}" alt="${item.name}" />
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

    container.innerHTML = html;
  } catch (err) {
    console.error("خطا در دریافت محصولات دسته:", err.message);
    document.getElementById("products-container").innerHTML = `
      <p class="text-center col-span-full text-red-500">
        خطا در بارگذاری محصولات. لطفاً دوباره تلاش کنید.
      </p>`;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  header();
  menu();
  loadCategoryPage();
});
