const locationName = mapData.location;

fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`
)
    .then(response => response.json())
    .then(data => {

        if (data.length === 0) {
            console.log("Location not found");
            return;
        }

        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        const map = L.map("map").setView([lat, lon], 13);

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution: "&copy; OpenStreetMap contributors"
            }
        ).addTo(map);

        L.marker([lat, lon])
            .addTo(map)
            .bindPopup(locationName)
            .openPopup();
    })
    .catch(error => {
        console.log("Map error:", error);
    });