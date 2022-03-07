<template>
  <div id="myViewer">
    <canvas id="myCanvas"></canvas>
    <canvas id="myNavCubeCanvas"></canvas>
    <canvas id="mySectionPlanesOverviewCanvas"></canvas>
    <div id="storeyMap"></div>
  </div> 
</template>
<style>
/* this currently isn't scoped as it's being added to the end of the document. It could likely be
   either added directly to the viewer as a div or scoped there. */
 #planPointer {

            color: #000000;
            line-height: 1.8;
            text-align: center;
            font-family: "monospace";
            font-weight: bold;
            position: absolute;
            width: 60px;
            height: 60px;
            background-image: url(../assets/IMAGES/storeyMapCamera.png);
            background-repeat: no-repeat;
            background-size: 60px 60px;
        }
        
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#myViewer {
  width: 100%;
  display: flex;
  background: green;
}

#myCanvas {

  flex: 1 1 auto;
  
  background: white;

}

#storeyMap {
            position: absolute;
            left: 10px;
            top: 60px;
            margin-top: 20px;
            overflow-y: hidden;
            height: auto;
            pointer-events: all;
            width: auto;
            user-select: none;
            border: 1px solid red;
        }

       

#controls {
  font-size: 13px;
  position: absolute;
  top: 10px;
  width: 100%;
  pointer-events: all;
  opacity: 0.8;
  text-align: center;
  background-color: orange;
}

#info {
  font-size: 13px;
  position: absolute;
  top: 60px;
  right: 10px;
  pointer-events: all;
  opacity: 0.8;
  border: 1px black solid;
  background-color: aqua;
}

#stats {
  font-size: 10px;
  position: absolute;
  bottom: 5px;
  right: 5px;
  pointer-events: all;
  opacity: 0.8;
  border: 1px black solid;
  background-color: aqua;
}

#mySectionPlanesOverviewCanvas {
  display: none;
  position: absolute;
  width: 250px;
  height: 250px;
  bottom: 1870px;
  right: 10px;
  z-index: 200000;
}
div.tbicon {
  float: left;
  width: 40px;
  height: 36px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #cccccc;
}

#myNavCubeCanvas {
    position: absolute;
    width: 200px;
    height: 200px;
    bottom: 50px;
    right: 0px;
    z-index: 200000;
}

</style>

<script lang="ts">
import { defineComponent } from "vue";
// import {Viewer, WebIFCLoaderPlugin, XKTLoaderPlugin} from '@xeokit/xeokit-sdk/dist/xeokit-sdk.es.js';
import {
  Viewer,
  SectionPlanesPlugin,
  DistanceMeasurementsPlugin,
  FastNavPlugin,
  ViewCullPlugin,
  NavCubePlugin,
  ContextMenu,
  WebIFCLoaderPlugin,
  ObjectsMemento,
  CameraMemento,
  StoreyViewsPlugin,
  math,
  XKTLoaderPlugin,
} from "@xeokit/xeokit-sdk/dist/xeokit-sdk.es.js";

export const canStandOnTypes = {
  // IFC types we can stand on in first-person mode
  IfcSlab: true,
  IfcStair: true,
  IfcFloor: true,
  IfcFooting: true,
};

import ModelLoader from './ModelLoader';
import { ModelInfo } from "../interfaces/ModelInterfaces";



class VData {
  viewer: any;
  sectionPlanes: any;


  GUISETTING_cutplanes = false;

  cameraControl: any;
  distanceMeasurements: any;
  storeyViewer?: SWGStoreyViewer;
  mapColor: any = new Map();

  // XKT data
  loader?:ModelLoader;
  
  selectMode = "select";
  isFP = false;
  worldPos = math.vec3();
  mode = "2d";

  nav = {
        
                    standardHeight: { drone: 3000, person: 150 },
                    observerHeight: 160,
                    mode: "ORBIT",
                    targetLock: true,
                    loadedRooms: ",,",

                    current_elev: 1,
                    mlayout: ""
                };
  


  // Selected Item ID
  itemId:string = "";
}

class SWGStoreyViewer
{
  modelLoader:ModelLoader;
  storeyViewsPlugin:StoreyViewsPlugin;

  constructor(modelLoader:ModelLoader) {
    this.modelLoader = modelLoader; 
    this.storeyViewsPlugin = new StoreyViewsPlugin(this.modelLoader.viewer);
  }

  show(id:string) {
      const storey = this.storeyViewsPlugin.storeys[id]; // ID of the IfcBuildingStorey

      const modelId  = storey.modelId;  // "myModel"
      const storeyId = storey.storeyId; // "2SWZMQPyD9pfT9q87pgXa1"
      const aabb     = storey.aabb;     // Axis-aligned 3D World-space boundary of the IfcBuildingStorey

      this.storeyViewsPlugin.showStoreyObjects(id);

      const storeyMap = this.storeyViewsPlugin.createStoreyMap(id, {
          width: 300,
          format: "png"
      });

      // Create the image
        const img = document.createElement("img");
        img.src = storeyMap.imageData;
        img.style.width = storeyMap.width + "px";
        img.style.height = storeyMap.height + "px";
        img.style.padding = "0";
        img.style.margin = "0";

      // Add to the div
        const storeyMapDiv = document.getElementById("storeyMap")!;
        storeyMapDiv.appendChild(img);


        const pointer = document.createElement("div");
        pointer.id = "planPointer";
        pointer.style.width = "60px";
        pointer.style.height = "60px";
        pointer.style.position = "absolute";
        pointer.style["z-index"] = 100000;
        pointer.style.left = "0px";
        pointer.style.top = "0px";
        pointer.style.cursor = "none";
        pointer.style["pointer-events"] = "none";
        pointer.style.transform = "rotate(0deg)";
        pointer.style.visibility = "hidden";
        document.body.appendChild(pointer);

        const canStandOnTypes = {
            IfcSlab: true,
            IfcStair: true,
            IfcFloor: true,
            IfcFooting: true
        };

        img.onmouseenter = (e) => {
            img.style.cursor = "default";
        };

        img.onmousemove = (e) => {
            
            img.style.cursor = "default";

            const imagePos = [e.offsetX, e.offsetY];

            const pickResult = this.storeyViewsPlugin.pickStoreyMap(storeyMap, imagePos, {});

            if (pickResult) {

                const entity = pickResult.entity;
                const metaObject = this.modelLoader.viewer.metaScene.metaObjects[entity.id];

                if (metaObject) {
                    if (canStandOnTypes[metaObject.type]) {
                        img.style.cursor = "pointer";
                    }
                }
            }
        };

        img.onmouseleave = (e) => {
            img.style.cursor = "default";
        };

        const worldPos = math.vec3();

        img.onclick = (e) => {
            const viewer = this.modelLoader.viewer;
            const imagePos = [e.offsetX, e.offsetY];
            const pickResult = this.storeyViewsPlugin.pickStoreyMap(storeyMap, imagePos, {
                pickSurface: true
            });
            if (pickResult) {

                worldPos.set(pickResult.worldPos);

                // Set camera vertical position at the mid point of the storey's vertical
                // extents - note how this is adapts to whichever of the X, Y or Z axis is
                // designated the World's "up" axis

                
                const camera = viewer.scene.camera;
                const idx = camera.xUp ? 0 : (camera.yUp ? 1 : 2); // Find the right axis for "up"
                const storey = this.storeyViewsPlugin.storeys[storeyMap.storeyId];
                worldPos[idx] = (storey.aabb[idx] + storey.aabb[3 + idx]) / 2;

                viewer.cameraFlight.flyTo({
                    eye: worldPos,
                    up: viewer.camera.worldUp,
                    look: math.addVec3(worldPos, viewer.camera.worldForward, []),
                    projection: "perspective",
                    duration: 1.5
                }, () => {
                    viewer.cameraControl.navMode = "firstPerson";
                });
            } else {
                this.storeyViewsPlugin.gotoStoreyCamera(id, {
                    projection: "ortho",
                    duration: 1.5,
                    done: () => {
                        viewer.cameraControl.navMode = "planView"
                    }
                });
            }
        };

        const imagePos = math.vec2();
        const worldDir = math.vec3();
        const imageDir = math.vec2();

        const updatePointer = () => {
          
            const viewer = this.modelLoader.viewer;
            const eye = viewer.camera.eye;
            const storeyId = this.storeyViewsPlugin.getStoreyContainingWorldPos(eye);
            if (!storeyId) {
                hidePointer();
                return;
            }
            const inBounds = this.storeyViewsPlugin.worldPosToStoreyMap(storeyMap, eye, imagePos);
            if (!inBounds) {
                hidePointer();
                return;
            }
            var offset = getPosition(img);
            imagePos[0] += offset.x;
            imagePos[1] += offset.y;

            this.storeyViewsPlugin.worldDirToStoreyMap(storeyMap, worldDir, imageDir);

            showPointer(imagePos, imageDir);
        };
        
        const viewer = this.modelLoader.viewer;
        viewer.camera.on("viewMatrix", updatePointer);
        viewer.scene.canvas.on("boundary", updatePointer);

        function getPosition(el) {
            var xPos = 0;
            var yPos = 0;
            while (el) {
                if (el.tagName === "BODY") {      // deal with browser quirks with body/window/document and page scroll
                    var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                    var yScroll = el.scrollTop || document.documentElement.scrollTop;
                    xPos += (el.offsetLeft - xScroll + el.clientLeft);
                    yPos += (el.offsetTop - yScroll + el.clientTop);
                } else {
                    // for all other non-BODY elements
                    xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                    yPos += (el.offsetTop - el.scrollTop + el.clientTop);
                }
                el = el.offsetParent;
            }
            return {x: xPos, y: yPos};
        }

        function hidePointer() {
            pointer.style.visibility = "hidden";
        }

        function showPointer(imagePos, imageDir) {

            const angleRad = Math.atan2(imageDir[0], imageDir[1]);
            const angleDeg = Math.floor(180 * angleRad / Math.PI);

            pointer.style.left = (imagePos[0] - 30) + "px";
            pointer.style.top = (imagePos[1] - 30) + "px";
            pointer.style.transform = "rotate(" + -(angleDeg - 45) + "deg)";
            pointer.style.visibility = "visible";
        }
    
  }
}

export default defineComponent({
  props: {
    model: {
      type: Object as () => ModelInfo
    },
    navMode: String
  },
  data() {
    return new VData();
  },
  beforeUpdate() {
    console.log("VIEW BeforeUpdate");
        console.log(this.model);
    console.log(this.navMode);
  },
  updated() {
    console.log("VIEW Updated");
        console.log(this.model);
    console.log(this.navMode);

    
    this.LoadXKT();

  },
  async mounted() {
    console.log("VIEW Mounted");
    console.log(this.navMode);
    console.log(this.model);

    this.viewer = new Viewer({
      canvasId: "myCanvas",
      transparent: true,
      logarithmicDepthBufferEnabled: false,
      antialias: true,
    });

    this.sectionPlanes = new SectionPlanesPlugin(this.viewer, {
      overviewCanvasId: "mySectionPlanesOverviewCanvas",
      overviewVisible: true,
    });


    console.log("INITY " + this.model?.id);
    console.log(this.nav);
    //this.nav = this.model!.nav;

    console.log("OUTY");
    console.log(this.nav);

    console.log(this.model);

    this.setupCamera();

    if( this.navMode != undefined )
    {
      this.setNavMode( this.navMode );
    }

    //cameraControl.navMode = "firstPerson";

    //this.viewer.scene.camera.eye = [this.model!.cen.x, this.model!.cen.y, this.model!.cen.z];
    //this.viewer.scene.camera.look = [0, 0, 0];
    //this.viewer.scene.camera.up = [0, 0, 1];

    this.viewer.scene.camera.perspective.near = 0.4;
    this.viewer.scene.camera.perspective.far = 200000;
    this.viewer.scene.camera.perspective.fov = 45;

    // this.viewer.scene.xrayMaterial.fill = true;
    // this.viewer.scene.xrayMaterial.fillAlpha = 0.1;
    // this.viewer.scene.xrayMaterial.fillColor = [0, 0, 0];
    // this.viewer.scene.xrayMaterial.edgeAlpha = 0.3;
    // this.viewer.scene.xrayMaterial.edgeColor = [0, 0, 0];

    // this.viewer.scene.highlightMaterial.fill = true;
    // this.viewer.scene.highlightMaterial.edges = true;
    // this.viewer.scene.highlightMaterial.fillAlpha = 0.9;
    // this.viewer.scene.highlightMaterial.edgeAlpha = 0.9;
    // this.viewer.scene.highlightMaterial.fillColor = [0, 0, 1];
    // this.viewer.scene.highlightMaterial.edgeColor = [1, 0, 0];

    // this.viewer.scene.selectedMaterial.fill = true;
    // this.viewer.scene.selectedMaterial.edges = true;
    // this.viewer.scene.selectedMaterial.fillAlpha = 0.5;
    // this.viewer.scene.selectedMaterial.edgeAlpha = 0.6;
    // this.viewer.scene.selectedMaterial.edgeColor = [1, 0, 0];

    // Add a this.storeyViewsPlugin
    const ml:ModelLoader = new ModelLoader(this.viewer);
    this.loader = ml;

    this.storeyViewer = new SWGStoreyViewer(ml);
    

    this.distanceMeasurements = new DistanceMeasurementsPlugin(this.viewer);

    // Add an XKTLoaderPlugin
    new NavCubePlugin(this.viewer, {
      canvasId: "myNavCubeCanvas",
      visible: true,
      size: 200,
      alignment: "bottomRight",
      bottomMargin: 100,
      rightMargin: 10,
      synchProjection: true,
      color: "white",
      hoverColor: "rgb(55,70,77,0.4)",
    });

    new FastNavPlugin(this.viewer, {});

    const viewCullPlugin = new ViewCullPlugin(this.viewer, {
      maxTreeDepth: 1,
    });

    // Load XKT..

    this.LoadXKT();

 


    //Set actions for part checkboxes
    // for (let i = 1; i <= this.model!.partsCount; i++) {
    //     document.getElementById("navPARTS" + i)!.onclick = this.GUI_navmodePARTS;
    // }

    this.createContextMenu();

  
  },
  methods: {

setNavMode(navMode:String) {
  if( this.model == null )
    return;

  console.log("Set Nav Mode " + navMode);

    if( navMode == "FPV" ) {
      this.nav.mode = "FPV";
      this.nav.observerHeight = this.nav.standardHeight.person;
      
      this.GUI_navSetCameraXY(this.model!.startPos.x * this.model!.scaleRes,
          this.model!.startPos.y * this.model!.scaleRes);
    }

    if( navMode == "Drone" ) {
           this.nav.mode = "DRONE";
          this.nav.observerHeight = this.nav.standardHeight.drone;
      this.GUI_navSetCameraXY(this.model!.cen.x * this.model!.scaleRes,
          this.model!.cen.y * this.model!.scaleRes);
    }

    if( navMode == "Orbit" ) {
       this.nav.mode = "ORBIT";
        this.nav.observerHeight = this.nav.standardHeight.drone;
      this.GUI_navSetCameraXY(this.model!.startPos.x * this.model!.scaleRes,
          this.model!.startPos.y * this.model!.scaleRes);
    }
},
setObserverHeight(height: number) {

    this.nav.observerHeight = height;
    
    this.GUI_navSetCameraXY(null, null);

},

    LoadXKT() {

      if( this.model == null ) {
        // Exit if we have loaded before / already
        return;
      }

         this.itemId = ""; //this.model!.DefaultObject;

    

    //document.getElementById('navBIRDSEYE').onload = GUI_setSVGassetpos;
    this.GUI_setSVGassetpos();
//Set controls to defaults appropriate to the mode.
    //if (model.nav.mode == 'FPV') {
    //  GUI_togglecutplane(); //Turn on floor cutplanes.
    //}
    if (this.nav.mode == "DRONE") {
      this.GUI_togglecutplane(); //Turn on floor cutplanes.
    }


     var isHighlight = false;
    var currentSId = 0;
    const damage = ["O10566834"];

    
    var entityId = this.itemId;

    

   // this.storeyViewer.init(this.loader);

    const ll = this.loader!;
    console.log("PRE, LOAD");
    
    this.loader!.load(this.model, 

      () => {
      
      console.log("LOADED CALLBACK");

      var s = this.loader!.getStories();

      var item = s[3];

      this.storeyViewer?.show(item.id);

      const objectsMemento = new ObjectsMemento();
      objectsMemento.saveObjects(this.viewer.scene);

      const cameraMemento = new CameraMemento(); // Saves 3D perspective camera to restore
      cameraMemento.saveCamera(this.viewer.scene);


 const camera = this.viewer.scene.camera;

            camera.perspective.far = 20000;
            this.viewer.cameraFlight.flyTo(ll.modelparts[0]);

    

      
return;
      if (entityId != "") {
        try {
          var ent = this.viewer.scene.objects[entityId];
          ent.highlighted = true;
          this.subents_highlight(entityId, true);
        } catch (err) {
          alert(
            "Problem highlighting default entity(" +
              entityId +
              ")" +
              err.message
          );
        }
      }

      /* WAT 
            if (1 == 2) {
            var metaObject = this.viewer.metaScene.metaObjects[entityId];
            var metaObjectType = metaObject.type;

            do {
                if (metaObject.parent != null) {
                    metaObject = metaObject.parent;
                    if (metaObject.type == "IfcBuildingStorey") {
                        currentSId = metaObject.id;

                    }
                }
            } while (metaObject.parent != null && currentSId == 0);

            var ent = this.viewer.scene.objects[entityId];
        } 
        //DT-ent.highlighted = true;
        var mode = "3d";

        if (canStandOnTypes[metaObjectType]) {
            worldPos.set(pickResult.worldPos);
        }
        else {
            //DT-worldPos.set(ent.aabb.slice(0, 3));
        }*/

      //document.getElementById("restoreView").onclick = (e) => {
      //    cameraMemento.restoreCamera(this.viewer.scene, () => { });
      //    objectsMemento.restoreObjects(this.viewer.scene);
      //    document.getElementById("itemId").value = "O10566834"; //"0FtwldUXX0BRlQXhzArk2I";
      //    mode = "3d";
      //    entityId = "O10566834"; //"0FtwldUXX0BRlQXhzArk2I";
      //    //DT-ent = this.viewer.scene.objects[entityId];
      //    //DT-ent.highlighted = true;
      //    if(1==2){ //disable jump to
      //      metaObject = this.viewer.metaScene.metaObjects[entityId];
      //      metaObjectType = metaObject.type;
      //      currentSId = 0
      //      do {
      //          if (metaObject.parent != null) {
      //              metaObject = metaObject.parent;
      //              if (metaObject.type == "IfcBuildingStorey") {
      //                currentSId = metaObject.id;
      //              }
      //          }
      //      } while (metaObject.parent != null && currentSId == 0);
      //    }
      //}

      //document.getElementById("show2D").onclick = (e) => { mode = "2d";
      //  this.storeyViewsPlugin.showStoreyObjects(currentSId, {
      //  hideOthers: true,
      //  useObjectStates: false
      //});

      //storeyViewsPlugin.gotoStoreyCamera(currentSId, {
      ////projection: "ortho",
      //  done: () => {
      //    this.viewer.cameraControl.navMode = "planView"; // Disable rotation
      //    document.getElementById("navPlanView").checked = true;
      //    document.getElementById("projOrtho").checked = true;
      //  }
      //});

      //        };

      //        document.getElementById("show3D").onclick = (e) => {
      //      mode = "3dOf2d";
      //            if (mode == "2d") {
      //
      //      document.getElementById("projPerspective").checked = true;
      //                this.viewer.cameraFlight.jumpTo({
      //
      //      projection: "perspective",
      //                    fitFOV: 68
      //                });
      //            }
      //
      //        };

      var lastPicked = new Array(damage.length);
      //document.getElementById("showDamage").onclick = (e) => {
      //  damage.forEach((item, index) => {
      //    var entToChange = this.viewer.scene.objects[item];
      //    var mo = this.viewer.metaScene.metaObjects[entToChange.id];
      //    var mot = mo.type;
      //    if (canStandOnTypes[mot]) {
      //      entToChange.visible = !e.srcElement.checked;
      //    } else {
      //      if (e.srcElement.checked) {
      //        console.log(index);
      //        lastPicked[index] = entToChange.colorize;
      //      }
      //      entToChange.colorize = e.srcElement.checked ? [0.7, 0, 0] : lastPicked[index]; //e.srcElement.checked ? [0,0,255];
      //    }
      //  });
      //}

      // Make all doors transparent
      this.viewer.scene.setObjectsOpacity(
        this.viewer.metaScene.getObjectIDsByType("IfcDoor"),
        0.3
      );

      var lastEntity: any = null;
      this.viewer.scene.input.on("mousemove", (coords) => {
        if (isHighlight) {
          var hit = this.viewer.scene.pick({
            canvasPos: coords,
          });
          if (hit) {
            if (!lastEntity || hit.entity.id !== lastEntity?.id) {
              if (lastEntity && lastEntity.id != entityId) {
                lastEntity.highlighted = false;
              }
              lastEntity = hit.entity;
              hit.entity.highlighted = true;
            }
          } else {
            if (lastEntity && lastEntity.id != entityId) {
              lastEntity.highlighted = false;
              lastEntity = null;
            }
          }
        }
      });

      var i = 1;

      this.viewer.scene.input.on("mouseclicked", (coords) => {
        if (this.selectMode == "slice") {
          var pickResult = this.viewer.scene.pick({
            canvasPos: coords,
            pickSurface: true, // <<------ This causes picking to find the intersection point on the entity
          });
          if (pickResult && pickResult.worldNormal) {
            // Disallow SectionPlanes on point clouds, because points don't have normals
            const sectionPlane = this.sectionPlanes.createSectionPlane({
              pos: pickResult.worldPos,
              dir: math.mulVec3Scalar(pickResult.worldNormal, -1),
            });
            this.sectionPlanes.showControl(sectionPlane.id);
            i++;
          }
        }
      });
      //This would enable us to change what is considered to be the Q key etc
      //this.viewer.scene.input.KEY_Q = 999;

      //const onKeyDown = this.viewer.scene.input.on("keydown", (keyCode) => {
      //  if (this.nav.mode == 'DRONE') {
      //
      //    switch (keyCode) {
      //      case 81:
      //        //Q key is incorrect rotation in drone mode so cancel.
      //        alert(99990);
      //        break;
      //      case 1234:
      //        console.log("The 'B' key is down");
      //        break;
      //      case 12345:
      //        console.log("The 'C' key is down");
      //        break;
      //      default:
      //        console.log("Some other key is down");
      //  }
      //  }

      //});
      //const onMouseDown = this.viewer.scene.input.on("mousedown", (canvasCoords) => {
      //  console.log("Mouse down at: x=" + canvasCoords[0] + ", y=" + coords[1]);
      //});

      this.viewer.cameraControl.on("pickedNothing", (pickResult) => {
        // debugger;
      });

      this.viewer.cameraControl.on("pickedSurface", (pickResult) => {
        var camera = this.viewer.scene.camera;

        console.log(camera.look);
        if (this.selectMode == "select" || this.selectMode == "goto") {
          var entity = pickResult.entity;
          if (entity.highlighted && this.isFP) {
            entity.highlighted = false;
            return;
          }
          if (this.isFP) {
            this.worldPos.set(pickResult.worldPos);
            this.GoToItem3d(
              this.viewer.metaScene.metaObjects[entity.id].type,
              entity.aabb
            );
          } else {
            var hilightonoff = !entity.highlighted;
            
            this.itemId = entity.id;
            // TODO: FIRE EVENT

            entityId = entity.id;
            ent = this.viewer.scene.objects[entityId];
            ent.highlighted = hilightonoff;

            this.subents_highlight(entityId, hilightonoff);

            //alert('PICKED ENTITY ID=' + entityId);
            //if (entityId.substring(0, 2) == 'OBJ') {
            //  alert('show info');
            //}
            //debugger;
            //metaObject = this.viewer.metaScene.metaObjects[entityId];
            //metaObjectType = metaObject.type;

            currentSId=0;

            //if (canStandOnTypes[metaObjectType]) {
            //   worldPos.set(pickResult.worldPos);
            //}else {
            //   worldPos.set(ent.aabb.slice(0, 3));
            //}

            //do {
            //    if (metaObject.parent != null) {
            //        metaObject = metaObject.parent;
            //        if (metaObject.type == "IfcBuildingStorey") {
            //           currentSId = metaObject.id;
            //        }
            //    }
            //} while (metaObject.parent != null && currentSId == 0);
          }
        }
      });

      //this.viewer.cameraControl.on("eye", (eyeResult) => GUI_refreshSVGcampos);
    });
  },
 
  GoToItem3d(metaObjectTypeF, entAabbF) {
    const camera = this.viewer.scene.camera;
    const idx = camera.xUp ? 0 : camera.yUp ? 1 : 2; // Find the right axis for "up"
    if (canStandOnTypes[metaObjectTypeF]) {
      this.worldPos[idx] = this.worldPos[idx] + 1;
    }
    this.viewer.cameraFlight.flyTo(
      {
        eye: this.worldPos,
        look:
          this.mode == "3dOf2d"
            ? math.addVec3(this.worldPos, this.viewer.camera.worldForward, [])
            : null,
        up: this.viewer.camera.worldUp,
        projection: "perspective",
      },
      () => {
        if (canStandOnTypes[metaObjectTypeF]) {
          this.viewer.cameraControl.navMode = "firstPerson";
        
          this.mode = "3d";
        } else {
          this.viewer.cameraFlight.flyTo(
            {
              aabb: entAabbF,
              fitFOV: 45,
            },
            () => {
              this.viewer.cameraControl.navMode = "firstPerson";
             
              this.mode = "3d";
            }
          );
        }
      }
    );
  },

  createContextMenu() {
    const objectContextMenu = new ContextMenu({
      items: [
        [
          {
            title: "View Fit",
            doAction: function (context) {
              const viewer = context.viewer;
              const scene = viewer.scene;
              const entity = context.entity;
              viewer.cameraFlight.flyTo(
                {
                  aabb: entity.aabb,
                  duration: 0.5,
                },
                () => {
                  setTimeout(function () {
                    scene.setObjectsHighlighted(
                      scene.highlightedObjectIds,
                      false
                    );
                  }, 500);
                }
              );
            },
          },
          {
            title: "View Fit All",
            doAction: function (context) {
              const scene = context.viewer.scene;
              context.viewer.cameraFlight.flyTo({
                projection: "perspective",
                aabb: scene.getAABB(),
                duration: 0.5,
              });
            },
          },
        ],
        [
          {
            title: "Hide",
            getEnabled: function (context) {
              return context.entity.visible;
            },
            doAction: function (context) {
              context.entity.visible = false;
            },
          },
          {
            title: "Hide Others",
            doAction: function (context) {
              const viewer = context.viewer;
              const scene = viewer.scene;
              const entity = context.entity;
              const metaObject = viewer.metaScene.metaObjects[entity.id];
              if (!metaObject) {
                return;
              }
              scene.setObjectsVisible(scene.visibleObjectIds, false);
              scene.setObjectsXRayed(scene.xrayedObjectIds, false);
              scene.setObjectsSelected(scene.selectedObjectIds, false);
              scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
              metaObject.withMetaObjectsInSubtree((metaObject) => {
                const entity = scene.objects[metaObject.id];
                if (entity) {
                  entity.visible = true;
                }
              });
            },
          },
          {
            title: "Hide All",
            getEnabled: function (context) {
              return context.viewer.scene.numVisibleObjects > 0;
            },
            doAction: function (context) {
              context.viewer.scene.setObjectsVisible(
                context.viewer.scene.visibleObjectIds,
                false
              );
            },
          },
          {
            title: "Show All",
            getEnabled: function (context) {
              const scene = context.viewer.scene;
              return scene.numVisibleObjects < scene.numObjects;
            },
            doAction: function (context) {
              const scene = context.viewer.scene;
              scene.setObjectsVisible(scene.objectIds, true);
            },
          },
        ],
        [
          {
            title: "X-Ray",
            getEnabled: function (context) {
              return !context.entity.xrayed;
            },
            doAction: function (context) {
              context.entity.xrayed = true;
            },
          },
          {
            title: "Undo X-Ray",
            getEnabled: function (context) {
              return context.entity.xrayed;
            },
            doAction: function (context) {
              context.entity.xrayed = false;
            },
          },
          {
            title: "X-Ray Others",
            doAction: function (context) {
              const viewer = context.viewer;
              const scene = viewer.scene;
              const entity = context.entity;
              const metaObject = viewer.metaScene.metaObjects[entity.id];
              if (!metaObject) {
                return;
              }
              scene.setObjectsVisible(scene.objectIds, true);
              scene.setObjectsXRayed(scene.objectIds, true);
              scene.setObjectsSelected(scene.selectedObjectIds, false);
              scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
              metaObject.withMetaObjectsInSubtree((metaObject) => {
                const entity = scene.objects[metaObject.id];
                if (entity) {
                  entity.xrayed = false;
                }
              });
            },
          },
          {
            title: "Reset X-Ray",
            getEnabled: function (context) {
              return context.viewer.scene.numXRayedObjects > 0;
            },
            doAction: function (context) {
              context.viewer.scene.setObjectsXRayed(
                context.viewer.scene.xrayedObjectIds,
                false
              );
            },
          },
        ],
        [
          {
            title: "Mark Damage",
            getEnabled: function (context) {
              return !context.entity.selected;
            },
            doAction: function (context) {
              if (context.entity.colorize != [0.7, 0, 0]) {
                context.mapColor.set(
                  context.entity.id,
                  context.entity.colorize
                );
              }

              context.entity.colorize = [0.7, 0, 0];
            },
          },
          {
            title: "Select",
            getEnabled: function (context) {
              return !context.entity.selected;
            },
            doAction: function (context) {
              context.entity.selected = true;

              // itemsSelect.push(context.entity.id);
              // console.log(itemsSelect.length);
              // console.log(itemsSelect);
              // document.getElementById("stats2").innerHTML = "['" + itemsSelect.join("', '") + "]";
            },
          },
          {
            title: "Undo select",
            getEnabled: function (context) {
              return (
                context.entity.selected ||
                context.mapColor.has(context.entity.id)
              );
            },
            doAction: function (context) {
              context.entity.selected = false;

              if (context.mapColor.has(context.entity.id)) {
                context.entity.colorize = context.mapColor.get(
                  context.entity.id
                );
                context.mapColor.delete(context.entity.id);
              }
            },
          },
          {
            title: "Clear Selection",
            getEnabled: function (context) {
              return (
                context.viewer.scene.numSelectedObjects > 0 ||
                context.mapColor.size > 0
              );
            },
            doAction: function (context) {
              context.viewer.scene.setObjectsSelected(
                context.viewer.scene.selectedObjectIds,
                false
              );
              for (const [key, value] of context.mapColor.entries()) {
                context.viewer.scene.objects[key].colorize = value;
              }
              // TODO: Nope
              context.mapColor = new Map();
            },
          },
        ],
      ],
      enabled: true,
    });

    this.viewer.cameraControl.on("rightClick", (e) => {
      var hit = this.viewer.scene.pick({
        canvasPos: e.canvasPos,
      });

      if (hit && hit.entity.isObject) {
        objectContextMenu.context = {
          // Must set context before showing menu
          viewer: this.viewer,
          //treeViewPlugin: treeView,
          mapColor: this.mapColor,
          entity: hit.entity,
        };

        objectContextMenu.show(e.event.pageX, e.event.pageY);
      }

      e.event.preventDefault();
    });
  },

  setupCamera() {
    this.cameraControl = this.viewer.cameraControl;
    const scene = this.viewer.scene;
    const cameraFlight = this.viewer.cameraFlight;
    const sao = scene.sao;
    const camera = scene.camera;

    // Higher-quality SAO settings

    sao.enabled = false;
    sao.numSamples = 40;
    sao.kernelRadius = 150;

    sao.intensity = 0.15;
    sao.bias = 0.5;
    sao.scale = 1.0;
    sao.minResolution = 0.0;
    sao.numSamples = 10;
    sao.kernelRadius = 100;
    sao.blendCutoff = 0.1;

    this.cameraControl.followPointer = true;
    this.cameraControl.doublePickFlyTo = true;

    //alert('cameraControl.keyboardRotationRate=' + cameraControl.keyboardRotationRate);
    //alert('cameraControl.keyboardPanRate=' + cameraControl.keyboardPanRate);

    this.cameraControl.keyboardDollyRate = 200.0; //default 100.0
    this.cameraControl.mouseWheelDollyRate = 200.0; //default 100.0
    this.cameraControl.keyboardPanRate = 100.0; //Default 5.0
    this.cameraControl.keyboardRotationRate = 80.0; //Default 90
    //cameraControl.dollyInertia = 0;
    //cameraControl.dollyMinSpeed = 0.04;
    //cameraControl.dollyProximityThreshold = 30.0;

  },

  GUI_navmodeFPV(IFC_x_cm, IFC_Y_cm) {


    console.log("SET NAV MODE FPV");

    this.nav.mode = "FPV";
    this.nav.observerHeight = this.nav.standardHeight.person;
  
    if (this.GUISETTING_cutplanes) {
      this.GUI_togglecutplane(); //Turn OFF floor cutplanes.
    }

    if (IFC_Y_cm == null) {
      this.GUI_navSetCameraXY(
        this.viewer.scene.camera.eye[0] * 1,
        this.viewer.scene.camera.eye[1] * 1
      );
    } else {
      this.GUI_navSetCameraXY(IFC_x_cm, IFC_Y_cm);
    }
  },

  GUI_navmodeDRONE(IFC_x_cm, IFC_Y_cm) {
    this.nav.mode = "DRONE";
    this.nav.observerHeight = this.nav.standardHeight.drone;
    
    if (this.GUISETTING_cutplanes == false) {
      this.GUI_togglecutplane(); //Turn ON floor cutplanes.
    }

   
    if (IFC_Y_cm == null) {
      this.GUI_navSetCameraXY(
        this.viewer.scene.camera.eye[0] * 1,
        this.viewer.scene.camera.eye[1] * 1
      );
    } else {
      this.GUI_navSetCameraXY(IFC_x_cm, IFC_Y_cm);
    }
  },

  GUI_navmodeORBIT(IFC_x_cm, IFC_Y_cm) {
    this.nav.mode = "ORBIT";
    this.viewer.cameraControl.navMode = "orbit";


    if (this.GUISETTING_cutplanes) {
      this.GUI_togglecutplane(); //Turn OFF floor cutplanes.
    }

    if (IFC_Y_cm == null) {
      this.GUI_navSetCameraXY(
        this.viewer.scene.camera.eye[0] * 1,
        this.viewer.scene.camera.eye[1] * 1
      );
    } else {
      this.GUI_navSetCameraXY(IFC_x_cm, IFC_Y_cm);
    }
  },

  GUI_togglecutplane() {
    if (this.GUISETTING_cutplanes) {
      this.GUISETTING_cutplanes = false;

      this.sectionPlanes.clear();

      
    } else {
      this.GUISETTING_cutplanes = true;
      
      if (this.model!.cutPlane.lower != 0) {
        this.sectionPlanes.clear();
        this.sectionPlanes.createSectionPlane({
          id: "Floor",
          pos: [
            this.model!.cen.x * this.model!.scaleRes,
            this.model!.cen.y * this.model!.scaleRes,
            this.model!.cutPlane.lower * this.model!.scaleRes,
          ],
          dir: [0.0, 0.0, 1.0],
        });
      }
      if (this.model!.cutPlane.upper != 0) {
        this.sectionPlanes.createSectionPlane({
          id: "Ceiling",
          pos: [
            this.model!.cen.x * this.model!.scaleRes,
            this.model!.cen.y * this.model!.scaleRes,
            this.model!.cutPlane.upper * this.model!.scaleRes,
          ],
          dir: [0.0, 0.0, -1.0],
        });
      }

      // TODO : WAT 1==3
      // if (this.model!.focus_range != 0 && 1 == 3) {
      //     //Define vertical cutplanes to limit range
      //     this.sectionPlanes.createSectionPlane({
      //         id: "Side1",
      //         pos: [(this.model!.cen.x -this.model!.focus_range) * this.model!.scaleRes, this.model!.cen.y * this.model!.scaleRes, this.model!.cen.z * this.model!.scaleRes],
      //         dir: [1.0, 0.0, 0.0]
      //     });

      //     this.sectionPlanes.createSectionPlane({
      //         id: "Side2",
      //         pos: [this.model!.cen.x * this.model!.scaleRes, (this.model!.cen.y + this.model!.focus_range) * this.model!.scaleRes, this.model!.cen.z * this.model!.scaleRes],
      //         dir: [0.0, -1.0, 0.0]
      //     });
      //     this.sectionPlanes.createSectionPlane({
      //         id: "Side3",
      //         pos: [(this.model!.cen.x + this.model!.focus_range) * this.model!.scaleRes, this.model!.cen.y * this.model!.scaleRes, this.model!.cen.z * this.model!.scaleRes],
      //         dir: [-1.0, 0.0, 0.0]
      //     });
      // }
    }
  },
  //Sets the camera position, height and direction based on the passed X,Y and current this.nav.mode
  GUI_navSetCameraXY(IFC_x_cm, IFC_y_cm) {
    if (IFC_x_cm == null) {
      //If no new XY supplied then use current camera position.
      IFC_x_cm = this.viewer.scene.camera.eye[0];
      IFC_y_cm = this.viewer.scene.camera.eye[1];
    }
    if (this.nav.mode == "FPV") {
      //FPV current view direction maintained, (option for focus retain), observer height used.
      //Find current view direction vector (offset)
      this.cameraControl.navMode = "firstPerson";

      //Experimental settings to limit movement and thus simplify user control.
      this.cameraControl.followPointer = false; //False Should always move in look direction and ignore mouse position.
      this.cameraControl.constrainVertical = true; //Should lock the height of the camera and thus avoid submerging into the floor etc.

      this.viewer.scene.camera.up = [0, 0, 1];
      this.viewer.scene.camera.eye = [
        IFC_x_cm,
        IFC_y_cm,
        this.nav.current_elev * 0.1 + this.nav.observerHeight,
      ];
      if (this.nav.targetLock) {
        //Retain current target point.
        this.viewer.scene.camera.look = [
          this.model!.cen.x * this.model!.scaleRes,
          this.model!.cen.y * this.model!.scaleRes,
          this.model!.cen.z * this.model!.scaleRes,
        ];
      } else {
        var viewdir_x =
          this.viewer.scene.camera.look[0] - this.viewer.scene.camera.eye[0];
        var viewdir_y =
          this.viewer.scene.camera.look[1] - this.viewer.scene.camera.eye[1];
        this.viewer.scene.camera.look = [
          IFC_x_cm + viewdir_x,
          IFC_y_cm + viewdir_y,
          this.nav.current_elev * 0.1 + this.nav.observerHeight,
        ];
      }
    }
    if (this.nav.mode == "DRONE") {
      //DRONE so look straight down. (try and maintain rotation orientation)
      //Find current view direction vector (offset)
      //var viewdir_x = this.viewer.scene.camera.look[0] - this.viewer.scene.camera.eye[0];
      //var viewdir_y = this.viewer.scene.camera.look[1] - this.viewer.scene.camera.eye[1];
      this.cameraControl.navMode = "firstPerson"; //This may not be the ideal this.viewer mode.
      this.viewer.scene.camera.up = [0, 1, 0];
      //this.viewer.scene.input.setEnabled(false); //Disables scene input.
      //this.viewer.scene.input.off(onMouseDown);
      //this.viewer.scene.input.off(onMouseUp);
      //this.viewer.scene.input.setKeyboardEnabled(false);
      this.viewer.scene.camera.eye = [
        IFC_x_cm,
        IFC_y_cm,
        this.nav.current_elev * 0.1 + this.nav.observerHeight,
      ];
      this.viewer.scene.camera.look = [
        IFC_x_cm + 1,
        IFC_y_cm + 1,
        this.nav.current_elev * 0.1,
      ]; //Always go to looking 5m towards X
    }

    if (this.nav.mode == "ORBIT") {
      //DRONE so look straight down. (try and maintain rotation orientation)
      //Find current view direction vector (offset)
      //var viewdir_x = this.viewer.scene.camera.look[0] - this.viewer.scene.camera.eye[0];
      //var viewdir_y = this.viewer.scene.camera.look[1] - this.viewer.scene.camera.eye[1];
      this.viewer.scene.camera.up = [0, 0, 1];
      this.viewer.scene.camera.eye = [
        IFC_x_cm,
        IFC_y_cm,
        this.nav.current_elev * 0.1 + this.nav.observerHeight,
      ];
      this.viewer.scene.camera.look = [
        this.model!.cen.x * this.model!.scaleRes,
        this.model!.cen.y * this.model!.scaleRes,
        this.model!.cen.z * this.model!.scaleRes,
      ]; //Always go to looking 5m towards X
    }
  },
  GUI_setFLR(flrCode) {
    // TODO: AJpostdataVIEWER('&MODE=FLRSVG&BLDID=' + this.model!.buildingID + '&FLRREF=' + flrCode);

    var flrElevation = 0;
    //var elevation1 = document.getElementById("navFLRLST").value;
    var flrIndex = -1;
    for (var i = 0; i < this.model!.floorList.length; i++) {
      if (this.model!.floorList[i].name == flrCode) {
        flrIndex = i;
        //if (!flrElevation) {
        flrElevation = this.model!.floorList[i].elevation;
        //}
      }
    }

    var level_height = 4000;
    if (this.model!.floorList.length != 1) {
      //Only 1 floor leave level height as default
      if (flrIndex < this.model!.floorList.length - 1) {
        level_height =
          this.model!.floorList[flrIndex + 1].elevation - flrElevation;
      } else {
        level_height =
          flrElevation - this.model!.floorList[flrIndex - 1].elevation;
      }
    }
    var elevation2 = flrElevation * 1 + level_height * 1; //Default allow for 3m floors
    this.nav.current_elev = flrElevation * 1.0;
    this.model!.cutPlane.lower = flrElevation * 1.0;
    this.model!.cutPlane.upper = elevation2 * 1.0;
    this.GUISETTING_cutplanes = false;
    this.GUI_togglecutplane();
    
    //When change floor force the camera to be the elevation +1.5m
    //alert(this.nav.current_elev + ' eyez=' + viewer.scene.camera.eye[2]);
    //viewer.scene.camera.look = [viewer.scene.camera.look[0], viewer.scene.camera.look[1], (this.nav.current_elev * 0.1) + this.nav.observerHeight];
    //viewer.scene.camera.eye = [viewer.scene.camera.eye[0], viewer.scene.camera.eye[1], (this.nav.current_elev * 0.1) + this.nav.observerHeight];
    this.GUI_navSetCameraXY(null, null);
  },

  GUI_navFLRLST(e) {
    //alert(document.getElementById("navFLRLST").options[document.getElementById("navFLRLST").selectedIndex].text);
    //document.getElementById('navBIRDSEYE').src = 'SVGFloors/IFCFloorplan_Level_' + document.getElementById("navFLRLST").options[document.getElementById("navFLRLST").selectedIndex].text + '.svg'

    //  var elevation1 = document.getElementById("navFLRLST").value;
    //  var flrcode = document.getElementById("navFLRLST").options[document.getElementById("navFLRLST").selectedIndex].text;



    if (e.srcElement) {
      var flrcode = e.srcElement.id;
      this.GUI_setFLR(flrcode);
    }
  },

    subents_highlight(entId, hilightonoff) {
      var subents_stubID = entId;
      if (subents_stubID.indexOf("_M") > 0) {
        subents_stubID = subents_stubID.substring(
          0,
          subents_stubID.indexOf("_M")
        );
      }
      if (this.viewer.scene.objects[subents_stubID]) {
        this.viewer.scene.objects[subents_stubID].highlighted = hilightonoff;
      }
      for (var Mloop = 0; Mloop < 20; Mloop++) {
        if (this.viewer.scene.objects[subents_stubID + "_M" + Mloop]) {
          this.viewer.scene.objects[subents_stubID + "_M" + Mloop].highlighted =
            hilightonoff;
        }
      }
    },

    
 ADBGoToItem3d(entAabbF) {

    console.log("ADBGoToItem3d");

    const camera = this.viewer.scene.camera;
    const idx = camera.xUp ? 0 : (camera.yUp ? 1 : 2); // Find the right axis for "up"
    //if (canStandOnTypes[metaObjectTypeF]) {
    //  worldPos[idx] = worldPos[idx] + 1;
    //}
    this.viewer.cameraFlight.flyTo({
        eye: this.worldPos,
        look: this.mode == "3dOf2d" ? math.addVec3(this.worldPos, this.viewer.camera.worldForward, []) : null,
        up: this.viewer.camera.worldUp,
        projection: "perspective",
    }, () => {
        //if (canStandOnTypes[metaObjectTypeF]) {
        //  this.viewer.cameraControl.navMode = "firstPerson";
        //  document.getElementById("navFirstPerson").checked = true;
        //  document.getElementById("projPerspective").checked = true;
        //  mode = "3d";
        //} else {
        this.viewer.cameraFlight.flyTo({
            aabb: entAabbF,
            fitFOV: 45
        }, () => {
            this.viewer.cameraControl.navMode = "firstPerson";
            //document.getElementById("navFirstPerson").checked = true;
            //document.getElementById("projPerspective").checked = true;
            this.mode = "3d";
        });
        //}
    });
},




 GUI_navmodeTARGETLOCK() {
    // var SVGelement:HTMLElement = document.getElementById('navBIRDSEYEdiv')?.children[0] as HTMLElement;
    
    // TODO
    
    // if (this.nav.targetLock) {
    //     this.nav.targetLock = false;
    //     document.getElementById("navmodeTARGETLOCK").style.backgroundColor = '';
    //     SVGelement.getElementById("SVGPOSASSET").setAttribute('href', 'images/ICON_navmode_targetlockoff.png');
    // } else {
    //     this.nav.targetLock = true;
    //     document.getElementById("navmodeTARGETLOCK").style.backgroundColor = '#88F';
    //     SVGelement.getElementById("SVGPOSASSET").setAttribute('href', 'images/ICON_navmode_targetlock.png');
    // }

},



 GUI_actionGOTOroom() {
    // NADA
},
 GUI_actionPARTSroom() {
    
    // TODO
    // var roomtoload = document.getElementById('navROOMLST').options[document.getElementById('navROOMLST').selectedIndex].text;
    // roomtoload = roomtoload.substring(roomtoload.indexOf('-') + 1);
    // if (this.nav.loadedRooms.indexOf(',' + roomtoload + ',') > -1) {
    //     alert('Room ' + roomtoload + ' is already loaded.');
    // } else {


    //     this.nav.loadedRooms += roomtoload + ',';
    //     var SVGelement = document.getElementById('navBIRDSEYEdiv')?.children[0];
    //     for (var child = SVGelement.firstChild; child !== null; child = child.nextSibling) {
    //         if (this.nav.loadedRooms.indexOf(',' + child.id + ',') > -1) {
    //             child.setAttribute('fill', '#1fa0f0');
    //         }
    //     }

  

    //     this.modelrooms[nextroomindex].on("loaded", () => {
    //         var t1 = performance.now();
    //         document.getElementById("stats2").innerHTML = "Room " + document.getElementById('navROOMLST').value + " load " + Math.floor(t1 - this.t0) / 1000.0 + " secs<br>Objects: " + this.modelrooms[nextroomindex].numEntities;
    //     });

    // }
},




 GUI_navmodePARTS(e) {
    var partIndex = e.target.id.substring(8, 99) * 1;
    if (e.target.checked) {
        //alert('turn on' + e.target.value + ' ID:' + partIndex);

        //alert('turn on' + e.target.value);
        //var p0 = performance.now();
        //document.getElementById("stats2").innerHTML = "Loading this.model 2...";

        this.loader!.loadPart(partIndex, e.target.value);

        
    } else {
        //alert('turn off' + e.target.value);
        this.loader!.removePart(partIndex);
    }
},

 GUI_setSVGcampos(e) {    
      // Later.
    


},



 GUI_setSVGassetpos() {
    var SVGelement = document.getElementById('navBIRDSEYEdiv')?.children[0];
    try {
        //svg_doc.getElementById("SVGPOSASSET").setAttribute("cx", this.model!.startPos.x);
        //svg_doc.getElementById("SVGPOSASSET").setAttribute("cy", this.model!.startPos.y);


        ///TODO
        // var viewbox = SVGelement.getAttribute('viewBox').split(" ");
        // var viewboxminy = Number(viewbox[1]);
        // var viewboxhgt = Number(viewbox[3]);
        // var SVGtruminy = (viewboxminy * 1) + (viewboxhgt * 1);
        // var targetsize = 6000;
        // document.getElementById("SVGPOSASSET").setAttribute("x", "" + (this.model!.cen.x - ((targetsize / this.model!.birdsEye.boxScale) * 0.5)));
        // document.getElementById("SVGPOSASSET").setAttribute("y", "" + (SVGtruminy - (this.model!.cen.y + ((targetsize / this.model!.birdsEye.boxScale) * 0.5))));
        // if (this.nav.targetLock) {
        //     document.getElementById("SVGPOSASSET").setAttribute('href', 'images/ICON_navmode_targetlock.png');
        // } else {
        //     document.getElementById("SVGPOSASSET").setAttribute('href', 'images/ICON_navmode_targetlockoff.png');
        // }
        // document.getElementById("SVGPOSASSET").setAttribute("width", "" + targetsize / this.model!.birdsEye.boxScale);
        // document.getElementById("SVGPOSASSET").setAttribute("height", "" + targetsize / this.model!.birdsEye.boxScale);

        //this.GUI_refreshSVGcampos();
    } catch (err) {
        // NADA
    }
},


 GUI_navmodeORBITmovein() {
    var eyeoffset_x = this.viewer.scene.camera.look[0] - this.viewer.scene.camera.eye[0];
    var eyeoffset_y = this.viewer.scene.camera.look[1] - this.viewer.scene.camera.eye[1];
    var eyeoffset_z = this.viewer.scene.camera.look[2] - this.viewer.scene.camera.eye[2];


    this.viewer.scene.camera.eye = [this.viewer.scene.camera.eye[0] + (eyeoffset_x * 0.5), this.viewer.scene.camera.eye[1] + (eyeoffset_y * 0.5), this.viewer.scene.camera.eye[2]]


    //this.viewer.scene.camera.look = [this.model!.cen.x * this.model!.scaleRes, this.model!.cen.y * this.model!.scaleRes, this.model!.cen.z * this.model!.scaleRes];
    //this.viewer.scene.camera.eye = [(this.model!.min.x - 6000) * this.model!.scaleRes, (this.model!.min.y - 6000) * this.model!.scaleRes, this.model!.cen.z * this.model!.scaleRes];


},
 GUI_navmodeORBITmoveout() {
    var eyeoffset_x = this.viewer.scene.camera.look[0] - this.viewer.scene.camera.eye[0];
    var eyeoffset_y = this.viewer.scene.camera.look[1] - this.viewer.scene.camera.eye[1];
    var eyeoffset_z = this.viewer.scene.camera.look[2] - this.viewer.scene.camera.eye[2];


    this.viewer.scene.camera.eye = [this.viewer.scene.camera.eye[0] - (eyeoffset_x * 1), this.viewer.scene.camera.eye[1] - (eyeoffset_y * 1), this.viewer.scene.camera.eye[2]]


    //this.viewer.scene.camera.look = [this.model!.cen.x * this.model!.scaleRes, this.model!.cen.y * this.model!.scaleRes, this.model!.cen.z * this.model!.scaleRes];
    //this.viewer.scene.camera.eye = [(this.model!.min.x - 6000) * this.model!.scaleRes, (this.model!.min.y - 6000) * this.model!.scaleRes, this.model!.cen.z * this.model!.scaleRes];


},

 GUI_navmodeORBITrotcw() {
    this.viewer.scene.camera.orbitYaw(-20.0);
},
 GUI_navmodeORBITrotccw() {
    this.viewer.scene.camera.orbitYaw(20.0);
},


 GUI_onclickSELECT() {
    // document.getElementById("onclickSELECT").style.backgroundColor = '#007';
    // document.getElementById("onclickMEASURE").style.backgroundColor = '';
    // document.getElementById("onclickGOTO").style.backgroundColor = '';
    this.isFP = false;
    this.selectMode = "select";
    //sectionPlanes.clear();
    this.distanceMeasurements.clear();
    this.distanceMeasurements.control.deactivate();
},

 GUI_onclickMEASURE() {
    // document.getElementById("onclickSELECT").style.backgroundColor = '';
    // document.getElementById("onclickMEASURE").style.backgroundColor = '#007';
    // document.getElementById("onclickGOTO").style.backgroundColor = '';
    this.isFP = true;
    this.selectMode = "measure"
    //sectionPlanes.clear();
    this.distanceMeasurements.control.activate();
},

GUI_onclickGOTO() {
    // document.getElementById("onclickSELECT").style.backgroundColor = '';
    // document.getElementById("onclickMEASURE").style.backgroundColor = '';
    // document.getElementById("onclickGOTO").style.backgroundColor = '#007';
    this.isFP = true;
    this.selectMode = "goto";
    //sectionPlanes.clear();
    this.distanceMeasurements.clear();
    this.distanceMeasurements.control.deactivate();
},

GUI_onclickSLICE() {
    //document.getElementById("rdoSelectItem").onclick = (e) => {
    // document.getElementById("onclickSELECT").style.backgroundColor = '';
    // document.getElementById("onclickMEASURE").style.backgroundColor = '';
    // document.getElementById("onclickGOTO").style.backgroundColor = '';
    this.isFP = true;
    this.selectMode = "slice"
    this.distanceMeasurements.clear();
    this.distanceMeasurements.control.deactivate();
},



GUI_actionPARTS() {
    // if (document.getElementById("navPARTSpanel").style.display == 'none') {
    //     document.getElementById("navPARTSpanel").style.display = '';
    // } else {
    //     document.getElementById("navPARTSpanel").style.display = 'none';
    // }
},


GUI_actionPLAN() {
    // if (document.getElementById("navBIRDSEYEpanel").style.display == 'none') {
    //     document.getElementById("navBIRDSEYEpanel").style.display = '';
    // } else {
    //     document.getElementById("navBIRDSEYEpanel").style.display = 'none';
    // }
},

GUI_actionELEV() {
    // if (document.getElementById("navELEVATIONpanel").style.display == 'none') {
    //     document.getElementById("navELEVATIONpanel").style.display = '';
    // } else {
    //     document.getElementById("navELEVATIONpanel").style.display = 'none';
    // }
},


GUI_actionDETAILS() {

  // TODO

    // console.log("GUI_actionDETAILS");

    // if (document.getElementById("INFOFRAME").style.display == 'none') {
    //     document.getElementById("INFOFRAME").style.display = '';
    //     document.getElementById("INFOFRAME").src = "ADBDETAILS.ASPX?OBJID=" + document.getElementById("itemId").value;
    // } else {
    //     document.getElementById("INFOFRAME").style.display = 'none';
    // }
},

GUI_actionGOTO(targetID: string) {

    console.log("GUI_actionGOTO");

    //document.getElementById("showItem").onclick = (e) => {    
    if (targetID.indexOf('_M') > targetID.length - 6) {
        targetID = targetID.substring(0, targetID.indexOf('_M'));

    }
    const entity = this.viewer.scene.objects[targetID];
    if (entity) {
        this.ADBGoToItem3d(entity.aabb);
        this.itemId = targetID;
    }

    //if (mode == "2d") {
    //  this.storeyViewsPlugin.showStoreyObjects(currentSId, {
    //    hideOthers: true,
    //    useObjectStates: false
    //  });
    //}

    //if (mode == "2d") {
    //  this.storeyViewsPlugin.showStoreyObjects(currentSId, {
    //    hideOthers: true,
    //    useObjectStates: false
    //  });
    //  this.storeyViewsPlugin.gotoStoreyCamera(currentSId, {
    //    projection: "ortho",
    //    done: () => {
    //      this.viewer.cameraControl.navMode = "planView"; // Disable rotation
    //      document.getElementById("navPlanView").checked = true;
    //      document.getElementById("projOrtho").checked = true;
    //      this.viewer.cameraFlight.flyTo({
    //        aabb: ent.aabb,
    //        fitFOV: 50
    //      }, () => {
    //      });
    //    }
    //  });
    //} else if (mode == "3dOf2d") {
    //  this.storeyViewsPlugin.gotoStoreyCamera(currentSId, {
    //    projection: "perspective",
    //    done: () => {
    //      document.getElementById("projPerspective").checked = true;
    //      GoToItem3d(metaObjectType, ent.aabb);
    //    }
    //  });
    //} else {
    //  GoToItem3d(metaObjectType, ent.aabb);
    //}


},


GUI_movesectionplaneCD() {//Lower ceiling section plane 1m.
    const mySectionPlane2 = this.sectionPlanes.sectionPlanes["Ceiling"];
    mySectionPlane2.pos = [mySectionPlane2.pos[0], mySectionPlane2.pos[1], mySectionPlane2.pos[2] - (500 * this.model!.scaleRes)];
    //mySectionPlane2.dir = [0.4, 0.0, 0.5];
},
GUI_movesectionplaneCU() {//Raise ceiling section plane 1m.
    const mySectionPlane2 = this.sectionPlanes.sectionPlanes["Ceiling"];
    mySectionPlane2.pos = [mySectionPlane2.pos[0], mySectionPlane2.pos[1], mySectionPlane2.pos[2] + (500 * this.model!.scaleRes)];
    //mySectionPlane2.dir = [0.4, 0.0, 0.5];
},
GUI_movesectionplaneFD() {//Lower floor section plane 1m.
    const mySectionPlane2 = this.sectionPlanes.sectionPlanes["Floor"];
    mySectionPlane2.pos = [mySectionPlane2.pos[0], mySectionPlane2.pos[1], mySectionPlane2.pos[2] - (500 * this.model!.scaleRes)];
    //mySectionPlane2.dir = [0.4, 0.0, 0.5];
},
GUI_movesectionplaneFU() {//Raise floor section plane 1m.
    const mySectionPlane2 = this.sectionPlanes.sectionPlanes["Floor"];
    mySectionPlane2.pos = [mySectionPlane2.pos[0], mySectionPlane2.pos[1], mySectionPlane2.pos[2] + (500 * this.model!.scaleRes)];
    //mySectionPlane2.dir = [0.4, 0.0, 0.5];
},




  },
});
</script>