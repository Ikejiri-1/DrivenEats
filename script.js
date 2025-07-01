const itens = document.querySelectorAll(".item");
const finishOrderButton = document.querySelector(".finish-order__button");
itens.forEach((item) => {
  item.addEventListener("click", () => {
    const category = item.parentElement;
    const selected = category.querySelector(".selected");
    if (selected && selected !== item) {
      selected.classList.remove("selected");
    }
    item.classList.add("selected");
    allItensSelected();
  });
});
function allItensSelected() {
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
