<template>


<toolbar>

<toolbar-button ID="navmodeELEV" location="left" widget="dxButton" :options="navmodeELEV"  />
  <toolbar-button id="actionPARTS" location="left" widget="dxButton" :options="actionPARTS"  />
  <toolbar-button id="actionDETAILS" location="left" widget="dxButton" :options="actionDETAILS"  />

  <toolbar-button ID="actionGOTO" location="center" widget="dxButton" :options="actionGOTO" />

<!--
onclick="GUI_togglecutplane()"
-->
 <toolbar-button ID="flrcpTOGGLE" location="center" widget="dxButton" :options="flrcpTOGGLE"  />
  <toolbar-button ID="onclickSLICE" location="center" widget="dxButton" :options="onclickSLICE" />
  <toolbar-button ID="onclickSELECT" location="center" widget="dxButton" :options="onclickSELECT" />
  <toolbar-button ID="onclickMEASURE" location="center" widget="dxButton" :options="onclickMEASURE" />
  <toolbar-button ID="onclickGOTO" location="center" widget="dxButton" :options="onclickGOTO" />
        
        
    <toolbar-button id="navmodeTARGETLOCK"  widget="dxButton" :options="modeTargetLockOptions"  location="center" />

    <toolbar-button ID="navmodeFPV"      widget="dxButton"   :options="modeFPVOptions" location="center"   />

    <toolbar-button ID="navmodeDRONE"  widget="dxButton" :options="modeDroneOptions" location="center"  />

    <toolbar-button ID="navmodeORBIT"  widget="dxButton" :options="modeOrbitOptions" location="center"  />


    <!-- <div ID="navmodeFPVsub" > -->
      <toolbar-button ID="navmodeFPVHGT00" widget="dxButton" :options="navHeight0"  location="center"/>
      <toolbar-button ID="navmodeFPVHGT01" widget="dxButton" :options="navHeight1"   location="center"/>
      <toolbar-button ID="navmodeFPVHGT02" widget="dxButton" :options="navHeight2" location="center" />
      <toolbar-button ID="navmodeFPVHGT03" widget="dxButton" :options="navHeight3" location="center"/>
    <!-- </div> -->
        
    <!-- <div ID="navmodeORBITsub" > -->
      <toolbar-button ID="navmodeORBITmoveout" widget="dxButton" :options="navmodeORBITmoveout"  location="center" ></toolbar-button>
      <toolbar-button ID="navmodeORBITmovein" widget="dxButton" :options="navmodeORBITmovein"  location="center" ></toolbar-button>
      <toolbar-button ID="navmodeORBITrotccw" widget="dxButton" :options="navmodeORBITrotccw"  location="center" ></toolbar-button>
      <toolbar-button ID="navmodeORBITrotcw" widget="dxButton" :options="navmodeORBITrotcw"  location="center" ></toolbar-button>
    <!-- </div> -->

    <!-- <div ID="navmodeCUTPsub" > -->
      <toolbar-button ID="flrcpCD" widget="dxButton" :options="flrcpCD" location="center" ></toolbar-button>
      <toolbar-button ID="flrcpCU" widget="dxButton" :options="flrcpCU" location="center" ></toolbar-button>
      <toolbar-button ID="flrcpFD" widget="dxButton" :options="flrcpFD" location="center" ></toolbar-button>
      <toolbar-button ID="flrcpFU" widget="dxButton" :options="flrcpFU" location="center" ></toolbar-button>
    <!-- </div> -->

<!-- <div ><select id="navROOMLST" >
  <option value="NOROOM">Rooms</option><option value="0">FIRST-1</option><option value="0">FIRST-10</option><option value="0">FIRST-11</option><option value="0">FIRST-12</option><option value="0">FIRST-13</option><option value="0">FIRST-14</option><option value="0">FIRST-2</option><option value="0">FIRST-21</option><option value="0">FIRST-22</option><option value="0">FIRST-23</option><option value="0">FIRST-24</option><option value="0">FIRST-25</option><option value="0">FIRST-26</option><option value="0">FIRST-27</option><option value="0">FIRST-28</option><option value="0">FIRST-29</option><option value="0">FIRST-3</option><option value="0">FIRST-30</option><option value="0">FIRST-4</option><option value="0">FIRST-5</option><option value="0">FIRST-6</option><option value="0">FIRST-7</option><option value="0">FIRST-8</option><option value="0">FIRST-9</option><option value="0">GROUND-1</option><option value="0">GROUND-15</option><option value="0">GROUND-16</option><option value="0">GROUND-17</option><option value="0">GROUND-18</option><option value="0">GROUND-19</option><option value="0">GROUND-2</option><option value="0">GROUND-20</option><option value="0">GROUND-R3</option></select>
</div>  -->

   <toolbar-button id="rooms"  location="after"  widget="dxSelectBox" :options="listRooms" />  
<toolbar-button id="navmodePLAN" location="after"  widget="dxButton" :options="navmodePLAN"/>
 <toolbar-button id="actionGOTOroom" location="after"  widget="dxButton" :options="actionGOTOroom" />


</toolbar>
</template>
<style scoped>
.toolbar-label,
.toolbar-label > b {
  font-size: 16px;
}
div.tbicon {
  float: left;
  width: 40px;
  height: 36px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #cccccc;
}
</style>

<script lang="ts">
import Toolbar from "@/components/Toolbar.vue";
import ToolbarButton from "@/components/ToolbarButton.vue";
import { defineComponent } from "vue";

import { ModelInfo } from "../interfaces/ModelInterfaces";

/*
export enum NavMode{
  Orbit
};
*/

export default defineComponent({
  props: {
    navMode: String,
    model: {
      type: Object as () => ModelInfo | null,
    },
  },
  components: {ToolbarButton, Toolbar},
  updated() {
    console.log("TB UPDATE");
    console.log(this.model);
  },
  data() {
    return {
      currentNavMode: this.navMode,
      refreshButtonOptions: {
        icon: "refresh",
        onClick: () => {
          console.log("Refresh button has been clicked!");
        },
      },
      fooOptions: {
        text: "foofoo",
      },

      //
      navmodeELEV: {
        icon: "IMAGES/ICON_navmode_elevview.png",
        hint: "Elevation",
        onClick: () => {},
      },
      actionPARTS: {
        icon: "IMAGES/ICON_parts.png",
        hint: "Parts",
        onClick: () => {},
      },
      actionDETAILS: {
        icon: "IMAGES/ICON_details.png",
        hint: "Details",
        onClick: () => {},
      },
      actionGOTO: {
        icon: "IMAGES/ICON_goto.png",
        hint: "Go To",
        onClick: () => {},
      },

      flrcpTOGGLE: {
        icon: "IMAGES/ICON_flrcp_on.png",
        hint: "Toggle Cut-Plane",
        onClick: () => {},
      },
      onclickSLICE: {
        icon: "IMAGES/ICON_onclick_slice.png",
        hint: "Slice",
        onClick: () => {},
      },
      onclickSELECT: {
        icon: "IMAGES/ICON_onclick_select.png",
        hint: "select",
        onClick: () => {},
      },
      onclickMEASURE: {
        icon: "IMAGES/ICON_onclick_measure.png",
        hint: "Measure",
        onClick: () => {},
      },
      onclickGOTO: {
        icon: "IMAGES/ICON_onclick_goto.png",
        hint: "Go To",
        onClick: () => {},
      },

      // Nav mode options

      // Cut plane
      flrcpCD: {
        icon: "IMAGES/ICON_flrcp_ceil_down.png",
        hint: "Cut Plane: Ceiling Down",
        onClick: () => {},
      },
      flrcpCU: {
        icon: "IMAGES/ICON_flrcp_ceil_up.png",
        hint: "Cut Plane: Ceiling Up",
        onClick: () => {},
      },
      flrcpFD: {
        icon: "IMAGES/ICON_flrcp_floor_down.png",
        hint: "Cut Plane: Floor Down",
        onClick: () => {},
      },
      flrcpFU: {
        icon: "IMAGES/ICON_flrcp_floor_up.png",
        hint: "Cut Plane: Floor Up",
        onClick: () => {},
      },

      //

      navmodePLAN: {
        icon: "IMAGES/ICON_navmode_planview.png",
        hint: "Nav mode plan",
        onClick: () => {},
      },

      actionGOTOroom: {
        icon: "IMAGES/ICON_goto.png",
        hint: "Goto room",
        onClick: () => {},
      },
      listRooms: {
        width: 140,
        items: this.model?.floorList,
        valueExpr: "id",
        displayExpr: "name",
        value: null,
        onValueChanged: (args) => {},
      },
    };
  },
  computed: {
    modeTargetLockOptions() {
      return {
        icon: "IMAGES/ICON_navmode_targetlock.png",
        hint: "Target Lock",
        type: this.currentNavMode == "TargetLock" ? "default" : "outlined",
        onClick: () => {
          this.setNavMode("TargetLock");
        },
      };
    },
    modeFPVOptions() {
      return {
        icon: "IMAGES/ICON_navmode_fpv.png",
        hint: "FPV",
        type: this.currentNavMode == "FPV" ? "default" : "outlined",
        onClick: () => {
          this.setNavMode("FPV");
        },
      };
    },
    modeDroneOptions() {
      return {
        icon: "IMAGES/ICON_navmode_drone.png",
        hint: "Drone",
        type: this.currentNavMode == "Drone" ? "default" : "outlined",
        onClick: () => {
          this.setNavMode("Drone");
        },
      };
    },
    modeOrbitOptions() {
      return {
        icon: "IMAGES/ICON_navmode_orbit.png",
        hint: "Orbit",
        type: this.currentNavMode == "Orbit" ? "default" : "outlined",
        onClick: () => {
          this.setNavMode("Orbit");
        },
      };
    },

    // FPV
    navHeight0() {
      return {
        icon: "IMAGES/ICON_HGT_FPV_00.png",
        hint: "Prone",
        visible: this.currentNavMode == "FPV",
        onClick: () => {
          this.setHeight(150 * 0.2);
        },
      };
    },
    navHeight1() {
      return {
        icon: "IMAGES/ICON_HGT_FPV_01.png",
        hint: "Kneel",
        visible: this.currentNavMode == "FPV",
        onClick: () => {
          this.setHeight(150 * 0.5);
        },
      };
    },
    navHeight2() {
      return {
        icon: "IMAGES/ICON_HGT_FPV_02.png",
        hint: "Stand",
        visible: this.currentNavMode == "FPV",
        onClick: () => {
          this.setHeight(150);
        },
      };
    },
    navHeight3() {
      return {
        icon: "IMAGES/ICON_HGT_FPV_03.png",
        hint: "Steps",
        visible: this.currentNavMode == "FPV",
        onClick: () => {
          this.setHeight(150 * 1.5);
        },
      };
    },

    // Orbit
    navmodeORBITmoveout() {
      return {
        icon: "IMAGES/ICON_orbit_move_away.png",
        visible: this.currentNavMode == "Orbit",
        hint: "Move Away",
        onClick: () => {},
      };
    },
    navmodeORBITmovein() {
      return {
        icon: "IMAGES/ICON_orbit_move_toward.png",
        visible: this.currentNavMode == "Orbit",
        hint: "Move Toward",
        onClick: () => {},
      };
    },
    navmodeORBITrotccw() {
      return {
        icon: "IMAGES/ICON_orbit_rotate_ccw.png",
        visible: this.currentNavMode == "Orbit",
        hint: "Rotate Counter-Clockwise",
        onClick: () => {},
      };
    },
    navmodeORBITrotcw() {
      return {
        icon: "IMAGES/ICON_orbit_rotate_cw.png",
        visible: this.currentNavMode == "Orbit",
        hint: "Rotate Clockwise",
        onClick: () => {},
      };
    },
  },
  methods: {
    setNavMode(mode: string) {
      this.currentNavMode = mode;
      this.$emit("navModeChange", mode);
    },

    setHeight(height: number) {
      console.log("SH " + height);
      this.$emit("changeHeight", height);
    },

    onClick(e) {
      console.log(e.component);
      console.log(e.component.options);

      const buttonText = e.component.option("text");
      console.log(`The ${buttonText} button was clicked`);
    },
  },
  emits: {
    navModeChange(mode: string) {},
    changeHeight(height: number) {},
  },
});

function SetupGUI() {
  // //Define control actions
  // document.getElementById("actionDETAILS").onclick = GUI_actionDETAILS;
  // document.getElementById("actionPARTS").onclick = GUI_actionPARTS;
  // document.getElementById("actionGOTO").onclick = GUI_actionGOTO;
  // document.getElementById("flrcpTOGGLE").onclick = self.GUI_togglecutplane;
  // document.getElementById("flrcpCD").onclick = GUI_movesectionplaneCD;
  // document.getElementById("flrcpCU").onclick = GUI_movesectionplaneCU;
  // document.getElementById("flrcpFD").onclick = GUI_movesectionplaneFD;
  // document.getElementById("flrcpFU").onclick = GUI_movesectionplaneFU;
  // document.getElementById("onclickSELECT").onclick = GUI_onclickSELECT;
  // document.getElementById("onclickMEASURE").onclick = GUI_onclickMEASURE;
  // document.getElementById("onclickGOTO").onclick = GUI_onclickGOTO;
  // document.getElementById("navmodeTARGETLOCK").onclick = GUI_navmodeTARGETLOCK;
  // document.getElementById("navmodeFPV").onclick = self.GUI_navmodeFPV;
  // document.getElementById("navmodeDRONE").onclick = self.GUI_navmodeDRONE;
  // document.getElementById("navmodeORBIT").onclick = self.GUI_navmodeORBIT;
  // document.getElementById("navmodePLAN").onclick = GUI_actionPLAN; //GUI_refreshSVGcampos;
  // document.getElementById("navmodeELEV").onclick = GUI_actionELEV; //GUI_refreshSVGcampos;
  // //document.getElementById("navFLRLST").onchange = GUI_navFLRLST;
  // //document.getElementById("navROOMLST").onchange = GUI_navROOMLOAD;
  // document.getElementById("navmodeORBITmoveout").onclick = GUI_navmodeORBITmoveout;
  // document.getElementById("navmodeORBITmovein").onclick = GUI_navmodeORBITmovein;
  // document.getElementById("navmodeORBITrotccw").onclick = GUI_navmodeORBITrotccw;
  // document.getElementById("navmodeORBITrotcw").onclick = GUI_navmodeORBITrotcw;
  // document.getElementById("navmodeFPVHGT00").onclick = GUI_navmodeFPVsethgt;
  // document.getElementById("navmodeFPVHGT01").onclick = GUI_navmodeFPVsethgt;
  // document.getElementById("navmodeFPVHGT02").onclick = GUI_navmodeFPVsethgt;
  // document.getElementById("navmodeFPVHGT03").onclick = GUI_navmodeFPVsethgt;
  // document.getElementById("actionGOTOroom").onclick = GUI_actionGOTOroom;
  // //document.getElementById("actionPARTSroom").onclick = GUI_actionPARTSroom; // GUI_navROOMLOAD;
  // document.getElementById("navBIRDSEYEmagFit").onclick = GUI_BIRDSEYEmag;
  // document.getElementById("navBIRDSEYEmagx2").onclick = GUI_BIRDSEYEmag;
  // document.getElementById("navBIRDSEYEmagx4").onclick = GUI_BIRDSEYEmag;
  // document.getElementById("navBIRDSEYEmagx8").onclick = GUI_BIRDSEYEmag;
  // document.getElementById("navBIRDSEYEmagx16").onclick = GUI_BIRDSEYEmag;
  // document.getElementById("navBIRDSEYEmagx32").onclick = GUI_BIRDSEYEmag;
  // document.getElementById("navBIRDSEYEmagx64").onclick = GUI_BIRDSEYEmag;
  // //svg_doc.onclick = GUI_setSVGcampos;
  // document.getElementById('navBIRDSEYEdiv').onclick = GUI_setSVGcampos;
  // document.getElementById('navELEVATIONgraphic').onclick = self.GUI_navFLRLST;
}
</script>