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
});
