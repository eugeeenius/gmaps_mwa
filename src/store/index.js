import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mkadCoords: [
      { lat: 55.774558, lng: 37.842762 },
      { lat: 55.76522, lng: 37.842789 },
      { lat: 55.755723, lng: 37.842627 },
      { lat: 55.747399, lng: 37.841828 },
      { lat: 55.739103, lng: 37.841217 },
      { lat: 55.730482, lng: 37.840175 },
      { lat: 55.721939, lng: 37.83916 },
      { lat: 55.712203, lng: 37.837121 },
      { lat: 55.703048, lng: 37.83262 },
      { lat: 55.694287, lng: 37.829512 },
      { lat: 55.68529, lng: 37.831353 },
      { lat: 55.675945, lng: 37.834605 },
      { lat: 55.667752, lng: 37.837597 },
      { lat: 55.658667, lng: 37.839348 },
      { lat: 55.650053, lng: 37.833842 },
      { lat: 55.643713, lng: 37.824787 },
      { lat: 55.637347, lng: 37.814564 },
      { lat: 55.62913, lng: 37.802473 },
      { lat: 55.623758, lng: 37.794235 },
      { lat: 55.617713, lng: 37.781928 },
      { lat: 55.611755, lng: 37.771139 },
      { lat: 55.604956, lng: 37.758725 },
      { lat: 55.599677, lng: 37.747945 },
      { lat: 55.594143, lng: 37.734785 },
      { lat: 55.589234, lng: 37.723062 },
      { lat: 55.583983, lng: 37.709425 },
      { lat: 55.578834, lng: 37.696256 },
      { lat: 55.574019, lng: 37.683167 },
      { lat: 55.571999, lng: 37.668911 },
      { lat: 55.573093, lng: 37.647765 },
      { lat: 55.573928, lng: 37.633419 },
      { lat: 55.574732, lng: 37.616719 },
      { lat: 55.575816, lng: 37.60107 },
      { lat: 55.5778, lng: 37.586536 },
      { lat: 55.581271, lng: 37.571938 },
      { lat: 55.585143, lng: 37.555732 },
      { lat: 55.587509, lng: 37.545132 },
      { lat: 55.5922, lng: 37.526366 },
      { lat: 55.594728, lng: 37.516108 },
      { lat: 55.60249, lng: 37.502274 },
      { lat: 55.609685, lng: 37.49391 },
      { lat: 55.617424, lng: 37.484846 },
      { lat: 55.625801, lng: 37.474668 },
      { lat: 55.630207, lng: 37.469925 },
      { lat: 55.641041, lng: 37.456864 },
      { lat: 55.648794, lng: 37.448195 },
      { lat: 55.654675, lng: 37.441125 },
      { lat: 55.660424, lng: 37.434424 },
      { lat: 55.670701, lng: 37.42598 },
      { lat: 55.67994, lng: 37.418712 },
      { lat: 55.686873, lng: 37.414868 },
      { lat: 55.695697, lng: 37.407528 },
      { lat: 55.702805, lng: 37.397952 },
      { lat: 55.709657, lng: 37.388969 },
      { lat: 55.718273, lng: 37.383283 },
      { lat: 55.728581, lng: 37.378369 },
      { lat: 55.735201, lng: 37.374991 },
      { lat: 55.744789, lng: 37.370248 },
      { lat: 55.75435, lng: 37.369188 },
      { lat: 55.762936, lng: 37.369053 },
      { lat: 55.771444, lng: 37.369619 },
      { lat: 55.779722, lng: 37.369853 },
      { lat: 55.789542, lng: 37.372943 },
      { lat: 55.79723, lng: 37.379824 },
      { lat: 55.805796, lng: 37.386876 },
      { lat: 55.814629, lng: 37.390397 },
      { lat: 55.823606, lng: 37.393236 },
      { lat: 55.83251, lng: 37.395275 },
      { lat: 55.840376, lng: 37.394709 },
      { lat: 55.850141, lng: 37.393056 },
      { lat: 55.858801, lng: 37.397314 },
      { lat: 55.867051, lng: 37.405588 },
      { lat: 55.872703, lng: 37.416601 },
      { lat: 55.877041, lng: 37.429429 },
      { lat: 55.881091, lng: 37.443596 },
      { lat: 55.882828, lng: 37.459065 },
      { lat: 55.884625, lng: 37.473096 },
      { lat: 55.888897, lng: 37.48861 },
      { lat: 55.894232, lng: 37.5016 },
      { lat: 55.899578, lng: 37.513206 },
      { lat: 55.90526, lng: 37.527597 },
      { lat: 55.907687, lng: 37.543443 },
      { lat: 55.909388, lng: 37.559577 },
      { lat: 55.910907, lng: 37.575531 },
      { lat: 55.909257, lng: 37.590344 },
      { lat: 55.905472, lng: 37.604637 },
      { lat: 55.901637, lng: 37.619603 },
      { lat: 55.898533, lng: 37.635961 },
      { lat: 55.896973, lng: 37.647648 },
      { lat: 55.895449, lng: 37.667878 },
      { lat: 55.894868, lng: 37.681721 },
      { lat: 55.893884, lng: 37.698807 },
      { lat: 55.889094, lng: 37.712363 },
      { lat: 55.883555, lng: 37.723636 },
      { lat: 55.877501, lng: 37.735791 },
      { lat: 55.874698, lng: 37.741261 },
      { lat: 55.862464, lng: 37.764519 },
      { lat: 55.861979, lng: 37.765992 },
      { lat: 55.850257, lng: 37.788216 },
      { lat: 55.850383, lng: 37.788522 },
      { lat: 55.844167, lng: 37.800586 },
      { lat: 55.832707, lng: 37.822819 },
      { lat: 55.828789, lng: 37.829754 },
      { lat: 55.821072, lng: 37.837148 },
      { lat: 55.811599, lng: 37.838926 },
      { lat: 55.802781, lng: 37.840004 },
      { lat: 55.793991, lng: 37.840965 },
      { lat: 55.785017, lng: 37.841576 },
    ],
    mapConfig: {
      center: { lat: 55.753994, lng: 37.622093 },
      clickableIcons: false,
      streetViewControl: false,
      panControlOptions: false,
      mapTypeControl: false,
      zoom: 9,
      minZoom: 7,
    },
    markerCoords: [],
    currentMarkerCoords: [],
    path: [],
  },

  mutations: {
    storeMarkerCoords: (state, coords) => {
      state.markerCoords.push(coords);
      state.currentMarkerCoords = coords;
    },
    updatePath: (state, path) => {
      state.path = path;
    },
  },
  actions: {
  },
  getters: {
    mkadCoords: (state) => state.mkadCoords,
    mapConfig: (state) => state.mapConfig,
    markerCoords: (state) => state.markerCoords,
  },

});
