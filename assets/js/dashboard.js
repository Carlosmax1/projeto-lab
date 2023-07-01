const form = document.getElementById("createEvent");
let allCards;

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

function edit(
  id,
  nome,
  descricao,
  data,
  horario,
  local,
  categoria,
  preco,
  imagem
) {
  const formEdit = document.getElementById("editEvent");
  const inputs = formEdit.querySelectorAll("input");
  const modalEdit = document.getElementById("modal-edit");
  const select = formEdit.querySelector("select");
  select.value = categoria;
  modalEdit.classList.remove("hidden");

  inputs.forEach((item) => {
    switch (item.name) {
      case "id":
        item.value = id;
        break;
      case "title":
        item.value = nome;
        break;
      case "description":
        item.value = descricao;
        break;
      case "date":
        item.value = data;
        break;
      case "time":
        item.value = horario;
        break;
      case "location":
        item.value = local;
        break;
      case "price":
        item.value = preco;
        break;
      case "image":
        item.value = imagem;
        break;
      default:
        break;
    }
  });

  formEdit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {};

    for (let i = 0; i < formEdit.elements.length; i++) {
      const element = formEdit.elements[i];
      if (element.name && element.value) {
        if (element.name === "category") {
          if (element.value === "0") {
            return;
          }
        }
        formData[element.name] = element.value.trim();
      }
    }
    formData["acao"] = "event_edit";
    console.log(formData);
    await editEvent(formData)
      .then((response) => {
        const toast = document.querySelector(".toast");
        const modal = document.getElementById("modal-edit");
        modal.classList.add("hidden");
        if (!response) {
          fetch();
          toast.classList.remove("hidden");
          toast.innerHTML = "<p>Evento editado com sucesso</p>";
          setInterval(() => {
            toast.classList.add("hidden");
          }, 3000);
        } else {
          toast.classList.remove("hidden");
          toast.classList.add("error");
          toast.innerHTML = `<p>${response}</p>`;
          setInterval(() => {
            toast.classList.add("hidden");
            toast.classList.remove("error");
          }, 5000);
        }
      })
      .catch((err) => console.log(err));
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = {};

  for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements[i];
    if (element.name && element.value) {
      if (element.name === "category") {
        if (element.value === "0") {
          return;
        }
      }
      formData[element.name] = element.value.trim();
    }
  }
  formData["acao"] = "event_create";
  await createEvent(formData)
    .then((response) => {
      const toast = document.querySelector(".toast");
      const modal = document.getElementById("modal-create");
      modal.classList.add("hidden");
      if (!response) {
        fetch();
        toast.classList.remove("hidden");
        setInterval(() => {
          toast.classList.add("hidden");
        }, 3000);
      } else {
        toast.classList.remove("hidden");
        toast.classList.add("error");
        toast.innerHTML = `<p>${response}</p>`;
        setInterval(() => {
          toast.classList.add("hidden");
          toast.classList.remove("error");
        }, 5000);
      }
    })
    .catch((err) => console.log(err));
});

function createEvent(formData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "../OO/process.php",
      type: "POST",
      data: formData,
      success: (data) => {
        resolve(data);
      },
      error: (err) => {
        reject(err);
      },
    });
  });
}

function editEvent(formData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "../OO/process.php",
      type: "POST",
      data: formData,
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
  const cards = document.querySelector(".cards");
  let htmlList;
  await getAll()
    .then(async (response) => {
      const data = await JSON.parse(response);

      htmlList = data.map(
        (item) => `
        <div class="card">
          <img loading="lazy" src="${item.images}" alt="Card" />
          <div class="infos">
            <p>${item.title}</p>
            <span><i class="ph ph-map-pin"></i>${item.location}</span>
            <button onclick="edit(
              ${item.id}, 
              '${item.title}', 
              '${item.description}', 
              '${item.date}', 
              '${item.time}', 
              '${item.location}', 
              '${item.category_id}', 
              '${item.price}', 
              '${item.images}'
              )" id="btn-edit" class="btn-edit">
              <i class="ph ph-pencil"></i>
              Editar
            </button>
          </div>
        </div>`
      );
    })
    .catch((err) => console.log(err));

  cards.innerHTML = htmlList.join(" ");
}

// Filtro
const filter = document.querySelector(".input-container input");
filter.addEventListener("input", () => {
  const cards = document.querySelectorAll(".cards .card");
  if (filter.value !== "") {
    for (let i = 0; i < cards.length; i++) {
      let title = cards[i].querySelector(".infos p");
      title = title.textContent.toLocaleLowerCase();
      let filterText = filter.value.toLocaleLowerCase();
      if (!title.includes(filterText)) {
        cards[i].style.display = "none";
      } else {
        cards[i].style.display = "grid";
      }
    }
  } else {
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.display = "grid";
    }
  }
});

fetch();

window.addEventListener("load", () => {
  const isLogin = localStorage.getItem("logado");
  if (isLogin === "false") {
    return (window.location.href = "../login/index.html");
  }
});
