function getRecentEvents() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "OO/process.php",
      type: "GET",
      data: {
        acao: "recent_events",
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
  const cards = document.querySelector(".cards");
  let htmlList;
  await getRecentEvents()
    .then(async (response) => {
      const data = await JSON.parse(response);
      htmlList = data.map(
        (
          item
        ) => `<a href="./evento?id=${item.id}" class="card"><img src="${item.images}" alt="Card" /><div class="infos"><p>${item.title}</p><span><i class="ph ph-map-pin"></i>${item.location}</span>
      </div></a>`
      );
    })
    .catch((err) => console.log(err));

  cards.innerHTML = htmlList.join(" ");
}

fetch();
