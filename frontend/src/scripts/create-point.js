const itemsToCollect = document.querySelectorAll(".items-grid li");
const collectedItems = document.querySelector("input[name=items]");
const countrySelect = document.querySelector("select[name=country]");
const countryOptions = document.querySelectorAll(
  "select[name=country] > option"
);
const regionSelect = document.querySelector("select[name=region]");
const citySelect = document.querySelector("select[name=city]");

let selectedItems = [];

countrySelect.addEventListener("change", (event) => {
  regionSelect.innerHTML = '<option value="">Select a region</option>';
  citySelect.innerHTML = '<option value="">Select a city</option>';
  regionSelect.disabled = true;
  citySelect.disabled = true;

  if (event.target.value) {
    fetch(`/location/${event.target.value}`, { method: "get" }).then(
      (response) => {
        response.json().then((regions) => {
          for (const data of regions) {
            regionSelect.innerHTML += `<option value="${data.region}">${data.region}</option>`;
          }
        });
        regionSelect.disabled = false;
      }
    );
  }
});

regionSelect.addEventListener("change", (event) => {
  citySelect.innerHTML = '<option value="">Select a city</option>';
  citySelect.disabled = true;

  const countrySelected = document.querySelector(
    "select[name=country] > .selected"
  ).value;

  if (countrySelected && event.target.value) {
    fetch(`/location/${countrySelected}/${event.target.value}`, {
      method: "get",
    }).then((response) => {
      response.json().then((cities) => {
        for (const data of cities) {
          citySelect.innerHTML += `<option value="${data.city}">${data.city}</option>`;
        }
      });
      citySelect.disabled = false;
    });
  }
});

for (const option of countryOptions) {
  option.addEventListener("click", function (event) {
    const selectedOption = document.querySelector(
      "select[name=country] .selected"
    );
    selectedOption ? selectedOption.classList.remove("selected") : null;
    const option = event.target;
    option.classList.add("selected");
  });
}

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

function handleSelectedItem(event) {
  const item = event.target;

  item.classList.toggle("selected");

  const itemId = item.dataset.id;

  const alreadySelected = selectedItems.findIndex((item) => item == itemId);

  if (alreadySelected != -1) {
    selectedItems = selectedItems.filter((item) => item != itemId);
  } else {
    selectedItems.push(itemId);
  }

  collectedItems.value = selectedItems;
}
