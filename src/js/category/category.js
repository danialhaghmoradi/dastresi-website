import header from "../header/header.js";
import menu from "../menu/Menu.js";
import { getQueryParam } from "../utils/helpers.js";

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
    container.innerHTML = "";

    if (products.length === 0) {
      container.innerHTML = `<p class="text-center col-span-full text-gray-500">محصولی یافت نشد.</p>`;
      return;
    }

    products.forEach((product) => {
      container.innerHTML += `
        <div class="bg-white border rounded-lg shadow p-3 hover:shadow-lg transition">
          <img src="${
            product.image
          }" class="w-full h-40 object-cover mb-2 rounded" />
          <h2 class="text-sm font-semibold">${product.name}</h2>
          <p class="text-red-600 font-bold mt-1">${product.price.toLocaleString()} تومان</p>
        </div>
      `;
    });
  } catch (err) {
    console.error("خطا در دریافت محصولات دسته:", err.message);
  }
};
document.addEventListener("DOMContentLoaded", () => {
  header();
  menu();
  loadCategoryPage();
});

export default loadCategoryPage;
