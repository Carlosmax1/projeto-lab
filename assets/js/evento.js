const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

/* Verifica se o usuário está logado */

window.addEventListener("load", () => {
  const userData = JSON.parse(localStorage.getItem("USER"));
  if (!userData) {
    const button = document.querySelector(".btn-insc");
    button.disabled = true;
  }
});

const buttonInsc = document.querySelector(".btn-insc");

buttonInsc.addEventListener("click", async () => {
  await userSubscribeEvent()
    .then((data) => {
      fetch();
    })
    .catch((err) => console.log(err));
});

function getCommentsByEventId() {
  if (id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "../OO/process.php",
        type: "GET",
        data: {
          acao: "getCommentsByEventId",
          id: id,
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
}

function getEventByID() {
  if (id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "../OO/process.php",
        type: "GET",
        data: {
          acao: "getEventId",
          id: id,
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
}

function divideFloatNumber(number) {
  const integerPart = Math.floor(number);
  const decimalPart = number - integerPart;

  return [integerPart, decimalPart];
}

function generateStars(starDiv, number) {
  const result = divideFloatNumber(number);

  const integerPart = result[0];
  const decimalPart = result[1];

  for (let i = 0; i < integerPart; i++) {
    const II = document.createElement("i");
    II.classList.add("ph-fill");
    II.classList.add("ph-star");
    starDiv.appendChild(II);
  }

  /* Adiciona a parte decimal das estrelas */

  if (Math.round(decimalPart) > 0) {
    const II = document.createElement("i");
    II.classList.add("ph-fill");
    II.classList.add("ph-star-half");
    starDiv.appendChild(II);
  }

  /* for para adicionar as estrelas não preenchidas */

  for (let i = 0; i < 5 - (integerPart + Math.round(decimalPart)); i++) {
    const II = document.createElement("i");
    II.classList.add("ph");
    II.classList.add("ph-star");
    starDiv.appendChild(II);
  }
}

async function fetch() {
  if (!id) {
    return (window.location.href = "../index.html");
  }
  const texts = document.querySelector(".texts");
  const commentsList = document.querySelector(".comments-list");
  let html;
  let commentsHtml;
  let rating;
  await getCommentsByEventId().then(async (response) => {
    const data = await JSON.parse(response);
    rating = data.map((obj) => obj.score);
    commentsHtml = data.map(
      (item) => `
    <div class="container">
    <div class="user-info">
      <img
        class="avatar"
        src="../assets/images/avatar.png"
        alt="Avatar"
      />
      <span class="user-name">${item.name}</span>
    </div>
    <div class="user-comment">
      <span class="user-comment-text"
        >${item.comment}
      </span>
      <div id="stars" class="stars">

      </div>
    </div>
  </div>
    `
    );
  });
  commentsList.innerHTML = commentsHtml;

  const starDiv = document.querySelectorAll(".stars");

  starDiv.forEach((item, index) => {
    generateStars(item, parseInt(rating[index]));
  });

  await getEventByID()
    .then(async (response) => {
      const data = await JSON.parse(response);
      const event = data.find((item) => item.id === id);
      document.title = `${event.title}`;
      html = `<span><strong>Nome: </strong>${event.title}</span>
      <span><strong>Horário: </strong>${event.time}</span>
      <span><strong>Local: </strong>${event.location}</span>
      <span><strong>Data: </strong>${event.date} </span>
      <span
        ><strong>Descrição: </strong>${event.description}</span
      >
      <span><strong>Preço: </strong>${event.price}</span>`;
    })
    .catch((err) => console.log(err));
  texts.innerHTML = html;

  await verifyUserSubscribe().then(async (response) => {
    const data = await JSON.parse(response);
    if (data.length) {
      const button = document.querySelector(".btn-insc");
      button.disabled = true;
      button.style.color = "#111";
      button.innerText = "Você já está inscrito";
    }
  });
}

function userSubscribeEvent() {
  const { id: userID } = JSON.parse(localStorage.getItem("USER"));
  if (id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "../OO/process.php",
        type: "POST",
        data: {
          acao: "userSubscribeEvent",
          userID: userID,
          eventID: id,
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
}

function verifyUserSubscribe() {
  const { id: userID } = JSON.parse(localStorage.getItem("USER"));

  if (id && userID) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "../OO/process.php",
        type: "GET",
        data: {
          acao: "verifyUserSubscribe",
          userID: userID,
          eventID: id,
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
}

const formR = document.querySelector(".form-comment");

formR.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = {};

  for (let i = 0; i < formR.elements.length; i++) {
    const element = formR.elements[i];
    if (element.name && element.value) {
      formData[element.name] = element.value.trim();
    }
  }
  formData["acao"] = "create_review";

  await createReview().then((response) => console.log(response));
});

function createReview(formData) {
  if (id) {
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
}

fetch();
