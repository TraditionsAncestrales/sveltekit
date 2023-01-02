import markerIconRetinaURL from 'leaflet/dist/images/marker-icon-2x.png';
import markerIconURL from 'leaflet/dist/images/marker-icon.png';
import markerShadowURL from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

export const setMap = (mapElement: HTMLElement, {lat, lng, marker = '', zoom}: MapO) => {
  (async () => {
    const {icon: leafletIcon, map: leafletMap, marker: leafletMarker, tileLayer} = await import('leaflet');

		const markerIcon = leafletIcon({
			iconSize: [25, 41],
			iconAnchor: [10, 41],
			popupAnchor: [2, -40],
			iconUrl: markerIconURL,
			iconRetinaUrl: markerIconRetinaURL,
			shadowUrl: markerShadowURL,
		});

    const map = leafletMap(mapElement).setView([lat, lng], zoom);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		//tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}{r}?access_token={accessToken}', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: import.meta.env.PUBLIC_MAPBOX_ACCESS_TOKEN,
      detectRetina: true,
    }).addTo(map);

    marker === '' ? leafletMarker([lat, lng], { icon: markerIcon }).addTo(map) : leafletMarker([lat, lng], { icon: markerIcon }).bindPopup(marker).addTo(map);
  })();
};

// TYPES ===================================================================================================================================
type MapO = {lat: number; lng: number; marker?: string; zoom: number};
