const header = async () => {
  let headerHtml = "";
  let navbarheader = document.querySelector(".navbarheader");
  try {
    let res = await axios.get("http://localhost:3004/header");
    headerHtml = res.data
      .map((item) => {
        return `<a href="${item.link}" class="hover:text-blue-900">${item.name}</a>`;
      })
      .join("");
  } catch (error) {
    console.log(error.message);
  }
  navbarheader.innerHTML = headerHtml;
};

header();
export default header;
