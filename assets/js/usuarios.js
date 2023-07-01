function getAll() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "../../OO/process.php",
      type: "GET",
      data: {
        acao: "read_users",
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

function deleteUserById(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "../../OO/process.php",
      type: "POST",
      data: {
        acao: "delete_user",
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

async function fetch() {
  const tbody = document.querySelector(".table tbody");
  let html;

  await getAll()
    .then(async (response) => {
      const data = await JSON.parse(response);
      html = data.map(
        (item) => `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td style="text-transform: capitalize;">${item.user_type}</td>
        <td class="td-edit">
          <button onclick="deleteUser(${item.id})"><i class="ph ph-trash"></i></button>
        </td>
      </tr>
      `
      );
    })
    .catch((err) => console.log(err));

  tbody.innerHTML = html.join(" ");
}

function deleteUser(id) {
  const modal = document.querySelector(".modal");
  const yes = document.getElementById("sim");
  const no = document.getElementById("nao");
  const toast = document.querySelector(".toast");

  modal.classList.remove("hidden");

  no.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  yes.addEventListener("click", async () => {
    await deleteUserById(id)
      .then((data) => {
        modal.classList.add("hidden");
        if (!data) {
          fetch();
          toast.classList.remove("hidden");
          setInterval(() => {
            toast.classList.add("hidden");
          }, 3000);
        } else {
          toast.classList.remove("hidden");
          toast.classList.add("error");
          toast.innerHTML = `<p>${data}</p>`;
          setInterval(() => {
            toast.classList.add("hidden");
            toast.classList.remove("error");
          }, 5000);
        }
      })
      .catch((err) => console.log(err));
  });
}

fetch();

window.addEventListener("load", async () => {
  const userData = await JSON.parse(localStorage.getItem("USER"));
  if (!userData) {
    return (window.location.href = "../login");
  }
  if (userData.user_type === "organizador") {
    return (window.location.href = "../../dashboard");
  }
});
