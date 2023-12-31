const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {};

  for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements[i];
    if (element.name && element.value) {
      formData[element.name] = element.value.trim();
    }
  }
  formData["acao"] = "user_login";
  await login(formData)
    .then(async (response) => {
      const data = await JSON.parse(response);
      if (!data.length) {
        const toast = document.querySelector(".toast");
        toast.classList.remove("hidden");
        setInterval(() => {
          toast.classList.add("hidden");
        }, 2000);
        return;
      }
      const userData = data[0];
      localStorage.setItem("USER", JSON.stringify(userData));
      window.location.href = "../perfil";
    })
    .catch((err) => console.log(err));
});

async function login(formData) {
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
