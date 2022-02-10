<template>
<div>
  
<asset-view-toolbar></asset-view-toolbar>
<asset-view v-bind:xktId="xktId"></asset-view>

</div>
</template>
<style scoped>
</style>

<script lang="ts">

import AssetView from './AssetView.vue';
import { defineComponent } from 'vue'
import AssetViewToolbar from './AssetViewToolbar.vue';

export default defineComponent( {
    props: {
        xktId: String
    },
    components: {
        'asset-view-toolbar': AssetViewToolbar,
        'asset-view': AssetView
    }

});


</script>