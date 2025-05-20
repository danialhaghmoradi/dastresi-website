const menu = async () => {
  let menu = "";
  let navbarmenu = document.querySelector("#navbarmenu");
  try {
    let res = await axios.get("http://localhost:3004/menu");
    menu = res.data
      .map((item) => {
        return `<div class="font-shabnam text-[14px] relative group h-full">
      <a
        href="#"
        class="relative h-full flex items-center px-2 text-gray-400 hover:text-red-400"
      >
        ${item.title}
        ${
          item.children.length > 0
            ? `<svg class="w-4 h-4 mr-2 fill-gray-500 group-hover:fill-red-400" fill="" width="800px" height="800px" viewBox="-6.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
<title>dropdown</title>
<path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
</svg>
`
            : ""
        }
        <span
          class="absolute bottom-[-1px] left-0 w-full h-[3px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300"
        ></span>
      </a>
    </div>`;
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
menu();
export default menu;
