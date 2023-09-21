//takes a searched place as an adress, uses google geocode api to get a lat/lng
//then uses this latlng to re-center the map

let address = document.getElementById("location");
let currentCenter;
address.addEventListener("submit", (e) => {
  e.preventDefault();

  let newSearch = document.getElementById("new-search").value;
  if (newSearch.value != "") {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: newSearch }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        async function initMap() {
          const { Map } = await google.maps.importLibrary("maps");
          currentCenter = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          console.log(currentCenter);

          let map = new Map(document.getElementById("map"), {
            center: currentCenter,
            zoom: 10,
          });
          new google.maps.Marker({
            position: currentCenter,
            map,
            title: newSearch,
          });
          const infowindow = new google.maps.InfoWindow({});

          infowindow.open(map);
          // Add a listener for the click event. Display the elevation for the LatLng of
          // the click inside the infowindow.
          map.addListener("click", (event) => {
            displayLocationElevation(event.latLng, elevator, infowindow);
          });
          function displayLocationElevation(location, elevator, infowindow) {
            // Initiate the location request
            elevator
              .getElevationForLocations({
                locations: [location],
              })
              .then(({ results }) => {
                infowindow.setPosition(location);
                // Retrieve the first result
                if (results[0] && results[0].elevation < 0) {
                  infowindow.setContent("This is the sea");
                } else if (results[0] && results[0].elevation > 0) {
                  // Open the infowindow indicating the elevation at the clicked position.
                  infowindow.setContent(
                    "The elevation at this point <br>is " +
                      results[0].elevation +
                      " meters."
                  );
                } else {
                  infowindow.setContent("No results found");
                }
              })
              .catch((e) =>
                infowindow.setContent("Elevation service failed due to: " + e)
              );
          }
          const cityCircle = new google.maps.Circle({
            strokeColor: "#FF0000",
            map,
            center: currentCenter,
            radius: Number(document.getElementById("distance").value) * 1609.34,
          });
          const url = `https://isitwater-com.p.rapidapi.com/?latitude=${currentCenter.lat}&longitude=${currentCenter.lng}`;
          const optionsWater = {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "33e85a234fmshfca25416192234cp1d6b6cjsnfb11f57b5b89",
              "X-RapidAPI-Host": "isitwater-com.p.rapidapi.com",
            },
          };
          try {
            const response = await fetch(url, optionsWater);
            let result = await response.text();

            console.log(result);
          } catch (error) {
            console.error(error);
          }
        }
        initMap();
      }
    });
  }
  const elevator = new google.maps.ElevationService();
});

export { address, currentCenter };
