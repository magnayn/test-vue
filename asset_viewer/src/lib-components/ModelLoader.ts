import { ModelInfo } from "@/interfaces/ModelInterfaces";
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
    math,
    Entity,
    XKTLoaderPlugin,
  } from "@xeokit/xeokit-sdk/dist/xeokit-sdk.es.js";
import AssetDBClient from "./AssetDBClient";


/*
  "id":"c7c38318-0af1-4548-b8bb-b8a0d09abf63","modelId":"c7c38318-0af1-4548-b8bb-b8a0d09abf63",
  "floorList":[{"id":"00000000-0000-0000-0000-000000000000","name":"Ground","elevation":0.0},
  {"id":"00000000-0000-0000-0000-000000000000","name":"First","elevation":3899.99999999962},
  {"id":"00000000-0000-0000-0000-000000000000","name":"Roof","elevation":7800.0}],
  
  "xktUrl":"https://saassetdbdev.blob.core.windows.net/xkt/f3054cc9-77e5-4eac-a310-39cac4acaf3e/c7c38318-0af1-4548-b8bb-b8a0d09abf63/geometr
  y.xkt?sv=2020-08-04&se=2022-02-25T13%3A12%3A06Z&sr=b&sp=rw&sig=jkiAjaVEtot%2BnBVnfViI10smoB3xLcpc%2BTOBXQNboCE%3D",
  
  
  "scaleRes":0.1,"elevationScale":0.0384615384615385,"startPos":{"x":-34496.48,"y":-23249.02,"z":4580.465},
  "min":{"x":-34496.48,"y":-23249.02,"z":-181.0},"cen":{"x":-323.805,"y":7.88999999999942,"z":4580.465},"max":null,"partsCount":1,
  
  "cutPlane":{"upper":3799.99999999962,"lower":7800.0},"defaultObject":"c7c38318-0af1-4548-b8bb-b8a0d09abf63",
  "focusRange":2000.0,"birdsEye":{"boxScale":1.0}}
*/




export default class ModelLoader {

    constructor(viewer:Viewer, model) {
      this.xktLoader = new XKTLoaderPlugin(viewer);
      this.model = model;
      this.viewer = viewer;
    }
  
    viewer:Viewer;

    modelparts: Entity[] = [];
    modelrooms: any[] = [];
    xktLoader: any;
  
    model: ModelInfo;
  
    get assetDBClient():AssetDBClient {
        return this.model.assetDBClient;
    }


    load(callback) {
      var modelinitialIndex = 0;
      var max: number = this.model.partsCount;
      var i: number;
  
 
  
      for (i = 1; i <= max; i++) {

    this.modelparts.push("");
       
          modelinitialIndex = i - 1;
          var entity = this.xktLoader.load({
            id: "myModel" + i,
            src: this.model.xktUrl,
            edges: true,
            /*saoEnabled: true,
            pbrEnabled: false,
            backfaces: true,
            includeTypes: [
              "furniturePart",
              "IfcFace",
              "IfcWallStandardCase",
              "IfcBuildingElementProxy",
              "IfcFlowController",
              "IfcBuildingElementProxyType",
              "IfcFlowTerminal",
              "IfcPlate",
              "IfcMemberType",
              "IfcRelFillsElement",
              "IfcDoor",
              "IfcCovering",
              "IfcCoveringType",
              "IfcPlateType",
              "IfcSpace",
              "IfcSpaceType",
              "IfcSlab",
              "IfcSlabType",
              "IfcWindow",
              "IfcRelContainedInSpatialStructure",
              "IfcFurnishingElement",
              "IfcDoorLiningProperties",
              "IfcDoorPanelProperties",
              "IfcDoorStyle",
              "IfcConnectedFaceSet",
              "IfcCurtainWall",
              "IfcRailing",
              "IfcRoof",
              "IfcWindowLiningProperties",
              "IfcWindowStyle",
              "IfcWallType",
              "IfcWall",
              "IfcDistributionElementType",
              "IfcStairFlight",
              "IfcStairFlightType",
              "IfcStair",
              "IfcRailingType",
              "IfcColumn",
              "IfcCurtainWallType",
              "IfcBuildingStorey",
              "IfcColumnType",
              "IfcBuilding",
              "IfcSite",
            ],*/
            //includeTypes:["IfcPolyLoop","IfcFace","IfcFaceOuterBound","IfcCartesianPoint","IfcAxis2Placement3D","IfcShapeRepresentation","IfcLocalPlacement","IfcDirection","IfcProductDefinitionShape","IfcPolyline","IfcExtrudedAreaSolid","IfcMappedItem","IfcAxis2Placement2D","IfcBuildingElementProxy","IfcCompositeCurveSegment","IfcRectangleProfileDef","IfcFacetedBrep","IfcClosedShell","IfcWallStandardCase","IfcArbitraryClosedProfileDef","IfcFaceBound","IfcTrimmedCurve","IfcCircle","IfcRepresentationMap","IfcArbitraryProfileDefWithVoids","IfcFlowTerminal","IfcCompositeCurve","IfcCovering","IfcSpace","IfcDoor","IfcWindow","IfcFurnishingElement","IfcRelContainedInSpatialStructure","IfcBooleanClippingResult","IfcPlane","IfcCircleProfileDef","IfcSlab","IfcRoof","IfcHalfSpaceSolid","IfcCurtainWall","IfcConnectedFaceSet","IfcFlowController","IfcRailing","IfcWall","IfcCircleHollowProfileDef","IfcPolygonalBoundedHalfSpace","IfcStair","IfcOrganization","IfcGeometricRepresentationSubContext","IfcFaceBasedSurfaceModel","IfcBuildingStorey","IfcOwnerHistory","IfcPersonAndOrganization","IfcPerson","IfcApplication","IfcGeometricRepresentationContext","IfcCartesianTransformationOperator3D"]
          });
       // } else {
          // NADA
       // }
      }
  
  
      this.modelparts[modelinitialIndex] = entity;

      console.log("Part Loaded");
      console.log(entity);

      this.modelparts[modelinitialIndex].on("loaded", callback);
      
      

    }
  
    loadPart(partIndex, name) {
      this.modelparts[partIndex] = this.xktLoader.load({
              //this.model2 = xktLoader.load({
              id: "myModel2",
              //src: "./XKTFiles/" + e.target.value + ".xkt",
              src: this.assetDBClient.getXKTUrlFor(name),
              edges: true,
              saoEnabled: true,
              pbrEnabled: false,
              backfaces: true,
              includeTypes: ["furniturePart", "IfcFace", "IfcWallStandardCase", "IfcBuildingElementProxy", "IfcFlowController", "IfcBuildingElementProxyType", "IfcFlowTerminal", "IfcPlate", "IfcMemberType", "IfcRelFillsElement", "IfcDoor", "IfcCovering", "IfcCoveringType", "IfcPlateType", "IfcSpace", "IfcSpaceType", "IfcSlab", "IfcSlabType", "IfcWindow", "IfcRelContainedInSpatialStructure", "IfcFurnishingElement", "IfcDoorLiningProperties", "IfcDoorPanelProperties", "IfcDoorStyle", "IfcConnectedFaceSet", "IfcCurtainWall", "IfcRailing", "IfcRoof", "IfcWindowLiningProperties", "IfcWindowStyle", "IfcWallType", "IfcWall", "IfcDistributionElementType", "IfcStairFlight", "IfcStairFlightType", "IfcStair", "IfcRailingType", "IfcColumn", "IfcCurtainWallType", "IfcBuildingStorey", "IfcColumnType", "IfcBuilding", "IfcSite"]
              //includeTypes: ["IfcFace", "IfcDistributionPort", "IfcRelConnectsPortToElement", "IfcRelConnectsPorts", "IfcClosedShell", "IfcCovering", "IfcFlowSegment", "IfcFlowFitting", "IfcRelCoversBldgElements", "IfcRelAssociatesMaterial", "IfcBuildingElementProxy", "IfcFlowTerminal", "IfcFaceBound", "IfcSystem", "IfcRelServicesBuildings", "IfcConnectedFaceSet", "IfcBuildingElementProxyType", "IfcSlab", "IfcSlabType", "IfcSpace", "IfcSpaceType", "IfcRelContainedInSpatialStructure", "IfcBuildingStorey", "IfcBuilding", "IfcSite", "IfcZone"]
          });
    }
  
    removePart(partIndex) {
      this.modelparts[partIndex].destroy();
    }
  
    loadRoom(name) {
           this.modelrooms.push('');
           //    alert('Load room REQ-101-' + document.getElementById('navROOMLST').value + '.xkt');
           var nextroomindex = this.modelrooms.length - 1;
           this.modelrooms[nextroomindex] = this.xktLoader.load({
               id: "Room" + nextroomindex,
               src: this.assetDBClient.getXKTUrlFor(name),
               //src: "./XKTFiles/REQ-101-" + document.getElementById('navROOMLST').value + ".xkt",
               edges: true,
               saoEnabled: true,
               pbrEnabled: false,
               backfaces: true,
               includeTypes: ["furniturePart", "IfcFace", "IfcWallStandardCase", "IfcBuildingElementProxy", "IfcFlowController", "IfcBuildingElementProxyType", "IfcFlowTerminal", "IfcPlate", "IfcMemberType", "IfcRelFillsElement", "IfcDoor", "IfcCovering", "IfcCoveringType", "IfcPlateType", "IfcSpace", "IfcSpaceType", "IfcSlab", "IfcSlabType", "IfcWindow", "IfcRelContainedInSpatialStructure", "IfcFurnishingElement", "IfcDoorLiningProperties", "IfcDoorPanelProperties", "IfcDoorStyle", "IfcConnectedFaceSet", "IfcCurtainWall", "IfcRailing", "IfcRoof", "IfcWindowLiningProperties", "IfcWindowStyle", "IfcWallType", "IfcWall", "IfcDistributionElementType", "IfcStairFlight", "IfcStairFlightType", "IfcStair", "IfcRailingType", "IfcColumn", "IfcCurtainWallType", "IfcBuildingStorey", "IfcColumnType", "IfcBuilding", "IfcSite"]
               //includeTypes:["IfcPolyLoop","IfcFace","IfcFaceOuterBound","IfcCartesianPoint","IfcAxis2Placement3D","IfcShapeRepresentation","IfcLocalPlacement","IfcDirection","IfcProductDefinitionShape","IfcPolyline","IfcExtrudedAreaSolid","IfcMappedItem","IfcAxis2Placement2D","IfcBuildingElementProxy","IfcCompositeCurveSegment","IfcRectangleProfileDef","IfcFacetedBrep","IfcClosedShell","IfcWallStandardCase","IfcArbitraryClosedProfileDef","IfcFaceBound","IfcTrimmedCurve","IfcCircle","IfcRepresentationMap","IfcArbitraryProfileDefWithVoids","IfcFlowTerminal","IfcCompositeCurve","IfcCovering","IfcSpace","IfcDoor","IfcWindow","IfcFurnishingElement","IfcRelContainedInSpatialStructure","IfcBooleanClippingResult","IfcPlane","IfcCircleProfileDef","IfcSlab","IfcRoof","IfcHalfSpaceSolid","IfcCurtainWall","IfcConnectedFaceSet","IfcFlowController","IfcRailing","IfcWall","IfcCircleHollowProfileDef","IfcPolygonalBoundedHalfSpace","IfcStair","IfcOrganization","IfcGeometricRepresentationSubContext","IfcFaceBasedSurfaceModel","IfcBuildingStorey","IfcOwnerHistory","IfcPersonAndOrganization","IfcPerson","IfcApplication","IfcGeometricRepresentationContext","IfcCartesianTransformationOperator3D"]
           });
    }
  }
  