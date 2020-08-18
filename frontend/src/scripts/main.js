const buttonSearch = document.querySelector("#page-home main a");
const buttonModal = document.querySelector("#modal button");
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .header a");
const countrySelect = document.querySelector("select[name=country]");
const regionSelect = document.querySelector("select[name=region]");
const citySelect = document.querySelector("select[name=city]");
const cityLongitude = document.querySelector("input[name=longitude]");
const cityLatitude = document.querySelector("input[name=latitude]");

let citiesCoordinates = [];

buttonSearch.addEventListener("click", () => {
  modal.classList.remove("hide");
});

close.addEventListener("click", () => {
  countrySelect.selectedIndex = 0;
  resetSelects(citySelect, regionSelect);
  disableButton(buttonModal);
  modal.classList.add("hide");
});

countrySelect.addEventListener("change", (event) => {
  resetSelects(citySelect, regionSelect);
  disableButton(buttonModal);

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
  resetSelects(citySelect);
  disableButton(buttonModal);

  const countrySelected = document.querySelector("select[name=country]").value;

  if (countrySelected && event.target.value) {
    fetch(`/location/${countrySelected}/${event.target.value}`, {
      method: "get",
    }).then((response) => {
      response.json().then((cities) => {
        for (const data of cities) {
          citiesCoordinates.push({
            city: data.city,
            latitude: data.latitude,
            longitude: data.longitude,
          });
          citySelect.innerHTML += `<option value="${data.city}">${data.city}</option>`;
        }
      });
      citySelect.disabled = false;
    });
  }
});

citySelect.addEventListener("change", (event) => {
  if (event.target.value) {
    enableButton(buttonModal);
    const citySelected = citiesCoordinates.find(
      (element) => element.city === event.target.value
    );
    cityLongitude.value = citySelected.longitude;
    cityLatitude.value = citySelected.latitude;
  } else {
    disableButton(buttonModal);
  }
});

function enableButton(button) {
  button.disabled = false;
  button.classList.remove("disabled");
}

function disableButton(button) {
  button.disabled = true;
  button.classList.add("disabled");
}

function resetSelects(city, region) {
  if (city && region) {
    region.innerHTML = '<option value="">Select a region</option>';
    city.innerHTML = '<option value="">Select a city</option>';
    region.disabled = true;
    city.disabled = true;
  } else if (city) {
    city.innerHTML = '<option value="">Select a city</option>';
    city.disabled = true;
  }
}
