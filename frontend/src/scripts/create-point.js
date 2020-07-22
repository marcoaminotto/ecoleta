// function getCountries() {
//   fetch(`http://battuta.medunes.net/api/country/all/?key=${key}`, {
//     credentials: 'include',
//     mode: 'cors'
//   })
//   .then(res => console.log(res.json()));
// }


// getCountries();

const itemsToCollect = document.querySelectorAll(".items-grid li");

for ( const item of itemsToCollect ) {
  item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
  const item = event.target;

  item.classList.toggle("selected");

  const itemId = item.dataset.id;

  const alreadySelected = selectedItems.findIndex( item => item == itemId);
  
  if (alreadySelected != -1) {
    selectedItems = selectedItems.filter(item => item != itemId);
  } else {
    selectedItems.push(itemId);
  }

  collectedItems.value = selectedItems;
}
