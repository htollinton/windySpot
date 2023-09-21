// Creates the initial google map based on the browser lcoation

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;
  let locationLatitude = crd.latitude;
  let locationLongitude = crd.longitude;

  async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
      center: { lat: locationLatitude, lng: locationLongitude },
      zoom: 10,
    });
    new google.maps.Marker({
      position: {
        lat: locationLatitude,
        lng: locationLongitude,
      },
      map,
      title: "Current Location",
    });
  }
  initMap();
}

// If browser location not enabled then it will center the map on london
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
      center: { lat: 51.5072, lng: 0.1276 },
      zoom: 10,
    });
  }
  initMap();
}
let map;

export { options, success, error, map };
