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
    ...mapGetters(['mkadPolygonCoords', 'mapConfig', 'markerCoords']),
  },
  data() {
    return {
      google: null,
      map: null,
      marker: null,
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
    ...mapMutations(['addMarkerCoords']),
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
        path: this.mkadPolygonCoords,
        map: this.map,
      });
    },

    // Обработчики событий
    initEventListeners() {
      /// 1. Обработчик клика

      this.map.addListener('click', (event) => {
        // Определяем координаты
        const latitude = event.latLng.lat();
        const longitude = event.latLng.lng();
        const latLng = new this.google.maps.LatLng(latitude, longitude);

        // Добавляем координаты клика в store и local storage
        this.addMarkerCoords([latitude, longitude]);
        localStorage.setItem('clicksCoords', JSON.stringify(this.markerCoords));

        // Если маркера нет на карте – создаем новый
        if (!this.marker) {
          this.marker = new this.google.maps.Marker({
            position: latLng,
          });
          this.marker.setMap(this.map);
        // Если маркер на карте – меняем его положение
        } else {
          this.marker.setPosition(latLng);
        }
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
