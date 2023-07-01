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
  formData["acao"] = "user_create";
  await register(formData)
    .then((data) => {
      if (!data) {
        window.location.href = "../login";
      }
    })
    .catch((err) => console.log(err));
});

async function register(formData) {
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
