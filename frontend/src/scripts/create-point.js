const itemsToCollect = document.querySelectorAll(".items-grid li");
const collectedItems = document.querySelector("input[name=items]");
const countrySelect = document.querySelector("select[name=country]");
const regionSelect = document.querySelector("select[name=region]");
const citySelect = document.querySelector("select[name=city]");
const cityLongitude = document.querySelector("input[name=longitude]");
const cityLatitude = document.querySelector("input[name=latitude]");
const mapScreen = document.querySelector("#map");

let selectedItems = [];
let citiesCoordinates = [];
let map;
let marker;

countrySelect.addEventListener("change", (event) => {
  hideMap();
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
  hideMap();
  citySelect.innerHTML = '<option value="">Select a city</option>';
  citySelect.disabled = true;

  const countrySelected = document.querySelector("select[name=country]").value;
  console.log(event.target.value);
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
    const citySelected = citiesCoordinates.find(
      (element) => element.city === event.target.value
    );
    cityLongitude.value = citySelected.longitude;
    cityLatitude.value = citySelected.latitude;
    initMap();
    showMap();
  } else {
    hideMap();
  }
});

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

function initMap() {
  let longitude = cityLongitude.value ? parseFloat(cityLongitude.value) : null;
  let latitude = cityLatitude.value ? parseFloat(cityLatitude.value) : null;
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude || -28.024, lng: longitude || 140.887 },
    zoom: 12,
  });

  map.addListener("click", (event) => {
    cityLongitude.value = event.latLng.lng();
    cityLatitude.value = event.latLng.lat();
    addMarker(event.latLng, map);
  });
}

function addMarker(location, map) {
  marker ? deleteMarkers() : null;

  const coordenates = new google.maps.Marker({
    position: location,
    map: map,
  });
  marker = coordenates;
}

function deleteMarkers() {
  marker.setMap(null);
  marker = "";
}

function hideMap() {
  mapScreen.style.display = "none";
}

function showMap() {
  mapScreen.style.display = "block";
}
