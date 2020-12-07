<template>
  <div>
    <div
      class="google-map"
      ref="googleMap"
    >
    <div>

    </div>
    </div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
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
    };
  },

  async mounted() {
    // Подключаемся к Gmaps API с помощью плагина
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: 'AIzaSyDYeY06dAQKJCXew39kQmKS4Xs327uUocY',
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

      this.mkadPolygon = new Polygon({
        path: this.mkadCoords,
        map: this.map,
      });
    },

    // Функция поиска ближайшей точки мкада и построения маршрута
    determinePath(marker, polygon) {
      const g = this.google;
      // Определяем массив всех путей до точек на мкаде
      const allPath = polygon.map((p) => {
        const point = new g.maps.LatLng(p);
        return g.maps.geometry.spherical.computeDistanceBetween(marker, point);
      });

      // Находим кратчайший путь
      const shortestPath = Math.min(...allPath);

      // Его индекс будет соответствовать индексу точки в массиве mkadCoords
      const closestPointIndex = allPath.indexOf(shortestPath);
      const closestPoint = this.mkadCoords[closestPointIndex];
      // console.log(closestPoint)
      this.calculateAndRenderDirection(marker, closestPoint);
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
    renderStraightDirection() {

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

        // Если маркера нет на карте – создаем новый
        // if (!this.marker) {
        //   this.marker = new this.google.maps.Marker({
        //     position: latLng,
        //   });
        //   this.marker.setMap(this.map);
        // // Если маркер на карте – меняем его положение
        // } else {
        //   this.marker.setPosition(latLng);
        // }
        this.determinePath(latLng, this.mkadCoords);
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
