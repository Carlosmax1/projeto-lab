window.addEventListener("load", async () => {
  const userData = JSON.parse(localStorage.getItem("USER"));
  if (!userData) {
    return (window.location.href = "../login");
  }
  const span = document.querySelector("h1 span");
  const userName = document.querySelector(".user-name");
  const userEmail = document.querySelector(".user-mail");
  const dash = document.querySelector(".item-menu.dashboard");
  if (
    userData.user_type === "organizador" ||
    userData.user_type === "administrador"
  ) {
    dash.classList.remove("hidden");
  }
  span.innerText = userData.name;
  userName.innerText = userData.name;
  userEmail.innerHTML = `<i class="ph ph-envelope"></i>${userData.email}`;
  document.title = `Eventos - Perfil - ${userData.name}`;
});

async function fetch() {
  const { id: userID } = await JSON.parse(localStorage.getItem("USER"));
  let htmlList;
  const content = document.querySelector(".history .content");
  await getAllEventByUserId(userID).then(async (response) => {
    const data = await JSON.parse(response);
    htmlList = data.map(
      (item) => `   <a href="../evento?id=${item.id}" class="card">
    <img loading="lazy" src="${item.images}" alt="Card" />
    <div class="infos">
      <p>${item.title}</p>
      <span class="catID" style="display: none">${item.category_id}</span> 
      <span><i class="ph ph-map-pin"></i>${item.location}</span>
    </div>
  </a>`
    );
  });
  content.innerHTML = htmlList.join(" ");
}

function getAllEventByUserId(userID) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "../OO/process.php",
      type: "GET",
      data: {
        acao: "read_events_user",
        userID: userID,
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

const buttonExit = document.querySelector(".exit button");

buttonExit.addEventListener("click", () => {
  localStorage.removeItem("USER");
  window.location.href = "../login";
});

fetch();
