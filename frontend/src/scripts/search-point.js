let map;
let locations = [];

function initMap() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let longitude = parseFloat(urlParams.get("longitude"));
  let latitude = parseFloat(urlParams.get("latitude"));
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 12,
  });

  populateLocations();
}

function addMarker(location, name) {
  window.setTimeout(() => {
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.Animation.DROP,
    });
    locations.push(marker);

    const infowindow = new google.maps.InfoWindow({
      content: `<h3>${name}</h3>`,
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  }, 600);
}

function populateLocations() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const city = urlParams.get("city");

  if (city) {
    fetch(`/getCordinates/${city}`, { method: "get" }).then((response) => {
      response.json().then((cities) => {
        for (const data of cities) {
          const location = {
            lat: parseFloat(data.latitude),
            lng: parseFloat(data.longitude),
          };
          addMarker(location, data.name);
        }
      });
    });
  }
}
