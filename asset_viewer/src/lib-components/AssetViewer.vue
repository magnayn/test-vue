<template>
<div class="viewer">
    <asset-view-toolbar class="toolbar" navMode="Orbit" @navModeChange="modeChanged" @changeHeight="heightChanged" :model="model"></asset-view-toolbar>
    <asset-view class="mainView" ref="assetView" v-bind:model="model" :navMode="currentNavMode"></asset-view>  
    
    <div class="footer">  </div>
</div>
</template>
<style scoped>

.viewer {

  display: flex;
  flex-direction: column;
  min-height: 100vh;

}

.toolbar {
    background-color: green;
    z-index: 1;
}

.mainView {

    flex-grow: 1;
}

.footer {
  background: #9984D4;
}

</style>

<script lang="ts">

import AssetView from './AssetView.vue';
import { defineComponent, ref } from 'vue'
import AssetViewToolbar from './AssetViewToolbar.vue';
import AssetDBClient from './AssetDBClient';

import { ModelInfo } from '../interfaces/ModelInterfaces'

interface ViewData {
    currentNavMode: String,
    model: ModelInfo|undefined|null
}

export default defineComponent( {
    props: {
        xkt: String,
        bimId: String,
        scope: String,
        client: AssetDBClient
    },
    components: {
        'asset-view-toolbar': AssetViewToolbar,
        'asset-view': AssetView
    },
    data():ViewData {
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

        if( this.xkt != null ) {
            this.model = await this.client?.fetchXkt(this.xkt);
        } else if( this.bimId != null && this.bimId != "" ) {
            this.model = await this.client?.fetchModel(this.bimId, this.scope ?? "Building");
        }
        
    },
    async updated() {
         console.log("..Updated");
        console.log(this.bimId);
        console.log(this.client);

         if( this.bimId != null && this.bimId != "" ) {
            this.model = await this.client?.fetchModel(this.bimId, this.scope ?? "Building");
        }
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