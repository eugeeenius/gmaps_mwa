<template>
  <div id="app">
    <GmapMap
  :center="{lat:55.753994, lng:37.622093}"
  :zoom="9"
  :options="{disableDefaultUI:true}"
  map-type-id="roadmap"
  style="width: 100vw; height: 100vh"
>
  <!-- <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  /> -->
  <GmapPolygon :paths="mkadCoords"> </GmapPolygon>
  </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps';
import Vue from 'vue';
import { mapGetters } from 'vuex';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDYeY06dAQKJCXew39kQmKS4Xs327uUocY',
    // libraries: 'places',
  },
  installComponents: true,
});

export default {
  
  computed: {
    mapGetters(['mkadPolygonCoords'])
  },
  // mounted() {
  // },
};
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>
