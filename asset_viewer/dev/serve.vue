<script lang="ts">
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { WooyaySample } from '@/entry.esm';
import { AssetViewer, AssetViewToolbar} from '@/entry.esm';
import AssetDBClient from '../src/lib-components/AssetDBConnector';

// 5e25c97d-3678-463a-b105-287a31af763f&models=
// bd19fc4c-b086-47db-beea-8ff13ccc9f00&models=
//f39a67a5-2e02-4799-bf83-dd7a43e4abc2&models=541871c3-ae3e-422e-a237-acf7f584c16e

const client = new AssetDBClient( {
            baseUrl: "https://apim-assetdb-dev.azure-api.net/asset",
            tenantId: "F3054CC9-77E5-4EAC-A310-39CAC4ACAF3E",
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE2NDYxNDk1MTUsIm5iZiI6MTY0NjE0NTkxNSwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9hc3NldGRiLmIyY2xvZ2luLmNvbS9mMzA1NGNjOS03N2U1LTRlYWMtYTMxMC0zOWNhYzRhY2FmM2UvdjIuMC8iLCJzdWIiOiI2NTI4YTI1My0wZTc5LTRlODAtYjliMy05Y2MxZmZkZjNhNTEiLCJhdWQiOiIwZWVjNmI3YS0wNDJiLTQ4MzctYmVkNy03NWZjOTY2ZTBjOGMiLCJub25jZSI6IjE0OGFlOWMwLTZlYzMtNGE3Yi1iNWViLTU1MWFiNGEzNzI5ZSIsImlhdCI6MTY0NjE0NTkxNSwiYXV0aF90aW1lIjoxNjQ2MTM1NDE2LCJjb3VudHJ5IjoiVW5pdGVkIEtpbmdkb20iLCJuYW1lIjoiTmlnZWxNIiwicG9zdGFsQ29kZSI6Im94MyA5YnkiLCJlbWFpbHMiOlsibmlnZWxtYWduYXlAc3dnLmNvbSJdLCJ0ZnAiOiJCMkNfMV9TUzEifQ.UVXd0yI1OD31Zz33X-pcXx3kV-9x-mQ0atZ4rDw-svodO9vTevqC6JknIbYu_A63SzS0HpW3i3VVxgEm4QOatx1UglnM7_-iihC7MVyTc72PGiyp-PesuScNlJ9gSpXEhyuoj7icCQxbgwusDLI1EgCcO7jIt8CB5mSngUd_oMak8RWPuC8tO1RWA5ZBIxSkcWf74GK-RFlJq7Cgz4mdfJYvEo-DtuYGW8rhMs-z59c5rsKt_X7Nk_EWvBljtfB2fdQHIs4ZaZBBnplSCOmcal6nu-1VxcYJBd5Wn1QXo1Mvn7vErK_LO7nANWI7ZkOuyhsH4XbJP2NESmR2b9lNsQ"
        });

export default defineComponent({
  name: 'ServeDev',
   components: {
    AssetViewer,
    AssetViewToolbar
   },
   data() { return {
     bimId: "541871c3-ae3e-422e-a237-acf7f584c16e",
     client: client
   
}; }})


</script>

<template>
  <div id="app">
    
     <asset-viewer :bimId="bimId" :client="client"></asset-viewer>

  </div>
</template>
