<script lang="ts">
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { WooyaySample } from '@/entry.esm';
import { AssetViewer, AssetViewToolbar} from '@/entry.esm';
import AssetDBClient from '../src/lib-components/AssetDBClient';
import { ElButton } from 'element-plus';


const client = new AssetDBClient( {
            baseUrl: "https://apim-assetdb-dev.azure-api.net/asset",
            tenantId: "F3054CC9-77E5-4EAC-A310-39CAC4ACAF3E",
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE2NDYyMzc0NzYsIm5iZiI6MTY0NjIzMzg3NiwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9hc3NldGRiLmIyY2xvZ2luLmNvbS9mMzA1NGNjOS03N2U1LTRlYWMtYTMxMC0zOWNhYzRhY2FmM2UvdjIuMC8iLCJzdWIiOiI2NTI4YTI1My0wZTc5LTRlODAtYjliMy05Y2MxZmZkZjNhNTEiLCJhdWQiOiIwZWVjNmI3YS0wNDJiLTQ4MzctYmVkNy03NWZjOTY2ZTBjOGMiLCJub25jZSI6IjUyMTIyNGFkLWFlY2UtNDA2Zi05MzhlLTM0NWY4NmZhNTQ5MSIsImlhdCI6MTY0NjIzMzg3NiwiYXV0aF90aW1lIjoxNjQ2MjMzODc2LCJjb3VudHJ5IjoiVW5pdGVkIEtpbmdkb20iLCJuYW1lIjoiTmlnZWxNIiwicG9zdGFsQ29kZSI6Im94MyA5YnkiLCJlbWFpbHMiOlsibmlnZWxtYWduYXlAc3dnLmNvbSJdLCJ0ZnAiOiJCMkNfMV9TUzEifQ.s2ff3c8Xud6RaAkLXjgtIlSjAREWAAFhD7-pyqXN3N-LkifO6OoFg2RWyfPw4d5onAHd3AX_X8HgltzEpxjw-rqyBQ7J4GR6LKk0LMz-nJZJKPV-rSbDgbGLaJzCG6bFLPiSgy9y6d2wTN2qKqODSYYIvTkT_eEh6M301xYSEDG2u4fy6DqmjjFF11cv26WSskpsm_g7O8MZYiJBfw0ejstIe7lIuix3rjqXlEReFIY69U7vqom8bfRWE5uuxCAXqa6-oHM1BNK9Io4Q7Iy5fqNMlZtdDcPQ0ARUYayfT5LQs45dA25xBbhCUupnRH-Bc7f28DWJyvIrwccnP0l_Bg"
        });

export default defineComponent({
  name: 'ServeDev',
   components: {
    AssetViewer,
    AssetViewToolbar,
    ElButton
   },
   data() { return {
     xkt: "http://localhost:8080/assets/Duplex.ifc.xkt",
     
     client: client
   
}; }})


</script>

<style scoped>

</style>

<template>
 <el-button>I am ElButton</el-button>
     <el-dropdown class="m-4" type="primary">
    <el-button type="primary" plain>
      Dropdown List<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item>Action 4</el-dropdown-item>
        <el-dropdown-item>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
     <asset-viewer :xkt="xkt" :client="client"></asset-viewer>


</template>
