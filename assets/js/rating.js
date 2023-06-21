const starDiv = document.querySelectorAll(".stars");

starDiv.forEach((item) => {
  const random = getRandomNumber();
  generateStars(item, random);
});

function getRandomNumber() {
  var wholeNumber = Math.floor(Math.random() * 6);
  var decimal = Math.random() < 0.5 ? 0 : 0.5;
  if (wholeNumber === 5) {
    decimal = 0;
  }
  return wholeNumber + decimal;
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

function divideFloatNumber(number) {
  const integerPart = Math.floor(number);
  const decimalPart = number - integerPart;

  return [integerPart, decimalPart];
}
