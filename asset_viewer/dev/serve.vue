<script lang="ts">
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { WooyaySample } from '@/entry.esm';
import { AssetViewer, AssetViewToolbar} from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
   components: {
    AssetViewer,
    AssetViewToolbar
   }
});
</script>

<template>
  <div id="app">

     <asset-viewer xktId="534"></asset-viewer>

  </div>
</template>
