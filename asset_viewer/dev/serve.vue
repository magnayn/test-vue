<script lang="ts">
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { WooyaySample } from '@/entry.esm';
import { AssetViewer, AssetViewToolbar} from '@/entry.esm';
import AssetDBClient from '../src/lib-components/AssetDBConnector';

const client = new AssetDBClient( {
            baseUrl: "http://localhost:7071",
            tenantId: "F3054CC9-77E5-4EAC-A310-39CAC4ACAF3E"
        });

export default defineComponent({
  name: 'ServeDev',
   components: {
    AssetViewer,
    AssetViewToolbar
   },
   data() { return {
     bimId: "B77B1FB6-FCC7-4A68-B296-B0660C60280C",
     client: client
   
}; }})

</script>

<template>
  <div id="app">
    hello
     <asset-viewer :bimId="bimId" :client="client"></asset-viewer>

  </div>
</template>
