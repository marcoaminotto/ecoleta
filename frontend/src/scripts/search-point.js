let map;

function initMap() {
  let longitude = parseFloat(
    document.querySelector("input[name=longitude]").value
  );
  let latitude = parseFloat(
    document.querySelector("input[name=latitude]").value
  );
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 12,
  });
}
