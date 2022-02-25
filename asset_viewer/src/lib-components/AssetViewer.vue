<template>
<div>
  
<asset-view-toolbar navMode="Orbit" @navModeChange="modeChanged" @changeHeight="heightChanged" :model="model"></asset-view-toolbar>
 <asset-view ref="assetView" v-bind:model="model" :navMode="currentNavMode"></asset-view>  

</div>
</template>
<style scoped>
</style>

<script lang="ts">

import AssetView from './AssetView.vue';
import { defineComponent, ref } from 'vue'
import AssetViewToolbar from './AssetViewToolbar.vue';
import AssetDBClient from './AssetDBConnector';

export default defineComponent( {
    props: {
        bimId: String,
        scope: String,
        client: AssetDBClient
    },
    components: {
        'asset-view-toolbar': AssetViewToolbar,
        'asset-view': AssetView
    },
    data() {
      return {
        currentNavMode: "Orbit",
        model: null
      };
    },
    async mounted() {
        console.log("..Mounted");
        console.log(this.bimId);
        console.log(this.scope);
        console.log(this.client);

        this.model = await this.client?.fetchModel(this.bimId ?? "", this.scope ?? "Building");
        
    },
    updated() {
         console.log("..Updated");
        console.log(this.bimId);
        console.log(this.client);
    },
    methods: {
        modeChanged(newMode) {
            console.log(newMode);
            this.currentNavMode = newMode;

            const item:any = this.$refs.assetView;
            item?.setNavMode(newMode);


            console.log("NAV: ");
            console.log( item.nav);

        },
         heightChanged(height:number) {
            console.log("Set Height " + height);
            const item:any = this.$refs.assetView;
            item?.setObserverHeight(height);
        },
        cameraPositionChanged() {
        
console.log("CAMERA POSITION CHANGE");

        const item:any = this.$refs.assetView;
        if( item == null )
            return;

    var svg_doc = document.getElementById('navBIRDSEYEdiv')?.children[0];
    if( !svg_doc )
      return;
    try {
      // TODO
        // var viewbox = svg_doc.getAttribute('viewBox')?.split(" ");
        // var viewboxminy = Number(viewbox[1]);
        // var viewboxhgt = Number(viewbox[3]);
        // var SVGtruminy = (viewboxminy * 1) + (viewboxhgt * 1);

        // var SVGx = (this.viewer.scene.camera.eye[0] * 10);
        // var SVGy = SVGtruminy - ((this.viewer.scene.camera.eye[1] * 10));

        // document.getElementById("SVGPOSCAM").setAttribute("cx", ""+ SVGx);
        // document.getElementById("SVGPOSCAM").setAttribute("cy", ""+ SVGy);
        // document.getElementById("SVGPOSCAM").setAttribute("r", ""+ 2000 / this.model.birdsEye.boxscale);

        // document.getElementById("SVGDIRCAM").setAttribute("x1", ""+SVGx);
        // document.getElementById("SVGDIRCAM").setAttribute("y1", ""+SVGy);
        // SVGx = (this.viewer.scene.camera.look[0] * 10);
        // SVGy = SVGtruminy - ((this.viewer.scene.camera.look[1] * 10));
        // document.getElementById("SVGDIRCAM").setAttribute("x2", ""+ SVGx);
        // document.getElementById("SVGDIRCAM").setAttribute("y2", ""+SVGy);



        //alert(this.viewer.scene.camera.eye[0]);
        //alert(SVGdoc.getElementById("SVGCAMPOS").)
    } catch (err) {
        // NADA
    }
    var viewer = item.viewer;

    document.getElementById('DEBUGINFO')!.innerHTML = 'Obj Count=' + viewer.scene.numObjects +
        ' campos ' + Math.round(viewer.scene.camera.eye[0]) + ',' +
        Math.round(viewer.scene.camera.eye[1]) + ',' +
        Math.round(viewer.scene.camera.eye[2]) + 'camlook ' +
        Math.round(viewer.scene.camera.look[0]) + ',' +
        Math.round(viewer.scene.camera.look[1]) + ',' +
        Math.round(viewer.scene.camera.look[2]) + 'camUP ' +
        Math.round(viewer.scene.camera.up[0]) + ',' +
        Math.round(viewer.scene.camera.up[1]) + ',' +
        Math.round(viewer.scene.camera.up[2]);

    //Set elevation icon
   // svg_doc = document.getElementById('navELEVATIONgraphic')!;
   // document.getElementById("SVGPOSCAMelev")?.setAttribute("cy", "" + (300 - ((this.viewer.scene.camera.eye[2] * 10) * this.model.elevationScale)));


}
    }

});


</script>