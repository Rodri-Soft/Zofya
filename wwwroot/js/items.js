const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', e => { fetchData() });

const fetchData = async () => {
  const res = await fetch("/js/api.json");
  const data = await res.json();
  console.log(data);
  showItems(data);
}

const showItems = data => {
  data.forEach(item => {      
      templateCard.querySelector("#item-image").setAttribute("src", item.thumbnailUrl)
      templateCard.querySelector("#item-name").textContent = item.name
      templateCard.querySelector("#item-price").textContent = item.price
      templateCard.querySelector("#item-color").textContent = item.color
      templateCard.querySelector("#item-sizes").textContent = item.sizes
      templateCard.querySelector("button").dataset.id = item.id
      const clone = templateCard.cloneNode(true)
      fragment.appendChild(clone)
  })
  items.appendChild(fragment);
}