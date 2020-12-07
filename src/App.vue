<template>
  <div id="app">
    <GoogleMapLoader></GoogleMapLoader>
  </div>
</template>

<script>
import GoogleMapLoader from '@/components/GoogleMapLoader.vue';

export default {
  components: { GoogleMapLoader },
};
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>
