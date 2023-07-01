function getAll() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "../OO/process.php",
      type: "GET",
      data: {
        acao: "read_events",
      },
      success: (data) => {
        resolve(data);
      },
      error: (err) => {
        reject(err);
      },
    });
  });
}

async function fetch() {
  const cards = document.querySelector(".list");
  let htmlList;
  await getAll()
    .then(async (response) => {
      const data = await JSON.parse(response);

      htmlList = data.map(
        (item) => `
        <a href="../evento?id=${item.id}" class="card">
          <img loading="lazy" src="${item.images}" alt="Card" />
          <div class="infos">
            <p>${item.title}</p>
            <span class="cat">Categoria: ${showCategory(
              item.category_id
            )}</span>
            <span class="catID" style="display: none">${
              item.category_id
            }</span> 
            <span><i class="ph ph-map-pin"></i>${item.location}</span>
          </div>
        </a>`
      );
    })
    .catch((err) => console.log(err));

  cards.innerHTML = htmlList.join(" ");
}

const button = document.querySelector(".btn-search");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => e.preventDefault());

button.addEventListener("click", () => {
  const cards = document.querySelectorAll(".list .card");
  const filterInput = document.querySelector(".search-container input");
  const selected = document.getElementById("categoria");
  if (filterInput !== "" && selected.value !== "0") {
    for (let i = 0; i < cards.length; i++) {
      let title = cards[i].querySelector(".infos p");
      title = title.textContent.toLocaleLowerCase();
      let cat = cards[i].querySelector(".infos .catID");

      let filterText = filterInput.value.toLocaleLowerCase();
      if (title.includes(filterText) && cat.textContent === selected.value) {
        cards[i].style.display = "grid";
      } else {
        cards[i].style.display = "none";
      }
    }
  } else {
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.display = "grid";
    }
  }
});

function showCategory(id) {
  switch (id) {
    case "1":
      return "Festas";
    case "2":
      return "Bares";
    case "3":
      return "Shows";
    case "4":
      return "Música Ao Vivo";
    case "5":
      return "Teatro";
    case "6":
      return "Cursos";
    case "7":
      return "Feira";
  }
}

fetch();
