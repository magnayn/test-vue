<template>
<div id="floorList">
<li v-for="item in floorList" :key="item.id">
    {{ item.name }}
  </li>
</div>
 <el-button>I am ElButton</el-button>
  <toolbar>



    <toolbar-button
      ID="navmodeELEV"
      location="left"
      widget="dxButton"
      :options="navmodeELEV"
    />
    <toolbar-button
      id="actionPARTS"
      location="left"
      widget="dxButton"
      :options="actionPARTS"
    />
    <toolbar-button
      id="actionDETAILS"
      location="left"
      widget="dxButton"
      :options="actionDETAILS"
    />

    <toolbar-button
      ID="actionGOTO"
      location="center"
      widget="dxButton"
      :options="actionGOTO"
    />

    <!--
onclick="GUI_togglecutplane()"
-->
    <toolbar-button
      ID="flrcpTOGGLE"
      location="center"
      widget="dxButton"
      :options="flrcpTOGGLE"
    />
    <toolbar-button
      ID="onclickSLICE"
      location="center"
      widget="dxButton"
      :options="onclickSLICE"
    />
    <toolbar-button
      ID="onclickSELECT"
      location="center"
      widget="dxButton"
      :options="onclickSELECT"
    />
    <toolbar-button
      ID="onclickMEASURE"
      location="center"
      widget="dxButton"
      :options="onclickMEASURE"
    />
    <toolbar-button
      ID="onclickGOTO"
      location="center"
      widget="dxButton"
      :options="onclickGOTO"
    />

    <toolbar-button
      id="navmodeTARGETLOCK"
      widget="dxButton"
      :options="modeTargetLockOptions"
      location="center"
    />

    <toolbar-button
      ID="navmodeFPV"
      widget="dxButton"
      :options="modeFPVOptions"
      location="center"
    />

    <toolbar-button
      ID="navmodeDRONE"
      widget="dxButton"
      :options="modeDroneOptions"
      location="center"
    />

    <toolbar-button
      ID="navmodeORBIT"
      widget="dxButton"
      :options="modeOrbitOptions"
      location="center"
    />

    <!-- <div ID="navmodeFPVsub" > -->
    <toolbar-button
      ID="navmodeFPVHGT00"
      widget="dxButton"
      :options="navHeight0"
      location="center"
    />
    <toolbar-button
      ID="navmodeFPVHGT01"
      widget="dxButton"
      :options="navHeight1"
      location="center"
    />
    <toolbar-button
      ID="navmodeFPVHGT02"
      widget="dxButton"
      :options="navHeight2"
      location="center"
    />
    <toolbar-button
      ID="navmodeFPVHGT03"
      widget="dxButton"
      :options="navHeight3"
      location="center"
    />
    <!-- </div> -->

    <!-- <div ID="navmodeORBITsub" > -->
    <toolbar-button
      ID="navmodeORBITmoveout"
      widget="dxButton"
      :options="navmodeORBITmoveout"
      location="center"
    ></toolbar-button>
    <toolbar-button
      ID="navmodeORBITmovein"
      widget="dxButton"
      :options="navmodeORBITmovein"
      location="center"
    ></toolbar-button>
    <toolbar-button
      ID="navmodeORBITrotccw"
      widget="dxButton"
      :options="navmodeORBITrotccw"
      location="center"
    ></toolbar-button>
    <toolbar-button
      ID="navmodeORBITrotcw"
      widget="dxButton"
      :options="navmodeORBITrotcw"
      location="center"
    ></toolbar-button>
    <!-- </div> -->

    <!-- <div ID="navmodeCUTPsub" > -->
    <toolbar-button
      ID="flrcpCD"
      widget="dxButton"
      :options="flrcpCD"
      location="center"
    ></toolbar-button>
    <toolbar-button
      ID="flrcpCU"
      widget="dxButton"
      :options="flrcpCU"
      location="center"
    ></toolbar-button>
    <toolbar-button
      ID="flrcpFD"
      widget="dxButton"
      :options="flrcpFD"
      location="center"
    ></toolbar-button>
    <toolbar-button
      ID="flrcpFU"
      widget="dxButton"
      :options="flrcpFU"
      location="center"
    ></toolbar-button>
    <!-- </div> -->

    <!-- <div ><select id="navROOMLST" >
  <option value="NOROOM">Rooms</option><option value="0">FIRST-1</option><option value="0">FIRST-10</option><option value="0">FIRST-11</option><option value="0">FIRST-12</option><option value="0">FIRST-13</option><option value="0">FIRST-14</option><option value="0">FIRST-2</option><option value="0">FIRST-21</option><option value="0">FIRST-22</option><option value="0">FIRST-23</option><option value="0">FIRST-24</option><option value="0">FIRST-25</option><option value="0">FIRST-26</option><option value="0">FIRST-27</option><option value="0">FIRST-28</option><option value="0">FIRST-29</option><option value="0">FIRST-3</option><option value="0">FIRST-30</option><option value="0">FIRST-4</option><option value="0">FIRST-5</option><option value="0">FIRST-6</option><option value="0">FIRST-7</option><option value="0">FIRST-8</option><option value="0">FIRST-9</option><option value="0">GROUND-1</option><option value="0">GROUND-15</option><option value="0">GROUND-16</option><option value="0">GROUND-17</option><option value="0">GROUND-18</option><option value="0">GROUND-19</option><option value="0">GROUND-2</option><option value="0">GROUND-20</option><option value="0">GROUND-R3</option></select>
</div>  -->

    <toolbar-button
      id="rooms"
      location="after"
      widget="dxSelectBox"
      :options="listRooms"
    />
    <toolbar-button
      id="navmodePLAN"
      location="after"
      widget="dxButton"
      :options="navmodePLAN"
    />
    <toolbar-button
      id="actionGOTOroom"
      location="after"
      widget="dxButton"
      :options="actionGOTOroom"
    />
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

import ICON_details from "../assets/IMAGES/ICON_details.png";
import ICON_navmode_elevview from "../assets/IMAGES/ICON_navmode_elevview.png";

import ICON_parts from "../assets/IMAGES/ICON_parts.png";
import ICON_goto from "../assets/IMAGES/ICON_goto.png";
import ICON_flrcp_on from "../assets/IMAGES/ICON_flrcp_on.png";
import ICON_onclick_slice from "../assets/IMAGES/ICON_onclick_slice.png";
import ICON_onclick_select from "../assets/IMAGES/ICON_onclick_select.png";
import ICON_onclick_measure from "../assets/IMAGES/ICON_onclick_measure.png";
import ICON_onclick_goto from "../assets/IMAGES/ICON_onclick_goto.png";
import ICON_flrcp_ceil_down from "../assets/IMAGES/ICON_flrcp_ceil_down.png";
import ICON_flrcp_ceil_up from "../assets/IMAGES/ICON_flrcp_ceil_up.png";
import ICON_flrcp_floor_down from "../assets/IMAGES/ICON_flrcp_floor_down.png";
import ICON_flrcp_floor_up from "../assets/IMAGES/ICON_flrcp_floor_up.png";
import ICON_navmode_planview from "../assets/IMAGES/ICON_navmode_planview.png";
import ICON_navmode_targetlock from "../assets/IMAGES/ICON_navmode_targetlock.png";
import ICON_navmode_fpv from "../assets/IMAGES/ICON_navmode_fpv.png";
import ICON_navmode_drone from "../assets/IMAGES/ICON_navmode_drone.png";
import ICON_navmode_orbit from "../assets/IMAGES/ICON_navmode_orbit.png";
import ICON_HGT_FPV_00 from "../assets/IMAGES/ICON_HGT_FPV_00.png";
import ICON_HGT_FPV_01 from "../assets/IMAGES/ICON_HGT_FPV_01.png";
import ICON_HGT_FPV_02 from "../assets/IMAGES/ICON_HGT_FPV_02.png";
import ICON_HGT_FPV_03 from "../assets/IMAGES/ICON_HGT_FPV_03.png";

import ICON_orbit_move_away from "../assets/IMAGES/ICON_orbit_move_away.png";
import ICON_orbit_move_toward from "../assets/IMAGES/ICON_orbit_move_toward.png";
import ICON_orbit_rotate_ccw from "../assets/IMAGES/ICON_orbit_rotate_ccw.png";
import ICON_orbit_rotate_cw from "../assets/IMAGES/ICON_orbit_rotate_cw.png";

import { ElButton } from 'element-plus';

export default defineComponent({
  props: {
    navMode: String,
    model: {
      type: Object as () => ModelInfo | null,
    },
  },
  components: { ToolbarButton, Toolbar,     ElButton },
  updated() {
    console.log(this.model);
  },
  data() {
    return {
      currentNavMode: this.navMode,
      floorList: this.model?.floorList,
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
        icon: ICON_navmode_elevview,
        hint: "Elevation",
        onClick: () => {},
      },
      actionPARTS: {
        icon: ICON_parts,
        hint: "Parts",
        onClick: () => {},
      },
      actionDETAILS: {
        icon: ICON_details,
        hint: "Details",
        onClick: () => {},
      },
      actionGOTO: {
        icon: ICON_goto,
        hint: "Go To",
        onClick: () => {},
      },

      flrcpTOGGLE: {
        icon: ICON_flrcp_on,
        hint: "Toggle Cut-Plane",
        onClick: () => {},
      },
      onclickSLICE: {
        icon: ICON_onclick_slice,
        hint: "Slice",
        onClick: () => {},
      },
      onclickSELECT: {
        icon: ICON_onclick_select,
        hint: "select",
        onClick: () => {},
      },
      onclickMEASURE: {
        icon: ICON_onclick_measure,
        hint: "Measure",
        onClick: () => {},
      },
      onclickGOTO: {
        icon: ICON_onclick_goto,
        hint: "Go To",
        onClick: () => {},
      },

      // Nav mode options

      // Cut plane
      flrcpCD: {
        icon: ICON_flrcp_ceil_down,
        hint: "Cut Plane: Ceiling Down",
        onClick: () => {},
      },
      flrcpCU: {
        icon: ICON_flrcp_ceil_up,
        hint: "Cut Plane: Ceiling Up",
        onClick: () => {},
      },
      flrcpFD: {
        icon: ICON_flrcp_floor_down,
        hint: "Cut Plane: Floor Down",
        onClick: () => {},
      },
      flrcpFU: {
        icon: ICON_flrcp_floor_up,
        hint: "Cut Plane: Floor Up",
        onClick: () => {},
      },

      //

      navmodePLAN: {
        icon: ICON_navmode_planview,
        hint: "Nav mode plan",
        onClick: () => {},
      },

      actionGOTOroom: {
        icon: ICON_goto,
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
        icon: ICON_navmode_targetlock,
        hint: "Target Lock",
        type: this.currentNavMode == "TargetLock" ? "default" : "outlined",
        onClick: () => {
          this.setNavMode("TargetLock");
        },
      };
    },
    modeFPVOptions() {
      return {
        icon: ICON_navmode_fpv,
        hint: "FPV",
        type: this.currentNavMode == "FPV" ? "default" : "outlined",
        onClick: () => {
          this.setNavMode("FPV");
        },
      };
    },
    modeDroneOptions() {
      return {
        icon: ICON_navmode_drone,
        hint: "Drone",
        type: this.currentNavMode == "Drone" ? "default" : "outlined",
        onClick: () => {
          this.setNavMode("Drone");
        },
      };
    },
    modeOrbitOptions() {
      return {
        icon: ICON_navmode_orbit,
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
        icon: ICON_HGT_FPV_00,
        hint: "Prone",
        visible: this.currentNavMode == "FPV",
        onClick: () => {
          this.setHeight(150 * 0.2);
        },
      };
    },
    navHeight1() {
      return {
        icon: ICON_HGT_FPV_01,
        hint: "Kneel",
        visible: this.currentNavMode == "FPV",
        onClick: () => {
          this.setHeight(150 * 0.5);
        },
      };
    },
    navHeight2() {
      return {
        icon: ICON_HGT_FPV_02,
        hint: "Stand",
        visible: this.currentNavMode == "FPV",
        onClick: () => {
          this.setHeight(150);
        },
      };
    },
    navHeight3() {
      return {
        icon: ICON_HGT_FPV_03,
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
        icon: ICON_orbit_move_away,
        visible: this.currentNavMode == "Orbit",
        hint: "Move Away",
        onClick: () => {},
      };
    },
    navmodeORBITmovein() {
      return {
        icon: ICON_orbit_move_toward,
        visible: this.currentNavMode == "Orbit",
        hint: "Move Toward",
        onClick: () => {},
      };
    },
    navmodeORBITrotccw() {
      return {
        icon: ICON_orbit_rotate_ccw,
        visible: this.currentNavMode == "Orbit",
        hint: "Rotate Counter-Clockwise",
        onClick: () => {},
      };
    },
    navmodeORBITrotcw() {
      return {
        icon: ICON_orbit_rotate_cw,
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
</script>