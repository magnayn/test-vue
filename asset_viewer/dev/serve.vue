<script lang="ts">
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { WooyaySample } from '@/entry.esm';
import { AssetViewer, AssetViewToolbar} from '@/entry.esm';
import AssetDBClient from '../src/lib-components/AssetDBConnector';

const client = new AssetDBClient( {
            baseUrl: "http://localhost:57914"
        });

export default defineComponent({
  name: 'ServeDev',
   components: {
    AssetViewer,
    AssetViewToolbar
   },
   data() { return {
     xktId: "534",
     client: client
   
}; }})

</script>

<template>
  <div id="app">
     <asset-viewer :xktId="xktId" :client="client"></asset-viewer>

  </div>
</template>
