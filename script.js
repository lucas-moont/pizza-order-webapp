const qS = (e) => document.querySelector(e);
const qSA = (e) => document.querySelectorAll(e);

pizzaJson.map((item, index) => {
  let pizzaItem = qS(".models .pizza-item").cloneNode(true);

  pizzaItem.setAttribute('data-key', index);

  pizzaItem.querySelector(".pizza-item--img img").src = item.img;

  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;
  pizzaItem.querySelector(
    ".pizza-item--price"
  ).innerHTML = `R$ ${item.price.toFixed(2)}`;

  pizzaItem.querySelector("a").addEventListener("click", (event) => {
    event.preventDefault();

    let modalQt = 1

    let key = event.target.closest('.pizza-item').getAttribute('data-key')

    qS('.pizzaInfo h1').innerHTML = `${pizzaJson[key].name}`
    qS('.pizzaInfo--desc').innerHTML = `${pizzaJson[key].description}`
    qS('.pizzaBig img').src = `${pizzaJson[key].img}`
    qS('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`
    qS('.pizzaInfo--size.selected').classList.remove('selected')
    qSA('.pizzaInfo--size').forEach((size, sizeIndex)=>{
      if(sizeIndex == 2){
        size.classList.add('selected')
      }
      size.querySelector('span').innerHTML = `${pizzaJson[key].sizes[sizeIndex]}`
    })

    qS('.pizzaInfo--qt').innerHTML = modalQt

    qS(".pizzaWindowArea").style.display = "flex";
    setTimeout(() => {
      qS(".pizzaWindowArea").style.opacity = "1";
    }, 100);
  });

  qS(".pizza-area").append(pizzaItem);
});

function closeOrderTab(){
  qS(".pizzaWindowArea").style.opacity = "0";
  setTimeout(() => {
    qS(".piizaWindowArea").style.display = 'none';
  }, 500)
}

qSA('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
  item.addEventListener('click', closeOrderTab)
})