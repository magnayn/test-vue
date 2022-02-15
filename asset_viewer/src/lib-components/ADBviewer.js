
import {
    Viewer, XKTLoaderPlugin, DistanceMeasurementsPlugin, StoreyViewsPlugin, math,
    CameraMemento, ObjectsMemento, FastNavPlugin, NavCubePlugin, ViewCullPlugin, ContextMenu,
    SectionPlanesPlugin
} from "@xeokit/xeokit-sdk/dist/xeokit-sdk.es.js";


var self;

export function go(_self) {


    self = _self;

    
    document.getElementById("itemId").value = self.model.default_object;
    
    //SetupGUI();


    //document.getElementById('navBIRDSEYE').onload = GUI_setSVGassetpos;
    GUI_setSVGassetpos();



    //Set actions for part checkboxes
    for (let i = 1; i <= self.model.partsCount; i++) {
        document.getElementById("navPARTS" + i).onclick = GUI_navmodePARTS;
    }

    setInterval(GUI_refreshSVGcampos, 1000);

}



function ADBGoToItem3d(entAabbF) {

    console.log("ADBGoToItem3d");

    const camera = self.viewer.scene.camera;
    const idx = camera.xUp ? 0 : (camera.yUp ? 1 : 2); // Find the right axis for "up"
    //if (canStandOnTypes[metaObjectTypeF]) {
    //  worldPos[idx] = worldPos[idx] + 1;
    //}
    self.viewer.cameraFlight.flyTo({
        eye: self.worldPos,
        look: self.mode == "3dOf2d" ? math.addVec3(self.worldPos, self.viewer.camera.worldForward, []) : null,
        up: self.viewer.camera.worldUp,
        projection: "perspective",
    }, () => {
        //if (canStandOnTypes[metaObjectTypeF]) {
        //  self.viewer.cameraControl.navMode = "firstPerson";
        //  document.getElementById("navFirstPerson").checked = true;
        //  document.getElementById("projPerspective").checked = true;
        //  mode = "3d";
        //} else {
        self.viewer.cameraFlight.flyTo({
            aabb: entAabbF,
            fitFOV: 45
        }, () => {
            self.viewer.cameraControl.navMode = "firstPerson";
            //document.getElementById("navFirstPerson").checked = true;
            //document.getElementById("projPerspective").checked = true;
            self.mode = "3d";
        });
        //}
    });
}




function GUI_navmodeTARGETLOCK() {
    var SVGelement = document.getElementById('navBIRDSEYEdiv').children[0];
    if (self.model.nav.targetLock) {
        self.model.nav.targetLock = false;
        document.getElementById("navmodeTARGETLOCK").style.backgroundColor = '';
        SVGelement.getElementById("SVGPOSASSET").setAttribute('href', 'images/ICON_navmode_targetlockoff.png');
    } else {
        self.model.nav.targetLock = true;
        document.getElementById("navmodeTARGETLOCK").style.backgroundColor = '#88F';
        SVGelement.getElementById("SVGPOSASSET").setAttribute('href', 'images/ICON_navmode_targetlock.png');
    }

}



function GUI_actionGOTOroom() {
    // NADA
}
function GUI_actionPARTSroom() {
    var roomtoload = document.getElementById('navROOMLST').options[document.getElementById('navROOMLST').selectedIndex].text;
    roomtoload = roomtoload.substring(roomtoload.indexOf('-') + 1);
    if (self.model.nav.loadedRooms.indexOf(',' + roomtoload + ',') > -1) {
        alert('Room ' + roomtoload + ' is already loaded.');
    } else {


        self.model.nav.loadedRooms += roomtoload + ',';
        var SVGelement = document.getElementById('navBIRDSEYEdiv').children[0];
        for (var child = SVGelement.firstChild; child !== null; child = child.nextSibling) {
            if (self.model.nav.loadedRooms.indexOf(',' + child.id + ',') > -1) {
                child.setAttribute('fill', '#1fa0f0');
            }
        }

        self.modelrooms.push('');
        //    alert('Load room REQ-101-' + document.getElementById('navROOMLST').value + '.xkt');
        var nextroomindex = self.modelrooms.length - 1;
        self.modelrooms[nextroomindex] = self.xktLoader.load({
            id: "Room" + nextroomindex,
            src: "http://localhost:57914/api/v1/asset/xkt/REQ-101-" + document.getElementById('navROOMLST').value + ".xkt",
            //src: "./XKTFiles/REQ-101-" + document.getElementById('navROOMLST').value + ".xkt",
            edges: true,
            saoEnabled: true,
            pbrEnabled: false,
            backfaces: true,
            includeTypes: ["furniturePart", "IfcFace", "IfcWallStandardCase", "IfcBuildingElementProxy", "IfcFlowController", "IfcBuildingElementProxyType", "IfcFlowTerminal", "IfcPlate", "IfcMemberType", "IfcRelFillsElement", "IfcDoor", "IfcCovering", "IfcCoveringType", "IfcPlateType", "IfcSpace", "IfcSpaceType", "IfcSlab", "IfcSlabType", "IfcWindow", "IfcRelContainedInSpatialStructure", "IfcFurnishingElement", "IfcDoorLiningProperties", "IfcDoorPanelProperties", "IfcDoorStyle", "IfcConnectedFaceSet", "IfcCurtainWall", "IfcRailing", "IfcRoof", "IfcWindowLiningProperties", "IfcWindowStyle", "IfcWallType", "IfcWall", "IfcDistributionElementType", "IfcStairFlight", "IfcStairFlightType", "IfcStair", "IfcRailingType", "IfcColumn", "IfcCurtainWallType", "IfcBuildingStorey", "IfcColumnType", "IfcBuilding", "IfcSite"]
            //includeTypes:["IfcPolyLoop","IfcFace","IfcFaceOuterBound","IfcCartesianPoint","IfcAxis2Placement3D","IfcShapeRepresentation","IfcLocalPlacement","IfcDirection","IfcProductDefinitionShape","IfcPolyline","IfcExtrudedAreaSolid","IfcMappedItem","IfcAxis2Placement2D","IfcBuildingElementProxy","IfcCompositeCurveSegment","IfcRectangleProfileDef","IfcFacetedBrep","IfcClosedShell","IfcWallStandardCase","IfcArbitraryClosedProfileDef","IfcFaceBound","IfcTrimmedCurve","IfcCircle","IfcRepresentationMap","IfcArbitraryProfileDefWithVoids","IfcFlowTerminal","IfcCompositeCurve","IfcCovering","IfcSpace","IfcDoor","IfcWindow","IfcFurnishingElement","IfcRelContainedInSpatialStructure","IfcBooleanClippingResult","IfcPlane","IfcCircleProfileDef","IfcSlab","IfcRoof","IfcHalfSpaceSolid","IfcCurtainWall","IfcConnectedFaceSet","IfcFlowController","IfcRailing","IfcWall","IfcCircleHollowProfileDef","IfcPolygonalBoundedHalfSpace","IfcStair","IfcOrganization","IfcGeometricRepresentationSubContext","IfcFaceBasedSurfaceModel","IfcBuildingStorey","IfcOwnerHistory","IfcPersonAndOrganization","IfcPerson","IfcApplication","IfcGeometricRepresentationContext","IfcCartesianTransformationOperator3D"]
        });

        self.modelrooms[nextroomindex].on("loaded", () => {
            var t1 = performance.now();
            document.getElementById("stats2").innerHTML = "Room " + document.getElementById('navROOMLST').value + " load " + Math.floor(t1 - self.t0) / 1000.0 + " secs<br>Objects: " + self.modelrooms[nextroomindex].numEntities;
        });

    }
}


function GUI_BIRDSEYEmag(e) {
    //alert(e.target.id);
    var SVGelement = document.getElementById('navBIRDSEYEdiv').children[0];
    if (e.target.id == 'navBIRDSEYEmagFit') {
        self.model.birdsEye.boxscale = 1.0;
        SVGelement.style.width = '100%';
        SVGelement.style.height = '100%';
    }
    if (e.target.id == 'navBIRDSEYEmagx2') {
        self.model.birdsEye.boxscale = 2.0;
        SVGelement.style.width = '200%';
        SVGelement.style.height = '200%';
        SVGelement.style.marginTop = '-100px';
    }
    if (e.target.id == 'navBIRDSEYEmagx4') {
        self.model.birdsEye.boxscale = 4.0;
        SVGelement.style.width = '400%';
        SVGelement.style.height = '400%';
    }
    if (e.target.id == 'navBIRDSEYEmagx8') {
        self.model.birdsEye.boxscale = 8.0;
        SVGelement.style.width = '800%';
        SVGelement.style.height = '800%';
    }
    if (e.target.id == 'navBIRDSEYEmagx16') {
        self.model.birdsEye.boxscale = 16.0;
        SVGelement.style.width = '1600%';
        SVGelement.style.height = '1600%';
    }
    if (e.target.id == 'navBIRDSEYEmagx32') {
        self.model.birdsEye.boxscale = 32.0;
        SVGelement.style.width = '3200%';
        SVGelement.style.height = '3200%';
    }
    if (e.target.id == 'navBIRDSEYEmagx64') {
        self.model.birdsEye.boxscale = 64.0;
        SVGelement.style.width = '6400%';
        SVGelement.style.height = '6400%';
    }
    // The cursor point, translated into screen coordinates - 
    var SVGbound = SVGelement.getBoundingClientRect();
    var pt = SVGelement.createSVGPoint();
    //var viewbox = SVGelement.getAttribute('viewBox').split(" ");
    //var viewboxminy = viewbox[1];
    //var viewboxhgt = viewbox[3];
    //var SVGtruminy = (viewboxminy * 1) + (viewboxhgt * 1);
    pt.x = SVGelement.getElementById("SVGPOSCAM").getAttribute("cx") * 1;
    pt.y = SVGelement.getElementById("SVGPOSCAM").getAttribute("cy") * 1;
    var cursorpt = pt.matrixTransform(SVGelement.getScreenCTM());
    var CAMpxposY = cursorpt.y - SVGbound.top;
    var CAMpxposX = cursorpt.x - SVGbound.left;
    //alert('CAMpxposY=' + CAMpxposY + ' SVGbound.height=' + SVGbound.height);
    SVGelement.style.marginTop = ((((SVGbound.height / self.model.birdsEye.boxscale) * 0.5) - CAMpxposY)) + 'px';
    SVGelement.style.marginLeft = ((((SVGbound.width / self.model.birdsEye.boxscale) * 0.5) - CAMpxposX)) + 'px';

    GUI_setSVGassetpos();
}



function GUI_navmodePARTS(e) {
    var partIndex = e.target.id.substring(8, 99) * 1;
    if (e.target.checked) {
        //alert('turn on' + e.target.value + ' ID:' + partIndex);

        //alert('turn on' + e.target.value);
        //var p0 = performance.now();
        //document.getElementById("stats2").innerHTML = "Loading self.model 2...";
        self.modelparts[partIndex] = self.xktLoader.load({
            //self.model2 = xktLoader.load({
            id: "myModel2",
            //src: "./XKTFiles/" + e.target.value + ".xkt",
            src: "http://localhost:57914/api/v1/asset/xkt/" + e.target.value + ".xkt",
            edges: true,
            saoEnabled: true,
            pbrEnabled: false,
            backfaces: true,
            includeTypes: ["furniturePart", "IfcFace", "IfcWallStandardCase", "IfcBuildingElementProxy", "IfcFlowController", "IfcBuildingElementProxyType", "IfcFlowTerminal", "IfcPlate", "IfcMemberType", "IfcRelFillsElement", "IfcDoor", "IfcCovering", "IfcCoveringType", "IfcPlateType", "IfcSpace", "IfcSpaceType", "IfcSlab", "IfcSlabType", "IfcWindow", "IfcRelContainedInSpatialStructure", "IfcFurnishingElement", "IfcDoorLiningProperties", "IfcDoorPanelProperties", "IfcDoorStyle", "IfcConnectedFaceSet", "IfcCurtainWall", "IfcRailing", "IfcRoof", "IfcWindowLiningProperties", "IfcWindowStyle", "IfcWallType", "IfcWall", "IfcDistributionElementType", "IfcStairFlight", "IfcStairFlightType", "IfcStair", "IfcRailingType", "IfcColumn", "IfcCurtainWallType", "IfcBuildingStorey", "IfcColumnType", "IfcBuilding", "IfcSite"]
            //includeTypes: ["IfcFace", "IfcDistributionPort", "IfcRelConnectsPortToElement", "IfcRelConnectsPorts", "IfcClosedShell", "IfcCovering", "IfcFlowSegment", "IfcFlowFitting", "IfcRelCoversBldgElements", "IfcRelAssociatesMaterial", "IfcBuildingElementProxy", "IfcFlowTerminal", "IfcFaceBound", "IfcSystem", "IfcRelServicesBuildings", "IfcConnectedFaceSet", "IfcBuildingElementProxyType", "IfcSlab", "IfcSlabType", "IfcSpace", "IfcSpaceType", "IfcRelContainedInSpatialStructure", "IfcBuildingStorey", "IfcBuilding", "IfcSite", "IfcZone"]
        });
    } else {
        //alert('turn off' + e.target.value);
        self.modelparts[partIndex].destroy();
    }
}









function GUI_setSVGcampos(e) {
    var SVGelement = document.getElementById('navBIRDSEYEdiv').children[0];//document.getElementById('navBIRDSEYE').getSVGDocument().children[0];
    var pt = SVGelement.createSVGPoint();
    var viewbox = SVGelement.getAttribute('viewBox').split(" ");
    var viewboxminy = viewbox[1];
    var viewboxhgt = viewbox[3];
    var SVGtruminy = (viewboxminy * 1) + (viewboxhgt * 1);
    pt.x = e.clientX;
    pt.y = e.clientY;
    //debugger;
    if (e.srcElement) {
        var roomID = e.srcElement.id;
        //document.getElementById('navROOMLST').value = roomID;
        var dd = document.getElementById('navROOMLST');
        for (var i = 0; i < dd.options.length; i++) {
            if (dd.options[i].text.indexOf('-' + roomID) > -1) {
                dd.selectedIndex = i;
                break;
            }
        }
    }

    // The cursor point, translated into svg coordinates - 
    var cursorpt = pt.matrixTransform(SVGelement.getScreenCTM().inverse());
    var IFC_x_cm = cursorpt.x * 0.1;
    var IFC_y_cm = (SVGtruminy - cursorpt.y) * 0.1;

    self.GUI_navSetCameraXY(IFC_x_cm, IFC_y_cm);
    if (e.srcElement.getAttribute("fill") == '#ebba1c' && e.shiftKey == false) {
        GUI_actionPARTSroom();
    }


}




function GUI_refreshSVGcampos() {
    var svg_doc = document.getElementById('navBIRDSEYEdiv').children[0];
    try {
        var viewbox = svg_doc.getAttribute('viewBox').split(" ");
        var viewboxminy = viewbox[1];
        var viewboxhgt = viewbox[3];
        var SVGtruminy = (viewboxminy * 1) + (viewboxhgt * 1);

        var SVGx = (self.viewer.scene.camera.eye[0] * 10);
        var SVGy = SVGtruminy - ((self.viewer.scene.camera.eye[1] * 10));

        svg_doc.getElementById("SVGPOSCAM").setAttribute("cx", SVGx);
        svg_doc.getElementById("SVGPOSCAM").setAttribute("cy", SVGy);
        svg_doc.getElementById("SVGPOSCAM").setAttribute("r", 2000 / self.model.birdsEye.boxscale);

        svg_doc.getElementById("SVGDIRCAM").setAttribute("x1", SVGx);
        svg_doc.getElementById("SVGDIRCAM").setAttribute("y1", SVGy);
        SVGx = (self.viewer.scene.camera.look[0] * 10);
        SVGy = SVGtruminy - ((self.viewer.scene.camera.look[1] * 10));
        svg_doc.getElementById("SVGDIRCAM").setAttribute("x2", SVGx);
        svg_doc.getElementById("SVGDIRCAM").setAttribute("y2", SVGy);



        //alert(self.viewer.scene.camera.eye[0]);
        //alert(SVGdoc.getElementById("SVGCAMPOS").)
    } catch (err) {
        // NADA
    }
    document.getElementById('DEBUGINFO').innerHTML = 'Obj Count=' + self.viewer.scene.numObjects +
        ' campos ' + Math.round(self.viewer.scene.camera.eye[0], 0) + ',' +
        Math.round(self.viewer.scene.camera.eye[1], 0) + ',' +
        Math.round(self.viewer.scene.camera.eye[2], 0) + 'camlook ' +
        Math.round(self.viewer.scene.camera.look[0], 0) + ',' +
        Math.round(self.viewer.scene.camera.look[1], 0) + ',' +
        Math.round(self.viewer.scene.camera.look[2], 0) + 'camUP ' +
        Math.round(self.viewer.scene.camera.up[0], 0) + ',' +
        Math.round(self.viewer.scene.camera.up[1], 0) + ',' +
        Math.round(self.viewer.scene.camera.up[2], 0);

    //Set elevation icon
    svg_doc = document.getElementById('navELEVATIONgraphic');
    svg_doc.getElementById("SVGPOSCAMelev").setAttribute("cy", 300 - ((self.viewer.scene.camera.eye[2] * 10) * self.model.elevationScale));


}



function GUI_setSVGassetpos() {
    var SVGelement = document.getElementById('navBIRDSEYEdiv').children[0];
    try {
        //svg_doc.getElementById("SVGPOSASSET").setAttribute("cx", self.model.startpos.x);
        //svg_doc.getElementById("SVGPOSASSET").setAttribute("cy", self.model.startpos.y);


        var viewbox = SVGelement.getAttribute('viewBox').split(" ");
        var viewboxminy = viewbox[1];
        var viewboxhgt = viewbox[3];
        var SVGtruminy = (viewboxminy * 1) + (viewboxhgt * 1);
        var targetsize = 6000;
        SVGelement.getElementById("SVGPOSASSET").setAttribute("x", (self.model.cen.x - ((targetsize / self.model.birdsEye.boxscale) * 0.5)));
        SVGelement.getElementById("SVGPOSASSET").setAttribute("y", SVGtruminy - (self.model.cen.y + ((targetsize / self.model.birdsEye.boxscale) * 0.5)));
        if (self.model.nav.targetLock) {
            SVGelement.getElementById("SVGPOSASSET").setAttribute('href', 'images/ICON_navmode_targetlock.png');
        } else {
            SVGelement.getElementById("SVGPOSASSET").setAttribute('href', 'images/ICON_navmode_targetlockoff.png');
        }
        SVGelement.getElementById("SVGPOSASSET").setAttribute("width", targetsize / self.model.birdsEye.boxscale);
        SVGelement.getElementById("SVGPOSASSET").setAttribute("height", targetsize / self.model.birdsEye.boxscale);

        GUI_refreshSVGcampos();
    } catch (err) {
        // NADA
    }
}


function GUI_navmodeORBITmovein() {
    var eyeoffset_x = self.viewer.scene.camera.look[0] - self.viewer.scene.camera.eye[0];
    var eyeoffset_y = self.viewer.scene.camera.look[1] - self.viewer.scene.camera.eye[1];
    var eyeoffset_z = self.viewer.scene.camera.look[2] - self.viewer.scene.camera.eye[2];


    self.viewer.scene.camera.eye = [self.viewer.scene.camera.eye[0] + (eyeoffset_x * 0.5), self.viewer.scene.camera.eye[1] + (eyeoffset_y * 0.5), self.viewer.scene.camera.eye[2]]


    //self.viewer.scene.camera.look = [self.model.cen.x * self.model.scaleres, self.model.cen.y * self.model.scaleres, self.model.cen.z * self.model.scaleres];
    //self.viewer.scene.camera.eye = [(self.model.min.x - 6000) * self.model.scaleres, (self.model.min.y - 6000) * self.model.scaleres, self.model.cen.z * self.model.scaleres];


}
function GUI_navmodeORBITmoveout() {
    var eyeoffset_x = self.viewer.scene.camera.look[0] - self.viewer.scene.camera.eye[0];
    var eyeoffset_y = self.viewer.scene.camera.look[1] - self.viewer.scene.camera.eye[1];
    var eyeoffset_z = self.viewer.scene.camera.look[2] - self.viewer.scene.camera.eye[2];


    self.viewer.scene.camera.eye = [self.viewer.scene.camera.eye[0] - (eyeoffset_x * 1), self.viewer.scene.camera.eye[1] - (eyeoffset_y * 1), self.viewer.scene.camera.eye[2]]


    //self.viewer.scene.camera.look = [self.model.cen.x * self.model.scaleres, self.model.cen.y * self.model.scaleres, self.model.cen.z * self.model.scaleres];
    //self.viewer.scene.camera.eye = [(self.model.min.x - 6000) * self.model.scaleres, (self.model.min.y - 6000) * self.model.scaleres, self.model.cen.z * self.model.scaleres];


}

function GUI_navmodeORBITrotcw() {
    self.camera.orbitYaw(-20.0);
}
function GUI_navmodeORBITrotccw() {
    self.camera.orbitYaw(20.0);
}


function GUI_onclickSELECT() {
    document.getElementById("onclickSELECT").style.backgroundColor = '#007';
    document.getElementById("onclickMEASURE").style.backgroundColor = '';
    document.getElementById("onclickGOTO").style.backgroundColor = '';
    self.isFP = false;
    self.selectMode = "select";
    //sectionPlanes.clear();
    self.distanceMeasurements.clear();
    self.distanceMeasurements.control.deactivate();
}

function GUI_onclickMEASURE() {
    document.getElementById("onclickSELECT").style.backgroundColor = '';
    document.getElementById("onclickMEASURE").style.backgroundColor = '#007';
    document.getElementById("onclickGOTO").style.backgroundColor = '';
    self.isFP = true;
    self.selectMode = "measure"
    //sectionPlanes.clear();
    self.distanceMeasurements.control.activate();
}

function GUI_onclickGOTO() {
    document.getElementById("onclickSELECT").style.backgroundColor = '';
    document.getElementById("onclickMEASURE").style.backgroundColor = '';
    document.getElementById("onclickGOTO").style.backgroundColor = '#007';
    self.isFP = true;
    self.selectMode = "goto";
    //sectionPlanes.clear();
    self.distanceMeasurements.clear();
    self.distanceMeasurements.control.deactivate();
}

function GUI_onclickSLICE() {
    //document.getElementById("rdoSelectItem").onclick = (e) => {
    document.getElementById("onclickSELECT").style.backgroundColor = '';
    document.getElementById("onclickMEASURE").style.backgroundColor = '';
    document.getElementById("onclickGOTO").style.backgroundColor = '';
    self.isFP = true;
    self.selectMode = "slice"
    self.distanceMeasurements.clear();
    self.distanceMeasurements.control.deactivate();
}



function GUI_actionPARTS() {
    if (document.getElementById("navPARTSpanel").style.display == 'none') {
        document.getElementById("navPARTSpanel").style.display = '';
    } else {
        document.getElementById("navPARTSpanel").style.display = 'none';
    }
}


function GUI_actionPLAN() {
    if (document.getElementById("navBIRDSEYEpanel").style.display == 'none') {
        document.getElementById("navBIRDSEYEpanel").style.display = '';
    } else {
        document.getElementById("navBIRDSEYEpanel").style.display = 'none';
    }
}

function GUI_actionELEV() {
    if (document.getElementById("navELEVATIONpanel").style.display == 'none') {
        document.getElementById("navELEVATIONpanel").style.display = '';
    } else {
        document.getElementById("navELEVATIONpanel").style.display = 'none';
    }
}


function GUI_actionDETAILS() {

    console.log("GUI_actionDETAILS");

    if (document.getElementById("INFOFRAME").style.display == 'none') {
        document.getElementById("INFOFRAME").style.display = '';
        document.getElementById("INFOFRAME").src = "ADBDETAILS.ASPX?OBJID=" + document.getElementById("itemId").value;
    } else {
        document.getElementById("INFOFRAME").style.display = 'none';
    }
}

function GUI_actionGOTO() {

    console.log("GUI_actionGOTO");

    //document.getElementById("showItem").onclick = (e) => {
    var targetID = document.getElementById("itemId").value;
    if (targetID.indexOf('_M') > targetID.length - 6) {
        targetID = targetID.substring(0, targetID.indexOf('_M'));

    }
    const entity = self.viewer.scene.objects[targetID];
    if (entity) {
        ADBGoToItem3d(entity.aabb);
    }

    //if (mode == "2d") {
    //  storeyViewsPlugin.showStoreyObjects(currentSId, {
    //    hideOthers: true,
    //    useObjectStates: false
    //  });
    //}

    //if (mode == "2d") {
    //  storeyViewsPlugin.showStoreyObjects(currentSId, {
    //    hideOthers: true,
    //    useObjectStates: false
    //  });
    //  storeyViewsPlugin.gotoStoreyCamera(currentSId, {
    //    projection: "ortho",
    //    done: () => {
    //      self.viewer.cameraControl.navMode = "planView"; // Disable rotation
    //      document.getElementById("navPlanView").checked = true;
    //      document.getElementById("projOrtho").checked = true;
    //      self.viewer.cameraFlight.flyTo({
    //        aabb: ent.aabb,
    //        fitFOV: 50
    //      }, () => {
    //      });
    //    }
    //  });
    //} else if (mode == "3dOf2d") {
    //  storeyViewsPlugin.gotoStoreyCamera(currentSId, {
    //    projection: "perspective",
    //    done: () => {
    //      document.getElementById("projPerspective").checked = true;
    //      GoToItem3d(metaObjectType, ent.aabb);
    //    }
    //  });
    //} else {
    //  GoToItem3d(metaObjectType, ent.aabb);
    //}


}


function GUI_movesectionplaneCD() {//Lower ceiling section plane 1m.
    const mySectionPlane2 = self.sectionPlanes.sectionPlanes["Ceiling"];
    mySectionPlane2.pos = [mySectionPlane2.pos[0], mySectionPlane2.pos[1], mySectionPlane2.pos[2] - (500 * self.model.scaleres)];
    //mySectionPlane2.dir = [0.4, 0.0, 0.5];
}
function GUI_movesectionplaneCU() {//Raise ceiling section plane 1m.
    const mySectionPlane2 = self.sectionPlanes.sectionPlanes["Ceiling"];
    mySectionPlane2.pos = [mySectionPlane2.pos[0], mySectionPlane2.pos[1], mySectionPlane2.pos[2] + (500 * self.model.scaleres)];
    //mySectionPlane2.dir = [0.4, 0.0, 0.5];
}
function GUI_movesectionplaneFD() {//Lower floor section plane 1m.
    const mySectionPlane2 = self.sectionPlanes.sectionPlanes["Floor"];
    mySectionPlane2.pos = [mySectionPlane2.pos[0], mySectionPlane2.pos[1], mySectionPlane2.pos[2] - (500 * self.model.scaleres)];
    //mySectionPlane2.dir = [0.4, 0.0, 0.5];
}
function GUI_movesectionplaneFU() {//Raise floor section plane 1m.
    const mySectionPlane2 = self.sectionPlanes.sectionPlanes["Floor"];
    mySectionPlane2.pos = [mySectionPlane2.pos[0], mySectionPlane2.pos[1], mySectionPlane2.pos[2] + (500 * self.model.scaleres)];
    //mySectionPlane2.dir = [0.4, 0.0, 0.5];
}


