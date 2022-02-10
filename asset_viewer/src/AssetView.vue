<template>
  <div class="hello">
    Asset View
 <button v-on:click="buttonClick">Click</button>

  <div id="canvasWrapper">
      <canvas id="myCanvas"></canvas>
  </div>

  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import {Viewer, WebIFCLoaderPlugin, XKTLoaderPlugin} from '@xeokit/xeokit-sdk/dist/xeokit-sdk.es.js';

export default class AssetView extends Vue {
buttonClick() {
    console.log("WAKKA");

    const viewer = new Viewer({
         canvasId: "myCanvas",
          transparent: true
      });

    //  viewer.camera.eye = [-3.933, 2.855, 27.018];
    //  viewer.camera.look = [4.400, 3.724, 8.899];
    //  viewer.camera.up = [-0.018, 0.999, 0.039];

    viewer.scene.xrayMaterial.fillColor = [0.0, 0.0, 1.0];
    viewer.scene.xrayMaterial.edgeColor = [0.0, 0.0, 0.0];
    viewer.scene.xrayMaterial.fillAlpha = 0.05;
    viewer.scene.xrayMaterial.edgeAlpha = 0.3;

    const url = "/files/";
    console.log("URL " + url);

//  const webIFCLoader = new WebIFCLoaderPlugin(viewer, {
//            wasmPath: url
//        });

    // const model = webIFCLoader.load({
    //     id: "myModel",
    //   //   src: "/models/ifc/Duplex.ifc",
    //      src: "/models/xkt/v8/ifc/Duplex.ifc.xkt ifc/Duplex.ifc",
    //      excludeTypes: ["IfcSpace"],
    //      edges: true
    //  });


  const xktLoader = new XKTLoaderPlugin(viewer);


    const model = xktLoader.load({          // Returns an Entity that represents the model
    id: "myModel",
    src: "http://localhost:57914/api/v1/asset/xkt/REQ-4-1.xkt",
    //src: "./models/xkt/v2/WestRiverSideHospital/architectural.xkt",
    edges: true
});

  console.log("wombat");


model.on("loaded", () => {

    //--------------------------------------------------------------------------------------------------------------
    // 1. Find metadata on the third storey
    // 2. Select all the objects in the building's third storey
    // 3. Fit the camera to all the objects on the third storey
    //--------------------------------------------------------------------------------------------------------------

    // 1
     const metaModel = viewer.metaScene.metaModels["myModel"];       // MetaModel with ID "myModel"
    
      console.log(metaModel);
      
    // const metaObject
    //      = viewer.metaScene.metaObjects["0u4wgLe6n0ABVaiXyikbkA"];  // MetaObject with ID "0u4wgLe6n0ABVaiXyikbkA"

    // const name = metaObject.name;                                   // "01 eerste verdieping"
    // const type = metaObject.type;                                   // "IfcBuildingStorey"
    // const parent = metaObject.parent;                               // MetaObject with type "IfcBuilding"
    // const children = metaObject.children;                           // Array of child MetaObjects
    // const objectId = metaObject.id;                                 // "0u4wgLe6n0ABVaiXyikbkA"
    // const objectIds = viewer.metaScene.getObjectIDsInSubtree(objectId);   // IDs of leaf sub-objects
    // const aabb = viewer.scene.getAABB(objectIds);                   // Axis-aligned boundary of the leaf sub-objects

    // // 2
    // viewer.scene.setObjectsSelected(objectIds, true);

    // // 3
    // viewer.cameraFlight.flyTo(aabb);
});

}

  mounted() {
      console.log("Mounted");       
  }
}

</script>