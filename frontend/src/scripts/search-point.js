let map;
var locations = [
  // here come a list of coordinates
  // {lat: -31.563910, lng: 147.154312},
];

function initMap() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let longitude = parseFloat(urlParams.get("longitude"));
  let latitude = parseFloat(urlParams.get("latitude"));
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 12,
  });

  var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  var markers = locations.map(function (location, i) {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length],
    });
  });

  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });
}
