mapboxgl.accessToken = Token;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listingdata.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

const marker = new mapboxgl.Marker({color:"red"})
        .setLngLat(listingdata.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML(`<h4>${listingdata.title}</h4> <p>Exact Location will be provided after booking</p>`))
        .addTo(map);