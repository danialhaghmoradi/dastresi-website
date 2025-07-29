const menu = async () => {
  let menu = "";
  let navbarmenu = document.querySelector("#navbarmenu");
  try {
    let res = await axios.get("http://localhost:3004/menu");
    menu = res.data
      .map((item) => {
        if (item.children.length > 0) {
          return `
            <div class="font-shabnam text-[14px] relative group h-full">
              <a href="/category.html?name=${encodeURIComponent(
                item.title
              )}" class="relative h-full flex items-center px-2 text-gray-600 hover:text-red-400">
                ${item.title}
                <svg class="w-3 h-3 mr-2 fill-gray-500 group-hover:fill-red-400" viewBox="-6.5 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
                </svg>
                <span class="absolute bottom-[-1px] left-0 w-full h-[3px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300"></span>
              </a>
              <div class="flex flex-col gap-2 absolute  top-full right-0 w-80 h-auto bg-white py-4 mt-[2px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 shadow-md">
                ${item.children
                  .map((child) => {
                    if (child.children && child.children.length > 0) {
                      return `
                        <div class="relative group/submenu font-shabnam-medium text-[12px] ">
                          <a href="/category.html?name=${encodeURIComponent(
                            child.title
                          )}" class=" text-gray-700 hover:text-[#0A5ABD] px-2 py-3 rounded hover:bg-gray-100 flex justify-between items-center">
                            ${child.title}

                        <svg
                        class="w-5 h-5 ml-1 stroke-gray-400 group-hover/submenu:stroke-red-400 transition-colors duration-300"
                         viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                               <path
                        d="M15 7L10 12L15 17"
                         stroke="currentColor"
                         stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                           />
                         </svg>

                          </a>
                          <div class="absolute top-0 right-[319px]  w-60 font-shabnam-medium text-[12px] bg-white shadow-md text-gray-600 hover:text-[#0A5ABD]  hidden group-hover/submenu:flex flex-col  z-20">
                            ${child.children
                              .map(
                                (sub) =>
                                  `<a href="/category.html?name=${encodeURIComponent(
                                    sub.title
                                  )}" class="text-gray-600 hover:text-[#0A5ABD] px-2 py-3 rounded hover:bg-gray-100 ">${
                                    sub.title
                                  }</a>`
                              )
                              .join("")}
                          </div>
                        </div>`;
                    } else {
                      return `<a href="/category.html?name=${encodeURIComponent(
                        child.title
                      )}" class=" text-[12px] font-shabnam-medium block text-gray-700 hover:text-[#0A5ABD] px-2 py-3 rounded hover:bg-gray-100">${
                        child.title
                      }</a>`;
                    }
                  })
                  .join("")}
              </div>
            </div>`;
        } else {
          return `
            <div class="font-shabnam text-[14px] relative group h-full">
              <a href="/category.html?name=${encodeURIComponent(
                item.title
              )}" class="relative h-full flex items-center px-2 text-gray-600 hover:text-red-400">
                ${item.title}
                <span class="absolute bottom-[-1px] left-0 w-full h-[3px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300"></span>
              </a>
            </div>`;
        }
      })
      .join(" ");
  } catch (error) {
    console.log(error.message);
  }
  if (navbarmenu) {
    navbarmenu.innerHTML = menu;
  } else {
    console.error("Element with id 'navbarmenu' not found");
  }
};
export default menu;
