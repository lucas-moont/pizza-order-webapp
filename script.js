const qS = (e) => document.querySelector(e);
const qSA = (e) => document.querySelectorAll(e);

pizzaJson.map((item, idex) => {
    let pizzaItem = qS('.models .pizza-item').cloneNode(true)

    pizzaItem.querySelector('.pizza-item--img img').src = item.img

    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}` 

    qS('.pizza-area').append(pizzaItem)
})