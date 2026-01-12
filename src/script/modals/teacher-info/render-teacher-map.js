import L from "leaflet";
import "leaflet/dist/leaflet.css";
import _ from "lodash-es";

let leafletMap = null;

export const renderTeacherMap = async (user) => {
    const mapContainer = document.getElementById("map");
    if (!mapContainer) return;

    if (leafletMap) {
        leafletMap.remove();
        leafletMap = null;
    }

    leafletMap = L.map("map").setView([0, 0], 2);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(leafletMap);

    const lat = _.toNumber(_.get(user, "coordinates.latitude"));
    const lng = _.toNumber(_.get(user, "coordinates.longitude"));
    const hasCoords = !_.isNaN(lat) && !_.isNaN(lng) && lat !== 0 && lng !== 0;

    let coords = [0, 0];
    if (hasCoords) {
        coords = [lat, lng];
    } else {
        const country = _.get(user, "country", "");
        if (country) {
            try {
                const data = await (await fetch(`/api/get-country-coords?country=${encodeURIComponent(country)}`)).json();
                if (data.ok && Array.isArray(data.coords)) {
                    coords = data.coords.map(Number);
                    if (coords.some(isNaN)) coords = [0, 0];
                }
            } catch (err) {
                console.error("Error fetching country coords:", err);
            }
        }
    }

    L.marker(coords)
        .addTo(leafletMap)
        .bindPopup(`<b>${user.country || ""}</b>`)
        .openPopup();

    leafletMap.setView(coords, hasCoords ? 8 : 4);

    setTimeout(() => leafletMap.invalidateSize(), 200);
};
