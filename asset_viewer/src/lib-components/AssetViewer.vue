<template>
<div>
  
<asset-view-toolbar navMode="Orbit" @navModeChange="modeChanged" @changeHeight="heightChanged"></asset-view-toolbar>
 <asset-view ref="assetView" v-bind:xktId="xktId" :navMode="currentNavMode"></asset-view>  

</div>
</template>
<style scoped>
</style>

<script lang="ts">

import AssetView from './AssetView.vue';
import { defineComponent, ref } from 'vue'
import AssetViewToolbar from './AssetViewToolbar.vue';

export default defineComponent( {
    props: {
        xktId: String
    },
    components: {
        'asset-view-toolbar': AssetViewToolbar,
        'asset-view': AssetView
    },
    data() {
      return {
        currentNavMode: "Orbit"
      };
    },
    methods: {
        modeChanged(newMode) {
            console.log(newMode);
            this.currentNavMode = newMode;

            const item:any = this.$refs.assetView;
            item?.setNavMode(newMode);
        },
         heightChanged(height:number) {
            console.log("Set Height " + height);
            const item:any = this.$refs.assetView;
            item?.setObserverHeight(height);
        }
    }

});


</script>