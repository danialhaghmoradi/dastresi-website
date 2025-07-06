import header from "./header/header";
import menu from "./menu/Menu";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// translate color
const colorTranslations = {
  black: "مشکی",
  white: "سفید",
  orange: "نارنجی",
  red: "قرمز",
  green: "سبز",
  blue: "آبی",
  yellow: "زرد",
  pink: "صورتی",
  gray: "خاکستری",
  purple: "بنفش",
  brown: "قهوه‌ای",
};

// update select color
const updateSelectedColor = (color) => {
  const circle = document.getElementById("color-circle");
  const name = document.getElementById("color-name");
  if (!circle || !name) {
    console.warn("المان‌های رنگ پیدا نشدند.");
    return;
  }
  circle.style.backgroundColor = color;
  name.innerText = colorTranslations[color] || color;
};

// update waranty select
const updateSelectedWaranty = (waranty) => {
  const name = document.getElementById("waranty-name");
  if (!name) {
    console.warn("المان‌های گارانتی پیدا نشدند.");
    return;
  }
  name.innerText = waranty;
};

const toPersianDigits = (number) => {
  return number.toLocaleString("fa-IR").replace(/٬/g, ",");
};

const loadProductDetails = async () => {
  try {
    const res = await axios.get(`http://localhost:3004/products/${productId}`);
    const product = res.data;

    // برند
    const persianBrand = product.brand[0];
    const englishBrand = product.brand[1];
    document.title = product.name;
    const brandEl = document.getElementById("product-brand");
    if (brandEl) {
      brandEl.innerHTML = `
        <div>${persianBrand}</div>
        <span class="h-4 border-l border-gray-300 mx-4"></span>
        <div>${englishBrand}</div>
      `;
    }

    // تصویر و عنوان
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-image").alt = product.name;
    document.getElementById("product-title").innerText = product.name;

    // رنگ‌ها
    const colors = product.colors;
    if (colors && colors.length > 0) {
      updateSelectedColor(colors[0]);

      const optionsContainer = document.getElementById("color-options");
      const selectedButton = document.getElementById("selected-color");

      if (!optionsContainer || !selectedButton) {
        console.warn("المان‌های dropdown رنگ پیدا نشدند.");
        return;
      }

      optionsContainer.innerHTML = "";

      colors.forEach((color) => {
        const option = document.createElement("div");
        option.className =
          "flex items-center gap-2 px-3 py-1 hover:bg-gray-100 cursor-pointer";
        option.innerHTML = `
          <span class="w-4 h-4 rounded-full border border-gray-400" style="background-color: ${color}"></span>
          <span class="text-sm text-black">${
            colorTranslations[color] || color
          }</span>
        `;
        option.addEventListener("click", () => {
          updateSelectedColor(color);
          optionsContainer.classList.add("hidden");
        });
        optionsContainer.appendChild(option);
      });

      selectedButton.addEventListener("click", () => {
        optionsContainer.classList.toggle("hidden");
      });
    }

    // waranty
    const warantys = product.warantys;
    if (warantys && warantys.length > 0) {
      updateSelectedWaranty(warantys[0]);

      const optionsContainer = document.getElementById("waranty-options");
      const selectedButton = document.getElementById("selected-waranty");

      if (!optionsContainer || !selectedButton) {
        console.warn("المان‌های dropdown گارانتی پیدا نشدند.");
        return;
      }

      optionsContainer.innerHTML = "";

      warantys.forEach((waranty) => {
        const option = document.createElement("div");
        option.className =
          "px-3 py-2 hover:bg-gray-100 text-sm text-black cursor-pointer";
        option.innerText = waranty;

        option.addEventListener("click", () => {
          updateSelectedWaranty(waranty);
          optionsContainer.classList.add("hidden");
        });

        optionsContainer.appendChild(option);
      });

      selectedButton.addEventListener("click", () => {
        optionsContainer.classList.toggle("hidden");
      });
    }
    //features product
    const renderFeatures = (featuresArray) => {
      const featContainer = document.getElementById("product-features");
      if (!featContainer) {
        console.warn("المان توضیحات پیدا نشد.");
        return;
      }
      featContainer.innerHTML = "";
      const ul = document.createElement("ul");
      ul.className = "leading-7 list-disc pr-6 ";
      featuresArray.forEach((line) => {
        const li = document.createElement("li");
        li.innerText = line;
        ul.appendChild(li);
      });
      featContainer.appendChild(ul);
    };
    renderFeatures(product.features || []);
    const priceProduct = document.getElementById("price-product");
    if (product.isDiscounted === true) {
      priceProduct.innerHTML = `<div class="flex justify-center items-center gap-2 font-shabnam-medium">
        <span class="text-gray-400 line-through">${toPersianDigits(
          product.price
        )}</span>
        <span class="font-bold text-[#0951AA] text-[20px]">${toPersianDigits(
          product.price - product.discountPrice
        )} </span>
        <span class="text-gray-400 text-[12px]">تومان</span>
        </div>`;
    } else {
      priceProduct.innerHTML = `<div class="flex justify-center items-center gap-2 font-shabnam-medium">
            <span class="font-bold text-[#0951AA] text-[20px]">${toPersianDigits(
              product.price
            )}</span>
            <span class="text-gray-400 text-[12px]">تومان</span>
            </div>`;
    }
    const showAddShoppingCart = () => {
      const shoppingCart = document.getElementById("shopping-cart");
      const letMeKnow = document.getElementById("Let-me-know");
      if (product.count > 0) {
        shoppingCart.innerHTML = `<div
                    class="w-full bg-[#0A5ABD] flex items-center justify-center text-[14px] font-shabnam-medium text-white py-2 mt-2 rounded-lg"
                  >
                    <a href="#">
                      <span>افزوردن به سبد خرید</span>
                    </a>
                  </div>`;
        if (product.isDiscounted === false) {
          letMeKnow.innerHTML = `
                                  <div
                                  class="flex items-center justify-center font-shabnam-medium text-[14px] text-[#0A5ABD] mt-4 mb-2"
                                >
                                  <a href="#">
                                    <span>!شگفت انگیز شد،خبرم کن</span>
                                  </a>
                                </div>`;
        }
      } else {
        shoppingCart.innerHTML = `
    <div class="w-full bg-gray-200 flex items-center justify-center text-[14px] font-shabnam-medium text-gray-500 py-2 mt-2 rounded-lg">
    <span>ناموجود</span>
    </div>`;
        letMeKnow.innerHTML = "";
      }
    };
    showAddShoppingCart();
    const getFeatureByKeyword = (featuresArray, keyword) => {
      if (!featuresArray || !Array.isArray(featuresArray)) return "";
      return featuresArray.find((item) => item.includes(keyword)) || "";
    };
    const wallChargerReviewTemplate = (product) => {
      return `<p>در دنیای امروز که دستگاه های هوشمند نقش پررنگی در زندگی ما دارند، شارژ کردن به‌موقع آن ها اهمیت زیادی پیدا کرده است. افراد برای این کار از
        <strong>شارژر دیواری</strong> در منزل یا محل کار استفاده می‌کنند و در بیرون از خانه نیز به  <strong class="text-[#0951AA]">پاوربانک ها</strong>
        احتیاج دارند. اما دستگاهی وجود دارد که پاوربانک و شارژر دیواری هم می باشد. شرکت ${
          product.brand[0]
        } یک محصول دو کاره ای را طراحی و تولید کرده است که بسیار جذاب و کاربردی می باشد. این شرکت در زمینه لوازم جانبی موبایل فعالیت دارد و در این زمینه محصولات با کیفیتی را روانه بازار کرده است. ${
        product.brand[0]
      } یک محصول دو کاره ای با مدل ${product.slug} روانه بازار کرده است.</p>
        <p>&nbsp;</p>
        <p>
      ${
        product.name
      } ظرفیت 20 هزار میلی آمپری دارد. این پاوربانک می تواند 1.5 مرتبه موبایل آیفون سری 16 را شارژ کند. این ${getFeatureByKeyword(
        product.features,
        "توان خروجی"
      )} دارد. پورت های خروجی آن تایپ سی و USB-A است. پورت تای سی آن تا 20 وات توان را انتقال می دهد.  این پاوربانک یک ورودی و خروجی لایتنینگ هم دارد که از این طریق کابل تایپ سی به لایتنینگی که دارد ، شما می توانید دستگاه های خود را هم شارژ کنید. علاوه بر خروجی های آن شارژ وایرلس هم دارد که تا 15 وات توان را می تواند انتقال بدهد و شارژ سریع را پشتیبانی می کند.
        </p>
           <p>&nbsp;</p>
        <p>
      ${
        product.name
      } یک کابل متصل هم دارد که به صورت قرقره ای به داخل شارژر دیواری حمع می شود. ${getFeatureByKeyword(
        product.features,
        "طول کابل"
      )} می باشد.
        </p>`;
    };
    const desktopCharger = (product) => {
      return `<p>
        اگر در محل کار با کمبود پریز مواجه هستید و می خواهید دستگاه های خود را شارژ کنید، نیاز به یک دستگاهی دارید که بتواند پریز های برق شما را افزایش بدهد که شما بتوانید به راحتی دستگاه های خود را شارژ کنید. رابط های USB دار برق بهترین گزینه برای خریداری می باشند. زیرا شما می توانید بدون داشتن شارژر دیواری دستگاه های خود را شارژ نمایید. شرکتی که شما می توانید یک محصول با کیفیت از آن خریداری کنید، ${product.brand[0]} می باشد. شرکت ${product.brand[0]} یک رابط USB دار را طراحی و تولید کرده است که مناسب شارژ کردن دسنکاه های می باشد. شرکت  ${product.brand[0]} این محصول را با مدل ${product.slug} طراحی و تولید کرده است.
        </p>`;
    };
    const powerbankAndJumpStarter = (product) => {
      return `<p>
      شما برای اینکه بتوانید موبایل های خود را به دور از برق شهری شارژ کنید و در مواقع ضروری به مشکل بر نخوررید، نیاز به یک پاوربانک دارید. اگر شما به سفر های طولانی مدت می روید و در فضای باز هستید ، بهتر است که یک پاوربانک تهیه کنید که حتی با نور خورشید هم شارژ بشود. زیرا در مواقع اضطراری هم پاوربانک شما شارژ می شود. شارژ کردن دستگاه می تواند ما را از موقعیت های اضطراری دور نگه دارد. برای سفر ها  شما باید یک پاوربانک با ظرفیت بالا تهیه کنید که بتواند بار ها موبایل شما را شارژ کند. شرکت ${
        product.brand[0]
      } در زمینه لوازم جانبی موبایل فعالیت دارد که در این زمینه محصولات بسیار با کیفیتی را روانه بازار می کند. این برند یک پاوربانکی را طراحی و تولید کرده است که مناسب افرادی است که اهل سفر های کمپی هستند می باشد. این پاوربانک با مدل ${
        product.slug
      } روانه بازار می شود.
        </p>
        <p>&nbsp;</p>
        <p>
${product.name} ${getFeatureByKeyword(
        product.features,
        "ظرفیت باتری"
      )} دارد که پورت های خروجی آن دو عدد است که یک پورت تایپ سی و یک پورت USB-A دارد. توان خروجی این پاوربانک 20 وات می باشد و از فست شارژ پشتیبانی می کند. علاوه بر پورت های خروجی یک کابل متصل تایپ سی هم دارد.
        </p>
      <p>&nbsp;</p>
        <p>
این پاوربانک یک ویژگی منحصر به فردی دارد که شارژ وارلس هم دارد که همزمان شما می توانید 4 دستگاه را شارژ کنید. شارژ وایرلس آن تا 15 وات توان را انتقال می دهد.
        </p>
      `;
    };
    const joiser = (product) => {
      return `<p>
        برای اینکه بخواهیم برخی از مواد را با هم مخلوط کنیم و یا یک آبیموه ، اسموتی و... درست کنیم باید یک مخلوط کن بزرگ که به برق شهری متصل می شود را راه اندازی کنید که بتواند برای شما یک کار ساده را انجام بدهد. شما برای اینکه دیگر نیاز نباشد که وسایل زیادی را برای این کاره ساده استفاده نکنید، نیاز به یک مخلوط کن شارژی دارید. مخلوط کن یا همان جویسر شارژی می تواند بسیار ساده و بدون خستگی برای شما اسموتی و آبمیوه دلبخواه شما را درست کند. زیرا شست و شو راحتی هم دارد. شرکت ${
          product.brand[0]
        } یکی از شرکت هایی است که جویسر یا همان مخلوط کن شارژی طراحی و تولید کرده است. این برند محصولات بسیار متنوع و با کیفیتی را روانه بازار کرده است که مشتریان بسیار زیادی را هم جذب خود کرده است. این برند جویسر خود را با مدل ${
        product.slug
      } روانه بازار کرده است.
        </p>
            <p>&nbsp;</p>

        <p>
        ${product.name} ${getFeatureByKeyword(
        product.features,
        "ظرفیت مخزن"
      )}  است. 6 تیغه در قسمت داخلی آن به کار رفته است که حتی می تواند یخ را هم خرد کند. سرعت تیغه های آن 16500 دور در دقیقه می باشد. قدرت موتور آن هم 120 وات است.
        </p>
        <p>&nbsp;</p>
        <p>
        جنس بدنه جویسر تلقی است که با افتادن از ارتفاع نمی شکند و قابل حمل است که شما می توانید آن را هم در سفر ها و بیرون از منزل استفاده نمایید.
        </p>`;
    };
    const cableChargerTypec = (product) => {
      return `<p>
        اگر میز کار شما بسیار شلوغ است و کابل های زیادی بر روی میز دارید، باید برای شارژ کردن موبایل های خود یک کابلی تهیه کنید که قابلیت جمع شوندگی داشته باشد. کابل هایی که قابلییت جمع شوندگی دارد دیگر مز کار را بد ونامرتب نشان نمیدهد که شما آزرده خاطر شوید. ${product.brand[0]} (${product.brand[1]}) یک برند معتبر در زمینه تولید لوازم جانبی موبایل و تکنولوژی‌های شارژ است. این برند در سال های اخیر شهرت زیادی در بازار های جهانی پیدا کرده است، به ویژه به دلیل تولید محصولات با کیفیت بالا و طراحی های مدرن جزو شرکت های مطرح است. این کابل شارژ با مدل ${product.slug} روانه بازار کرده است.
        </p>`;
    };
    const usbInterface = (product) => {
      return `<p>
افزایش دادن پریز برق خانه و یا محل کار می تواند بسیار کار آمد باشد. زیرا اگر ما بخواهیم چندین دستگاه را به صورت همزان شارژ کنیم، باید چندین پریز برق داشته باشیم. برای بر طرف شدن این مشکل بهتر است که شما یک رابط برق تهیه کنید. رابط برق های جدید و امروزی پورت های USB-A و تایپ سی هم دارند که شما می توانید بدون نیاز به شارژر دیواری موبایل و تبلت های خود را شارژ نمایید. یکی از شرکت هایی که توانسته رابط برق USB دار طراحی و تولید کند ، شرکت ${product.brand[0]} می باشد. این شرکت محصول خود را با نام ${product.brand[1]} وارد بازار کرده است. این محصول با مدل${product.slug} روانه بازار شده است.
        </p>`;
    };
    const typesOfGadgets = (product) => {
      return `<p>
        وسیله ای که بتواند یک باد بسیار قدرتمند را پرتاب کند و بتواند تشک بادی را باد بزند و ذغال را سریع تر آماده کند. نیاز به یک جت فن دارید. جت فن ها باد بسیار تندی را از خود انتقال می هد و شما می توانید از این طریق به راحتی کار های خود را سریع تر انجام بدهید. شرکتی که شما می توانید یک جت فن با کیفیت از آن تهیه کنید، شرکت ${product.brand[0]} می باشد. این شرکت در زمینه لوازم جانبی موبایل فعالیت دارد و گجت های جذاب و کاربردی را طراحی و تولید می کند. این شرکت یک جت فنی را طراحی کرده است که یک باد بسیار قدرتمندی را از خود پرتاب می کند. این جت فن با مدل ${product.slug} روانه بازار شده است
        </p>`;
    };
    const renderReviews = (product) => {
      const reviewContainer = document.getElementById("product-review");
      if (!reviewContainer) return;

      let reviewHTML = "";

      switch (product.category) {
        case "شارژر دیواری":
          reviewHTML = wallChargerReviewTemplate(product);
          break;
        case "رابط برق و USB":
          reviewHTML = usbInterface(product);
          break;
        case "شارژر رومیزی":
          reviewHTML = desktopCharger(product);
          break;
        case "پاوربانک و جامپ استارتر":
          reviewHTML = powerbankAndJumpStarter(product);
          break;
        case "کابل شارژ تایپ سی به لایتنینگ":
          reviewHTML = cableChargerTypec(product);
          break;
        case "جویسر":
          reviewHTML = joiser(product);
          break;
        case "انواع گجت های جذاب":
          reviewHTML = typesOfGadgets(product);
          break;
      }
      reviewContainer.innerHTML = reviewHTML;
    };
    renderReviews(product);
  } catch (error) {
    console.error("❌ خطا در دریافت اطلاعات محصول:", error.message);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  header();
  menu();
  loadProductDetails();
});
