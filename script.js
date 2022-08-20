let cart = [];

let modalKey = "";

const qS = (e) => document.querySelector(e);
const qSA = (e) => document.querySelectorAll(e);
let modalQt = 1;

pizzaJson.map((item, index) => {
  let pizzaItem = qS(".models .pizza-item").cloneNode(true);

  pizzaItem.setAttribute("data-key", index);

  pizzaItem.querySelector(".pizza-item--img img").src = item.img;

  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;
  pizzaItem.querySelector(
    ".pizza-item--price"
  ).innerHTML = `R$ ${item.price.toFixed(2)}`;

  pizzaItem.querySelector("a").addEventListener("click", (event) => {
    event.preventDefault();

    modalQt = 1;

    let key = event.target.closest(".pizza-item").getAttribute("data-key");

    modalKey = key;

    qS(".pizzaInfo h1").innerHTML = `${pizzaJson[key].name}`;
    qS(".pizzaInfo--desc").innerHTML = `${pizzaJson[key].description}`;
    qS(".pizzaBig img").src = `${pizzaJson[key].img}`;
    qS(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[
      key
    ].price.toFixed(2)}`;
    qS(".pizzaInfo--size.selected").classList.remove("selected");
    qSA(".pizzaInfo--size").forEach((size, sizeIndex) => {
      if (sizeIndex == 2) {
        size.classList.add("selected");
      }
      size.querySelector(
        "span"
      ).innerHTML = `${pizzaJson[key].sizes[sizeIndex]}`;
    });

    qS(".pizzaInfo--qt").innerHTML = modalQt;

    qS(".pizzaWindowArea").style.display = "flex";
    setTimeout(() => {
      qS(".pizzaWindowArea").style.opacity = "1";
    }, 100);
  });

  qS(".pizza-area").append(pizzaItem);
});

function closeOrderTab() {
  qS(".pizzaWindowArea").style.opacity = "0";
  setTimeout(() => {
    qS(".pizzaWindowArea").style.display = "none";
  }, 500);
}

qSA(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach(
  (item) => {
    item.addEventListener("click", closeOrderTab);
  }
);

qS(".pizzaInfo--qtmenos").addEventListener("click", () => {
  if (modalQt > 1) {
    modalQt--;
    qS(".pizzaInfo--qt").innerHTML = modalQt;
  }
});

qS(".pizzaInfo--qtmais").addEventListener("click", () => {
  modalQt++;
  qS(".pizzaInfo--qt").innerHTML = modalQt;
});

qSA(".pizzaInfo--size").forEach((size, sizeIndex) => {
  size.addEventListener("click", (e) => {
    qS(".pizzaInfo--size.selected").classList.remove("selected");
    size.classList.add("selected");
  });
});

qS(".pizzaInfo--addButton").addEventListener("click", () => {
  let selectedSize = parseInt(qS(".selected").getAttribute("data-key"));

  let identifier = pizzaJson[modalKey].id + "@" + selectedSize

  let cartFinder = cart.findIndex((item) => {
    return (item.identifier == identifier)
  });

  if (cartFinder > -1) {
    cart[cartFinder].qt += modalQt
  } else {
    cart.push({
      identifier: identifier,
      id: pizzaJson[modalKey].id,
      size: selectedSize,
      qt: modalQt,
    });
  }
  updateCart()
  closeOrderTab()
});


function updateCart(){
  if(cart.length > 0){
    qS('aside').classList.add('show')
  }else{
    qS('aside').classList.remove('show')
  }
}