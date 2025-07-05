const itens = document.querySelectorAll(".item");
const finishOrderButton = document.querySelector(".finish-order__button");

itens.forEach((item) => {
  item.addEventListener("click", () => {
    const category = item.parentElement;
    const selected = category.querySelector(".selected");
    if (selected && selected !== item) {
      selected.classList.remove("selected");
    }
    item.classList.toggle("selected");
    allFoodsSelected();
  });
});
function allFoodsSelected() {
  const selectedItens = document.querySelectorAll(".item.selected");
  if (selectedItens.length === 3) {
    finishOrderButton.removeAttribute("disabled");
    finishOrderButton.classList.add("active");
    finishOrderButton.innerHTML = "Fechar pedido";
    finishOrderButton.style.fontWeight = "700";
  } else {
    finishOrderButton.setAttribute("disabled", true);
    finishOrderButton.classList.remove("active");
    finishOrderButton.innerHTML =
      "Selecione os 3 itens<br />para fechar o pedido";
  }
}
function showCard() {
  finishOrderButton.addEventListener("click", () => {
    const opacityMain = document.querySelector("main");
    opacityMain.classList.add("opacity");
    createCard();
  });
}
function createCard() {
  const selectedItens = document.querySelectorAll(".item.selected");

  const foodName = selectedItens[0].querySelector(
    ".food-container__list-item-title"
  ).textContent;
  const drinkName = selectedItens[1].querySelector(
    ".food-container__list-item-title"
  ).textContent;
  const dessertName = selectedItens[2].querySelector(
    ".food-container__list-item-title"
  ).textContent;

  const foodPrice = parseFloat(
    selectedItens[0]
      .querySelector(".food-container__list-item-price")
      .textContent.replace("R$", "")
      .replace(",", ".")
  );
  const drinkPrice = parseFloat(
    selectedItens[1]
      .querySelector(".food-container__list-item-price")
      .textContent.replace("R$", "")
      .replace(",", ".")
  );
  const dessertPrice = parseFloat(
    selectedItens[2]
      .querySelector(".food-container__list-item-price")
      .textContent.replace("R$", "")
      .replace(",", ".")
  );

  const total = (foodPrice + drinkPrice + dessertPrice)
    .toFixed(2)
    .replace(".", ",");

  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.classList.add("card-title");
  title.textContent = "Confirme seu pedido";
  card.appendChild(title);

  // Adiciona as linhas com nome e preço
  card.appendChild(createRow(foodName, foodPrice));
  card.appendChild(createRow(drinkName, drinkPrice));
  card.appendChild(createRow(dessertName, dessertPrice));
  card.appendChild(createRow("TOTAL", total, true));

  const buttons = document.createElement("div");
  buttons.classList.add("buttons");

  // Botão de confirmação
  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Tudo certo, pode pedir!";
  confirmButton.classList.add("confirm-button");
  buttons.appendChild(confirmButton);
  confirmButton.addEventListener("click", sendToWhatsapp);

  // Botão de cancelamento
  const opacityMain = document.querySelector("main");
  const cancelButton = document.createElement("p");
  cancelButton.textContent = "Cancelar";
  cancelButton.classList.add("cancel-button");
  cancelButton.addEventListener("click", () => {
    opacityMain.classList.remove("opacity");
    card.remove();
  });
  buttons.appendChild(cancelButton);
  card.appendChild(buttons);

  document.body.appendChild(card);
}

function createRow(name, price, isTotal = false) {
  const row = document.createElement("div");
  row.classList.add("card-row");

  const nameSpan = document.createElement("span");
  nameSpan.textContent = name;

  const priceSpan = document.createElement("span");
  priceSpan.textContent =
    typeof price === "number"
      ? `R$ ${price.toFixed(2).replace(".", ",")}`
      : `R$ ${price}`;
  if (isTotal) {
    nameSpan.style.fontWeight = "bold";
    priceSpan.style.fontWeight = "bold";
  }

  row.appendChild(nameSpan);
  row.appendChild(priceSpan);
  return row;
}
function sendToWhatsapp() {}
showCard();
