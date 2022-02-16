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
    XKTLoaderPlugin,
  } from "@xeokit/xeokit-sdk/dist/xeokit-sdk.es.js";

export default class ModelLoader {

    constructor(viewer, model) {
      this.xktLoader = new XKTLoaderPlugin(viewer);
      this.model = model;
    }
  
    modelparts: any[] = [];
    modelrooms: any[] = [];
    xktLoader: any;
  
    model: any;
  
    load(callback) {
      var modelinitialIndex = 0;
      var max: number = this.model.partsCount;
      var i: number;
  
      
  
      for (i = 1; i <= max; i++) {
  
    this.modelparts.push("");
        //var navPart = document.getElementById("navPARTS" + i) as HTMLInputElement;
       // if (navPart.checked) {
          //alert('load model' + "./XKTFiles/REQ-" + this.model.xktreq + ".xkt");
          modelinitialIndex = i - 1;
          this.modelparts[modelinitialIndex] = this.xktLoader.load({
            id: "myModel" + i,
            //src: "./XKTFiles/REQ-" + this.model.xktreq + ".xkt",
            src: "http://localhost:57914/api/v1/asset/xkt/REQ-" + this.model.xktreq + ".xkt",
            edges: true,
            saoEnabled: true,
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
            ],
            //includeTypes:["IfcPolyLoop","IfcFace","IfcFaceOuterBound","IfcCartesianPoint","IfcAxis2Placement3D","IfcShapeRepresentation","IfcLocalPlacement","IfcDirection","IfcProductDefinitionShape","IfcPolyline","IfcExtrudedAreaSolid","IfcMappedItem","IfcAxis2Placement2D","IfcBuildingElementProxy","IfcCompositeCurveSegment","IfcRectangleProfileDef","IfcFacetedBrep","IfcClosedShell","IfcWallStandardCase","IfcArbitraryClosedProfileDef","IfcFaceBound","IfcTrimmedCurve","IfcCircle","IfcRepresentationMap","IfcArbitraryProfileDefWithVoids","IfcFlowTerminal","IfcCompositeCurve","IfcCovering","IfcSpace","IfcDoor","IfcWindow","IfcFurnishingElement","IfcRelContainedInSpatialStructure","IfcBooleanClippingResult","IfcPlane","IfcCircleProfileDef","IfcSlab","IfcRoof","IfcHalfSpaceSolid","IfcCurtainWall","IfcConnectedFaceSet","IfcFlowController","IfcRailing","IfcWall","IfcCircleHollowProfileDef","IfcPolygonalBoundedHalfSpace","IfcStair","IfcOrganization","IfcGeometricRepresentationSubContext","IfcFaceBasedSurfaceModel","IfcBuildingStorey","IfcOwnerHistory","IfcPersonAndOrganization","IfcPerson","IfcApplication","IfcGeometricRepresentationContext","IfcCartesianTransformationOperator3D"]
          });
       // } else {
          // NADA
       // }
      }
  
  
      this.modelparts[modelinitialIndex].on("loaded", callback);
  
    }
  
    loadPart(partIndex, name) {
      this.modelparts[partIndex] = this.xktLoader.load({
              //this.model2 = xktLoader.load({
              id: "myModel2",
              //src: "./XKTFiles/" + e.target.value + ".xkt",
              src: "http://localhost:57914/api/v1/asset/xkt/" + name + ".xkt",
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
               src: "http://localhost:57914/api/v1/asset/xkt/REQ-101-" + name + ".xkt",
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
  