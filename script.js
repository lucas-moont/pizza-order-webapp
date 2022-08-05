const qS = (e) => document.querySelector(e);
const qSA = (e) => document.querySelectorAll(e);

pizzaJson.map((item, idex) => {
    let pizzaItem = qS('.models .pizza-item').cloneNode(true)

    qS('.pizza-area').append(pizzaItem)
})