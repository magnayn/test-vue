<template>
<div>
  <!-- <button @click="buttonClick">Click</button>  -->

  <!-- add the viewer in here for the time being -->
  <div id="myViewer">
    <canvas id="myCanvas"></canvas>
    <canvas id="myNavCubeCanvas"></canvas>
    <canvas id="mySectionPlanesOverviewCanvas"></canvas>
    <div id="treeViewContainer" style="display: none"></div>

    <div id="stats">
      <div id="stats1">Loading plugins</div>
      <div id="stats2">Loading plugins</div>
    </div>
  </div>

  <div id="DEBUGINFO" style="position: absolute; top: 50px; left: 20px">
    debuginfo
  </div>

  <div
    id="navPARTSpanel"
    style="
      display: none;
      position: absolute;
      z-index: 9000;
      top: 36px;
      left: 30px;
      width: 300px;
      height: 17px;
      background-color: rgb(204, 204, 204);
    "
  >
    <input type="CHECKBOX" id="navPARTS1" value="REQ-4-1" checked="" />Complete
    Model (less spaces)(4)<br />
  </div>
  <div
    id="navBIRDSEYEpanel"
    style="
      z-index: 8000;
      position: absolute;
      top: 36px;
      right: 0px;
      width: 300px;
      height: 216px;
      background-color: rgb(204, 204, 204);
      display: none;
    "
  >
    <div
      id="navBIRDSEYEctrl"
      style="width: 300px; height: 16px; background-color: #cccccc"
    >
      <a id="navBIRDSEYEmagFit" style="margin-left: 10px; margin-right: 10px"
        >Fit</a
      >&nbsp;
      <a id="navBIRDSEYEmagx2" style="margin-left: 10px; margin-right: 10px"
        >X2</a
      >
      &nbsp;
      <a id="navBIRDSEYEmagx4" style="margin-left: 10px; margin-right: 10px"
        >X4</a
      >&nbsp;
      <a id="navBIRDSEYEmagx8" style="margin-left: 10px; margin-right: 10px"
        >X8</a
      >&nbsp;
      <a id="navBIRDSEYEmagx16" style="margin-left: 10px; margin-right: 10px"
        >X16</a
      >&nbsp;
      <a id="navBIRDSEYEmagx32" style="margin-left: 10px; margin-right: 10px"
        >X32</a
      >&nbsp;
      <a id="navBIRDSEYEmagx64" style="margin-left: 10px; margin-right: 10px"
        >X64</a
      >&nbsp;
    </div>
    <div
      id="navBIRDSEYEdiv"
      style="
        display: inline-block;
        width: 300px;
        height: 200px;
        background-color: #ccffcc;
        overflow: hidden;
      "
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style="width: 100%; height: 100%"
        miny="-17891.4218833085"
        viewBox="-34605.0250467028 -56129.6808062631 68562.4486889231 38238.2589229546"
      >
        <polygon
          id="1"
          points="-14143.4622804879,-16059.9670234113,-7541.88916326543,-12549.8483331812,-5145.04904661834,-17057.6489737632,-4977.62797578389,-17372.5222125382,-8045.62363564266,-19003.8044411815,-6578.90057918698,-21762.3093107914,-3457.08043406753,-20102.4080956806,-2353.67848622359,-19515.7188730983,969.983478623415,-17748.4964587347,195.839894679491,-16292.5441324332,1377.28734615142,-15664.3573794732,2424.17358447165,-15107.7180926817,3198.31716841557,-16563.6704189831,9910.23048042239,-12994.8828064949,11024.9400033287,-15091.3465073984,13427.5039172693,-19609.9120450325,-6595.20459970375,-30256.1750109156,-7835.83766306675,-27922.8835748652,-5572.51805785514,-26719.4551939098,-7097.91003656905,-23850.6101295156,-9361.22964178065,-25054.0385104709,-10405.8226478418,-23089.4447984561,-14143.4622804879,-16059.9670234113,-14143.4622804879,-16059.9670234113"
          fill="#1fa0f0"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="2"
          points="-7894.50658532497,-27812.5433800808,-9302.56071952242,-25164.3787052553,-7039.24111431082,-23960.9503243,-5631.18698011337,-26609.1149991254,-7894.50658532497,-27812.5433800808,-7894.50658532497,-27812.5433800808"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="3"
          points="-4313.66748973956,-18621.2502705859,-3568.14289226307,-20023.3781116267,-6636.13855212184,-21654.66034027,-7986.95471338443,-19114.1446359659,-4918.95905352566,-17482.8624073226,-4313.66748973956,-18621.2502705859,-4313.66748973956,-18621.2502705859"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="4"
          points="25684.7441720721,-13258.3213241091,19139.6867643734,-16738.3900785483,16701.3491173486,-12152.5439343383,23246.4065250473,-8672.47517989911,25684.7441720721,-13258.3213241091,25684.7441720721,-13258.3213241091"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="5"
          points="-722.326880737249,-8923.82274775811,5879.24623648518,-5413.70405752811,9616.88586913126,-12443.1818325729,9852.99250748754,-12887.2338359735,3251.41939026511,-16397.3525262036,2505.89479278862,-14995.2246851628,1760.37019531212,-13593.0968441221,680.003456166718,-11561.2225255314,26.0596153859905,-10331.3330373249,-722.326880737249,-8923.82274775811,-722.326880737249,-8923.82274775811"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="6"
          points="-3457.80269747867,-19964.7091893684,-4174.70830848774,-18616.4058335884,-3181.64655542819,-18088.3855332644,-2464.74094441912,-19436.6888890444,-3457.80269747867,-19964.7091893684,-3457.80269747867,-19964.7091893684"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="7"
          points="-3071.3063606438,-18029.7166110061,-1935.60972164344,-17425.8559965434,-964.077762688167,-16909.2832908063,85.4996998950968,-16351.2130546915,802.405310904165,-17699.5164104715,-2354.40074963473,-19378.0199667862,-3071.3063606438,-18029.7166110061,-3071.3063606438,-18029.7166110061"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="8"
          points="-2709.04461967514,-15834.8959881929,-1847.85285550426,-15376.992204714,-1076.57117020707,-16827.5620824894,-1937.76293437796,-17285.4658659682,-2709.04461967514,-15834.8959881929,-2709.04461967514,-15834.8959881929"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="9"
          points="-4233.37723074597,-18506.065638804,-4837.2378452087,-17370.3689998036,-5004.65891604315,-17055.4957610287,-2819.38481445953,-15893.5649104511,-2048.10312916235,-17344.1347882264,-3186.49099242574,-17949.4263520125,-4233.37723074597,-18506.065638804,-4233.37723074597,-18506.065638804"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="10"
          points="-7431.54896848103,-12491.179410923,-2686.92059275208,-9968.41575381922,-1938.53409662884,-11375.926043386,-1284.59025584811,-12605.8155315926,-175.604530235278,-14691.5143354439,575.247039151211,-14292.2794742233,1262.10271436948,-15584.0671204796,80.6552628975495,-16212.2538734397,-966.23097542268,-16768.8931602311,-1796.18158297809,-15207.9830876714,-2824.22925145708,-15754.6057291993,-5063.32783830138,-16945.1555662443,-7431.54896848103,-12491.179410923,-7431.54896848103,-12491.179410923"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="11"
          points="-123.933257709111,-14522.5052184013,-1145.63107459629,-12600.971094595,598.282247849752,-11673.7159330503,1619.98006473693,-13595.2500568566,573.093826416698,-14151.8893436481,-123.933257709111,-14522.5052184013,-123.933257709111,-14522.5052184013"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="12"
          points="-1202.86904753114,-12493.3221240736,-1799.57491537701,-11371.0816063885,-55.6615929309757,-10443.8264448438,541.044274914896,-11566.066962529,-1202.86904753114,-12493.3221240736,-1202.86904753114,-12493.3221240736"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="13"
          points="-2576.58039796768,-9909.746831561,-832.667075521643,-8982.49167001633,-114.330515189203,-10333.4862500594,-1858.24383763524,-11260.7414116041,-2576.58039796768,-9909.746831561,-2576.58039796768,-9909.746831561"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="14"
          points="-29825.469612275,-35928.1637675375,-30834.2888852518,-34030.8506620986,-30425.2227972706,-33813.3463649461,-30316.4706486944,-34017.8794089367,-30052.7306709171,-33877.6463752463,-30161.4828194933,-33673.1133312557,-23979.7406873042,-30386.2227354716,-23870.988538728,-30590.7557794622,-23607.2485609506,-30450.5227457718,-23716.0007095268,-30245.9897017812,-20491.9140424121,-28531.7124123823,-17270.5185995604,-26818.8660723068,-17161.7664509842,-27023.3991162973,-16895.3352489438,-26881.7351332836,-17004.08739752,-26677.202089293,-10483.2510081886,-23210.0118787641,-9474.43173521179,-25107.3249842031,-17214.3927156976,-29222.7352382192,-24313.8423215813,-32997.5795532729,-29825.469612275,-35928.1637675375,-29825.469612275,-35928.1637675375"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="21"
          points="-27056.5826715513,-41135.6827165083,-29761.0768927233,-36049.2688593741,-24308.6565358163,-33150.1655302236,-21604.1623146444,-38236.5793873579,-27056.5826715513,-41135.6827165083,-27056.5826715513,-41135.6827165083"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="22"
          points="-14507.4039330237,-34463.1660216275,-21483.0572228079,-38172.1866678062,-24187.5514439798,-33085.7728106719,-17211.8981541957,-29376.7521644933,-14507.4039330237,-34463.1660216275,-14507.4039330237,-34463.1660216275"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="23"
          points="-9410.03901566008,-25228.4300760396,-7974.79684431857,-27927.7280118627,-6705.54479448814,-30314.8439331739,-14386.2988411872,-34398.7733020758,-17090.7930623591,-29312.3594449415,-9410.03901566008,-25228.4300760396,-9410.03901566008,-25228.4300760396"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="24"
          points="-24203.258575709,-21408.8555941735,-14253.8024752722,-16118.6359456695,-10549.0746770637,-23086.2155626645,-17069.9110663951,-26553.4057731934,-17336.3422684355,-26695.0697562072,-20498.5307775004,-28376.4352111686,-24203.258575709,-21408.8555941735,-24203.258575709,-21408.8555941735"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="25"
          points="-30900.1125541269,-33907.054345999,-34604.8403523354,-26939.474729004,-24324.3636675455,-21473.2483137252,-20619.635869337,-28440.8279307203,-23781.8243784019,-30122.1933856817,-24045.5643561793,-30262.4264193721,-30227.3064883684,-33549.3170151562,-30491.0464661457,-33689.5500488465,-30900.1125541269,-33907.054345999,-30900.1125541269,-33907.054345999"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="26"
          points="19018.5816725369,-16802.7827981,13603.8384553125,-19681.8528367233,13467.8982695922,-19426.186531735,11165.5008082876,-15096.0066925133,16580.244025512,-12216.9366538901,19018.5816725369,-16802.7827981,19018.5816725369,-16802.7827981"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="27"
          points="30111.1757754164,-1625.57228503001,31454.8371900621,-4152.63186801891,23243.9119635453,-8518.45825362504,16577.7494640101,-12062.919727616,11101.1080887359,-14974.9016006768,9989.26046447633,-12883.8203482993,9757.44667409016,-12447.8420176878,16280.9742876846,-8979.22085783557,16389.7264362608,-9183.75390182616,16656.1576383012,-9042.08991881239,16547.405489725,-8837.55687482181,19768.8009325767,-7124.71053474621,22992.8875996914,-5410.43324534731,23101.6397482676,-5614.96628933791,23365.379726045,-5474.73325564751,23256.6275774687,-5270.20021165691,29438.3697096579,-1983.30961587281,29547.1218582341,-2187.84265986341,29810.8618360114,-2047.60962617301,29702.1096874352,-1843.07658218241,30111.1757754164,-1625.57228503001,30111.1757754164,-1625.57228503001"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="28"
          points="33957.5675566387,-8859.58310406539,25808.5404881717,-13192.497655234,23370.2028411468,-8606.65151102402,31519.2299096138,-4273.73695985541,33957.5675566387,-8859.58310406539,33957.5675566387,-8859.58310406539"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="29"
          points="5986.89520700654,-5356.46608459321,15939.0425317063,-64.8154867658122,19643.7703299148,-7032.39510376081,16481.5818208499,-8713.76055872224,16215.1506188095,-8855.42454173601,9691.62300521508,-12324.0457015883,5986.89520700654,-5356.46608459321,5986.89520700654,-5356.46608459321"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <polygon
          id="30"
          points="26340.6243083327,5465.80364806459,30045.3521065413,-1501.77596893041,29636.2860185601,-1719.28026608291,29372.5460407828,-1859.51329977331,23190.8039085937,-5146.40389555731,22927.0639308163,-5286.63692924771,19764.8754217514,-6968.00238420911,16060.1476235428,-0.422767214109626,26340.6243083327,5465.80364806459,26340.6243083327,5465.80364806459"
          fill="#ebba1c"
          stroke="black"
          stroke-width="30"
        ></polygon>
        <circle
          id="SVGPOSCAM"
          cx="-11439.071975700772"
          cy="-55053.096208727664"
          r="2000"
          fill="lime"
        ></circle>
        <line
          id="SVGDIRCAM"
          x1="-11439.071975700772"
          y1="-55053.096208727664"
          stroke="#aaaaaa"
          stroke-width="40"
          x2="7236.066932480812"
          y2="-7006.742061186478"
        ></line>
        <image
          id="SVGPOSASSET"
          href="images/ICON_navmode_targetlockoff.png"
          width="4000"
          height="4000"
          x="5000"
          y="5000"
        ></image>
      </svg>
    </div>
  </div>

  <div
    id="navELEVATIONpanel"
    style="
      display: none;
      z-index: 8000;
      position: absolute;
      top: 36px;
      left: 0px;
      width: 100px;
      height: 300px;
      background-color: #cccccc;
    "
  >
    <svg
      id="navELEVATIONgraphic"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style="width: 100px; height: 300px; background: #b50"
    >
      <rect
        id="GROUND"
        x="0"
        y="150.000000000015"
        width="100"
        height="149.999999999985"
        stroke="black"
        fill="#cccccc"
        stroke-width="1"
      ></rect>
      <text x="20" y="287" style="font: 10px arial">GROUND</text>
      <rect
        id="FIRST"
        x="0"
        y="0"
        width="100"
        height="150.000000000015"
        stroke="black"
        fill="#cccccc"
        stroke-width="1"
      ></rect>
      <text x="20" y="137.000000000015" style="font: 10px arial">FIRST</text>
      <rect
        id="ROOF"
        x="0"
        y="300"
        width="100"
        height="-300"
        stroke="black"
        fill="#cccccc"
        stroke-width="1"
      ></rect>
      <text x="20" y="-13" style="font: 10px arial">ROOF</text>
      <circle
        id="SVGPOSCAMelev"
        cx="10"
        cy="-1269.6424207484777"
        r="10"
        fill="lime"
      ></circle>
    </svg>
  </div>

  <!-- <iframe
    id="INFOFRAME"
    style="
      display: none;
      z-index: 9000;
      position: absolute;
      top: 36px;
      left: 60px;
      width: 400px;
      height: 300px;
    "
    src="blank.aspx"
  /> -->
</div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#myViewer {
  background: red;
}

#myCanvas {
  left: 0;
  width: 99.8%;
  height: 99.8%;
  position: absolute;
  background: white;
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
  math,
  XKTLoaderPlugin,
} from "@xeokit/xeokit-sdk/dist/xeokit-sdk.es.js";


import ModelLoader from './ModelLoader';
import AssetDBClient from "./AssetDBConnector";
import { ModelType } from "../interfaces/ModelInterfaces";

//function AJstatechgVIEWER(){ if(xhr.readyState==4){  if(xhr.status==200){viewer_ajaxresults(xhr.responseText);  } }}

/*
function viewer_ajaxresults(result){ 
  if(result.indexOf('Security Alert') >= 0 ){alert(result.replace('<BR>',' '));}
  else{  if (result.substring(0, 8) =='*FLRSVG*'){
     document.getElementById('navBIRDSEYEdiv').innerHTML = result.substring(8,9999999);   
     var svg_doc = document.getElementById('navBIRDSEYEdiv')?.children[0];
        for(var child=svg_doc.firstChild; child!==null; child=child.nextSibling) {    
           if(NAV_loadedrooms.indexOf(','+child.id+',')>-1){     
               child.setAttribute('fill', '#1fa0f0');     }   }  } }}document.getElementById('navmodeELEV').innerHTML = 'FIRST';
               AJpostdataVIEWER('&MODE=FLRSVG&BLDID=999&FLRREF=FIRST' );

*/

const canStandOnTypes = {
  // IFC types we can stand on in first-person mode
  IfcSlab: true,
  IfcStair: true,
  IfcFloor: true,
  IfcFooting: true,
};


class VData {
  viewer: any;
  sectionPlanes: any;


  GUISETTING_cutplanes = false;

  cameraControl: any;
  distanceMeasurements: any;
  mapColor: any = new Map();

  // XKT data
  loader!:ModelLoader;
  
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

export default defineComponent({
  props: {
    model: {
      type: Object as () => ModelType
    },
    navMode: String
  },
  data() {
    return new VData();
  },
  beforeUpdate() {
    console.log("BeforeUpdate");
        console.log(this.model);
    console.log(this.navMode);
  },
  updated() {
    console.log("Updated");
        console.log(this.model);
    console.log(this.navMode);

    
    this.LoadXKT();

  },
  async mounted() {
    console.log("Mounted");
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

    this.viewer.scene.xrayMaterial.fill = true;
    this.viewer.scene.xrayMaterial.fillAlpha = 0.1;
    this.viewer.scene.xrayMaterial.fillColor = [0, 0, 0];
    this.viewer.scene.xrayMaterial.edgeAlpha = 0.3;
    this.viewer.scene.xrayMaterial.edgeColor = [0, 0, 0];

    this.viewer.scene.highlightMaterial.fill = true;
    this.viewer.scene.highlightMaterial.edges = true;
    this.viewer.scene.highlightMaterial.fillAlpha = 0.9;
    this.viewer.scene.highlightMaterial.edgeAlpha = 0.9;
    this.viewer.scene.highlightMaterial.fillColor = [0, 0, 1];
    this.viewer.scene.highlightMaterial.edgeColor = [1, 0, 0];

    this.viewer.scene.selectedMaterial.fill = true;
    this.viewer.scene.selectedMaterial.edges = true;
    this.viewer.scene.selectedMaterial.fillAlpha = 0.5;
    this.viewer.scene.selectedMaterial.edgeAlpha = 0.6;
    this.viewer.scene.selectedMaterial.edgeColor = [1, 0, 0];

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

    
    // if (this.nav.mlayout == "COMPACT") {
    //   //document.getElementById('flrcpPANEL').style.display = 'none';
    //   document.getElementById("actionDETAILS")!.style.display = "none";
    //   document.getElementById("actionGOTO")!.style.display = "none";
    //   document.getElementById("navmodeELEV")!.style.display = "none";
    //   document.getElementById("itemId")!.style.display = "none";
    //   document.getElementById("myNavCubeCanvas")!.style.display = "none";
    // }
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

      if( this.model == null || this.loader != null ) {
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

    this.loader = new ModelLoader(this.viewer, this.model);
    const ll = this.loader;

    this.loader.load(

      () => {
      
      console.log("LOADED CALLBACK");

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
      //  storeyViewsPlugin.showStoreyObjects(currentSId, {
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
          //document.getElementById("navFirstPerson").checked = true;
          //document.getElementById("projPerspective").checked = true;
          this.mode = "3d";
        } else {
          this.viewer.cameraFlight.flyTo(
            {
              aabb: entAabbF,
              fitFOV: 45,
            },
            () => {
              this.viewer.cameraControl.navMode = "firstPerson";
              //document.getElementById("navFirstPerson").checked = true;
              //document.getElementById("projPerspective").checked = true;
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

    camera.worldAxis = [
      1,
      0,
      0, // Right
      0,
      0,
      1, // Up
      0,
      -1,
      0, // Forward
    ];
  },

  GUI_navmodeFPV(IFC_x_cm, IFC_Y_cm) {


    console.log("SET NAV MODE FPV");

    this.nav.mode = "FPV";
    this.nav.observerHeight = this.nav.standardHeight.person;
    document.getElementById("navmodeFPV")!.style.backgroundColor = "#88F";
    document.getElementById("navmodeDRONE")!.style.backgroundColor = "";
    document.getElementById("navmodeORBIT")!.style.backgroundColor = "";
    document.getElementById("navmodeORBITsub")!.style.display = "none";
    if (this.nav.mlayout != "COMPACT") {
      document.getElementById("navmodeFPVsub")!.style.display = "";
    }

    if (this.GUISETTING_cutplanes) {
      this.GUI_togglecutplane(); //Turn OFF floor cutplanes.
    }

    //document.getElementById("navmodeORBITmoveout").style.display = 'none';
    //document.getElementById("navmodeORBITmovein").style.display = 'none';
    //document.getElementById("navmodeORBITrotccw").style.display = 'none';
    //document.getElementById("navmodeORBITrotcw").style.display = 'none';
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
    document.getElementById("navmodeFPV")!.style.backgroundColor = "";
    document.getElementById("navmodeDRONE")!.style.backgroundColor = "#88F";
    document.getElementById("navmodeORBIT")!.style.backgroundColor = "";

    document.getElementById("navmodeORBITsub")!.style.display = "none";
    document.getElementById("navmodeFPVsub")!.style.display = "none";

    if (this.GUISETTING_cutplanes == false) {
      this.GUI_togglecutplane(); //Turn ON floor cutplanes.
    }

    //document.getElementById("navmodeORBITmoveout").style.display = 'none';
    //document.getElementById("navmodeORBITmovein").style.display = 'none';
    //document.getElementById("navmodeORBITrotccw").style.display = 'none';
    //document.getElementById("navmodeORBITrotcw").style.display = 'none';
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

    //document.getElementById("navmodeORBITmoveout").style.display = '';
    //document.getElementById("navmodeORBITmovein").style.display = '';
    //document.getElementById("navmodeORBITrotccw").style.display = '';
    //document.getElementById("navmodeORBITrotcw").style.display = '';
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
      document.getElementById("flrcpTOGGLE")!.style.backgroundColor = "";
      this.sectionPlanes.clear();
      document.getElementById("navmodeCUTPsub")!.style.display = "none";
      //document.getElementById("flrcpCD").style.display = 'none';
      //document.getElementById("flrcpCU").style.display = 'none';
      //document.getElementById("flrcpFD").style.display = 'none';
      //document.getElementById("flrcpFU").style.display = 'none';
    } else {
      this.GUISETTING_cutplanes = true;
      document.getElementById("navmodeCUTPsub")!.style.display = "";
      //document.getElementById("flrcpCD").style.display = '';
      //document.getElementById("flrcpCU").style.display = '';
      //document.getElementById("flrcpFD").style.display = '';
      //document.getElementById("flrcpFU").style.display = '';

      document.getElementById("flrcpTOGGLE")!.style.backgroundColor = "#007";

      //document.getElementById("floorSections").onclick = (e) => {

      //        viewer.scene.camera.look = [model.cen.x * model.scaleRes, model.cen.y * model.scaleRes, model.cen.z * model.scaleRes];
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
    document.getElementById("navmodeELEV")!.innerHTML = flrCode;
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

    var SVGelement = document.getElementById("navELEVATIONgraphic");

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


 GUI_BIRDSEYEmag(e) {
    //alert(e.target.id);
    var SVGelement = document.getElementById('navBIRDSEYEdiv')?.children[0] as SVGSVGElement;
    if (e.target.id == 'navBIRDSEYEmagFit') {
        this.model!.birdsEye.boxScale = 1.0;
        SVGelement.style.width = '100%';
        SVGelement.style.height = '100%';
    }
    if (e.target.id == 'navBIRDSEYEmagx2') {
        this.model!.birdsEye.boxScale = 2.0;
        SVGelement.style.width = '200%';
        SVGelement.style.height = '200%';
        SVGelement.style.marginTop = '-100px';
    }
    if (e.target.id == 'navBIRDSEYEmagx4') {
        this.model!.birdsEye.boxScale = 4.0;
        SVGelement.style.width = '400%';
        SVGelement.style.height = '400%';
    }
    if (e.target.id == 'navBIRDSEYEmagx8') {
        this.model!.birdsEye.boxScale = 8.0;
        SVGelement.style.width = '800%';
        SVGelement.style.height = '800%';
    }
    if (e.target.id == 'navBIRDSEYEmagx16') {
        this.model!.birdsEye.boxScale = 16.0;
        SVGelement.style.width = '1600%';
        SVGelement.style.height = '1600%';
    }
    if (e.target.id == 'navBIRDSEYEmagx32') {
        this.model!.birdsEye.boxScale = 32.0;
        SVGelement.style.width = '3200%';
        SVGelement.style.height = '3200%';
    }
    if (e.target.id == 'navBIRDSEYEmagx64') {
        this.model!.birdsEye.boxScale = 64.0;
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
    
    pt.x = Number(document.getElementById("SVGPOSCAM")?.getAttribute("cx")) * 1;
    pt.y = Number(document.getElementById("SVGPOSCAM")?.getAttribute("cy")) * 1;
       
       
       // TODO
    // var cursorpt = pt.matrixTransform(SVGelement.getScreenCTM());
    // var CAMpxposY = cursorpt.y - SVGbound.top;
    // var CAMpxposX = cursorpt.x - SVGbound.left;
    // //alert('CAMpxposY=' + CAMpxposY + ' SVGbound.height=' + SVGbound.height);
    // SVGelement.style.marginTop = ((((SVGbound.height / this.model!.birdsEye.boxScale) * 0.5) - CAMpxposY)) + 'px';
    // SVGelement.style.marginLeft = ((((SVGbound.width / this.model!.birdsEye.boxScale) * 0.5) - CAMpxposX)) + 'px';

    this.GUI_setSVGassetpos();
},



 GUI_navmodePARTS(e) {
    var partIndex = e.target.id.substring(8, 99) * 1;
    if (e.target.checked) {
        //alert('turn on' + e.target.value + ' ID:' + partIndex);

        //alert('turn on' + e.target.value);
        //var p0 = performance.now();
        //document.getElementById("stats2").innerHTML = "Loading this.model 2...";

        this.loader.loadPart(partIndex, e.target.value);

        
    } else {
        //alert('turn off' + e.target.value);
        this.loader.removePart(partIndex);
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