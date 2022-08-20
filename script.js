let cart = []

let modalKey = ""

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
    let subtotal = 0
    qS('aside').classList.add('show')
    qS('.cart').innerHTML = ''
    for (let i in cart){
      let pizzaItem = pizzaJson.find((item) => {
        return item.id == cart[i].id
      })

      let pizzaSizeName

      switch(cart[i].size){
        case 0:
          pizzaSizeName = 'P'
          break
        case 1:
          pizzaSizeName = 'M'
          break
        case 2:
          pizzaSizeName = 'G'
          break
      }

      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

      let cartItem = qS('.models .cart--item').cloneNode(true)
      qS('.cart').append(cartItem)
      cartItem.querySelector('img').src = pizzaItem.img
      cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

      let valorIndPizza = calculaVal(pizzaItem.price, cart[i].qt).toFixed(2)
      subtotal = parseFloat(subtotal) + parseFloat(valorIndPizza)
      subtotal = parseFloat(subtotal).toFixed(2)
      console.log(subtotal)
    }

    let subTotalString = subtotal.toString().replace('.', ',')
    let discount = (subtotal * 0.10).toFixed(2).toString().replace('.', ',')

    qS('.cart--totalitem.subtotal').innerHTML =`<span>Subtotal</span><span>R$ ${subTotalString}</span>`
    qS('.cart--totalitem.desconto').innerHTML =`<span>Desconto (-10%)</span><span>R$ ${discount}</span>`
  }else{
    qS('aside').classList.remove('show')
  }
}

function calculaVal(qtPizza, valPizza){
  return qtPizza * valPizza
}