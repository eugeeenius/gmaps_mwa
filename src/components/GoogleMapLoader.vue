<template>
  <div>
    <div
      class="google-map"
      ref="googleMap"
    >
    <div>

    </div>
    </div>
    <template v-if="!!this.google && !!this.map">
      <slot
        :google="google"
        :map="map"
      />
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader';
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters(['mkadCoords', 'mapConfig', 'markerCoords']),
  },
  data() {
    return {
      google: null,
      map: null,
      directionDisplay: null,
      apiKey: 'AIzaSyDYeY06dAQKJCXew39kQmKS4Xs327uUocY',
    };
  },

  async mounted() {
    // Подключаемся к Gmaps API с помощью плагина
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey,
    });

    this.google = googleMapApi;

    this.initializeMap();
    this.createPolygon();
    this.initEventListeners();
  },

  methods: {
    ...mapMutations(['storeMarkerCoords']),
    // Функция инициализации карты
    initializeMap() {
      const config = this.mapConfig;
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapContainer, config);
    },

    // Функция для создания полигона
    createPolygon() {
      const { Polygon } = this.google.maps;

      return new Polygon({
        path: this.mkadCoords,
        map: this.map,
      });
    },

    // Функция поиска ближайшей точки мкада и построения маршрута
    determinePath(marker, polygon) {
      // Определяем массив всех путей до точек на мкаде
      const allPath = polygon.map((p) => {
        const point = new this.google.maps.LatLng(p);
        return this.google.maps.geometry.spherical.computeDistanceBetween(marker, point);
      });

      // Находим кратчайший путь
      const shortestPath = Math.min(...allPath);

      // Его индекс будет соответствовать индексу точки в массиве mkadCoords
      const closestPointIndex = allPath.indexOf(shortestPath);
      const closestPoint = this.mkadCoords[closestPointIndex];

      this.calculateAndRenderDrivingDirection(marker, closestPoint);
      this.renderStraightDirection(marker, closestPoint);
    },

    // Функция рендеринга пути на машине
    calculateAndRenderDrivingDirection(origin, destination) {
      if (this.directionDisplay) {
        this.directionDisplay.setMap(null);
      }

      this.directionDisplay = new this.google.maps.DirectionsRenderer();
      const directionsService = new this.google.maps.DirectionsService();
      const request = {
        origin,
        destination,
        travelMode: 'DRIVING',
      };

      this.directionDisplay.setMap(this.map);

      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          this.directionDisplay.setDirections(result);
        }
      });
    },

    // Функция рендеринга пути по воздуху
    renderStraightDirection(...arr) {
      const { Polyline } = this.google.maps;
      if (this.straightPath) {
        this.straightPath.setMap(null);
      }

      this.straightPath = new Polyline({
        path: arr,
        map: this.map,
        strokeColor: 'red',
        strokeOpacity: 0.9,
      });
    },

    // Функция добавления баллуна с адресом точки
    renderInfoWindow(coords, address) {
      if (this.info) {
        this.info.setMap(null);
      }
      this.info = new this.google.maps.InfoWindow({
        content: address,
        position: coords,
      });
      this.info.setMap(this.map);
    },

    // Получаем адрес и рендерим его в баллуне
    async getAddress(coords) {
      const geocoder = new this.google.maps.Geocoder();

      await geocoder.geocode({ location: coords }, (result, status) => {
        if (status === 'OK') {
          const address = result[0].formatted_address;
          this.renderInfoWindow(coords, address);
        } else {
          this.renderInfoWindow(coords, 'Адрес не найден');
        }
      });
    },

    // Обработчики событий
    initEventListeners() {
      /// Обработчик клика

      this.map.addListener('click', (event) => {
        // Определяем координаты
        const latitude = event.latLng.lat();
        const longitude = event.latLng.lng();
        const latLng = new this.google.maps.LatLng(latitude, longitude);

        // Добавляем координаты клика в store и local storage
        this.storeMarkerCoords([latitude, longitude]);
        localStorage.setItem('clicksCoords', JSON.stringify(this.markerCoords));

        this.determinePath(latLng, this.mkadCoords);
        this.getAddress(latLng);
      });
    },
  },
};
</script>

<style scoped>
.google-map {
  width: 100vw;
  min-height: 100vh;
}
</style>
