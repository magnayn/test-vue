<template>
 <div id="toolbar" style="position:absolute;top:0px;left:0px;height:36px;width:100%;background-color: #cccccc;">
  <div ID="navmodeELEV" class="tbicon" style="background-image: url('IMAGES/ICON_navmode_elevview.png');width:70px;height:36px;background-position: left;border-right:solid 3px black;padding-left:30px;vertical-align:middle;"  >&nbsp; </div>
  <div ID="actionPARTS" class="tbicon" style="background-image: url('IMAGES/ICON_parts.png')"  >&nbsp;</div>
  <div ID="actionDETAILS" class="tbicon" style="background-image: url('IMAGES/ICON_details.png')"  >&nbsp;</div>
  <input id='itemId' type='text' value='' style='float:left;width:260px;'/>
  <div ID="actionGOTO" class="tbicon" style="background-image: url('IMAGES/ICON_goto.png');border-right:solid 3px black;" >&nbsp;</div>

  <div ID="flrcpTOGGLE" class="tbicon" style="background-image: url('IMAGES/ICON_flrcp_on.png');" onclick="GUI_togglecutplane()">&nbsp;</div>
  <div ID="onclickSLICE" class="tbicon" style="display:none;background-image: url('IMAGES/ICON_onclick_slice.png');border-left:solid 3px black;" >&nbsp;</div>
  <div ID="onclickSELECT" class="tbicon" style="background-image: url('IMAGES/ICON_onclick_select.png');border-left:solid 3px black;" >&nbsp;</div>
  <div ID="onclickMEASURE" class="tbicon" style="background-image: url('IMAGES/ICON_onclick_measure.png');" >&nbsp;</div>
  <div ID="onclickGOTO" class="tbicon" style="background-image: url('IMAGES/ICON_onclick_goto.png');border-right:solid 3px black;" >&nbsp;</div>
        
        
    <div ID="navmodeTARGETLOCK"   class="tbicon" style="background-image: url('IMAGES/ICON_navmode_targetlock.png');background-Color:#88F;" >&nbsp;</div>
    <div ID="navmodeFPV"    class="tbicon" style="background-image: url('IMAGES/ICON_navmode_fpv.png');" >&nbsp;</div>
    <div ID="navmodeDRONE" class="tbicon" style="background-image: url('IMAGES/ICON_navmode_drone.png');" >&nbsp;</div>
    <div ID="navmodeORBIT" class="tbicon" style="background-image: url('IMAGES/ICON_navmode_orbit.png');" >&nbsp;</div>

    <div ID="navmodeFPVsub" style="float:left;width:170px;border-right:1px solid red;display:none;">
      <div ID="navmodeFPVHGT00" class="tbicon" style="display:xnone;background-image: url('IMAGES/ICON_HGT_FPV_00.png');" >&nbsp;</div>
      <div ID="navmodeFPVHGT01" class="tbicon" style="display:xnone;background-image: url('IMAGES/ICON_HGT_FPV_01.png');" >&nbsp;</div>
      <div ID="navmodeFPVHGT02" class="tbicon" style="display:xnone;background-image: url('IMAGES/ICON_HGT_FPV_02.png');background-Color:#88F;" >&nbsp;</div>
      <div ID="navmodeFPVHGT03" class="tbicon" style="display:xnone;background-image: url('IMAGES/ICON_HGT_FPV_03.png');" >&nbsp;</div>
    </div>
        
    <div ID="navmodeORBITsub" style="float:left;width:170px;border-right:1px solid red;display:none;">
      <div ID="navmodeORBITmoveout" class="tbicon" style="display:xnone;background-image: url('IMAGES/ICON_orbit_move_away.png');" >&nbsp;</div>
      <div ID="navmodeORBITmovein" class="tbicon" style="display:xnone;background-image: url('IMAGES/ICON_orbit_move_toward.png');" >&nbsp;</div>
      <div ID="navmodeORBITrotccw" class="tbicon" style="display:xnone;background-image: url('IMAGES/ICON_orbit_rotate_ccw.png');" >&nbsp;</div>
      <div ID="navmodeORBITrotcw" class="tbicon" style="display:xnone;background-image: url('IMAGES/ICON_orbit_rotate_cw.png');" >&nbsp;</div>
    </div>

    <div ID="navmodeCUTPsub" style="float:left;width:170px;border-right:1px solid red;display:none;">
      <div ID="flrcpCD" class="tbicon" style="display:xnone;background-image: url('IMAGES/ICON_flrcp_ceil_down.png');" >&nbsp;</div>
      <div ID="flrcpCU" class="tbicon" style="display:xnone;background-image: url('IMAGES/ICON_flrcp_ceil_up.png');" >&nbsp;</div>
      <div ID="flrcpFD" class="tbicon" style="display:xnone;background-image: url('IMAGES/ICON_flrcp_floor_down.png');" >&nbsp;</div>
      <div ID="flrcpFU" class="tbicon" style="display:xnone;background-image: url('IMAGES/ICON_flrcp_floor_up.png');" >&nbsp;</div>
    </div>
<!-- some included items here -->

<div id="navmodePLAN" class="tbicon" style="background-image: url('IMAGES/ICON_navmode_planview.png');float:right;">&nbsp;</div>
 <div id="actionGOTOroom" class="tbicon" style="background-image: url('IMAGES/ICON_goto.png');border-right:solid 3px black;float:right;">&nbsp; </div>
<div style="float:right;width:105px;"><select id="navROOMLST" style="width:  100px;"><option value="NOROOM">Rooms</option><option value="0">FIRST-1</option><option value="0">FIRST-10</option><option value="0">FIRST-11</option><option value="0">FIRST-12</option><option value="0">FIRST-13</option><option value="0">FIRST-14</option><option value="0">FIRST-2</option><option value="0">FIRST-21</option><option value="0">FIRST-22</option><option value="0">FIRST-23</option><option value="0">FIRST-24</option><option value="0">FIRST-25</option><option value="0">FIRST-26</option><option value="0">FIRST-27</option><option value="0">FIRST-28</option><option value="0">FIRST-29</option><option value="0">FIRST-3</option><option value="0">FIRST-30</option><option value="0">FIRST-4</option><option value="0">FIRST-5</option><option value="0">FIRST-6</option><option value="0">FIRST-7</option><option value="0">FIRST-8</option><option value="0">FIRST-9</option><option value="0">GROUND-1</option><option value="0">GROUND-15</option><option value="0">GROUND-16</option><option value="0">GROUND-17</option><option value="0">GROUND-18</option><option value="0">GROUND-19</option><option value="0">GROUND-2</option><option value="0">GROUND-20</option><option value="0">GROUND-R3</option></select></div>
</div>
</template>
<style scoped>
 div.tbicon {
      float:left;
      width:40px;
      height:36px;
      background-repeat: no-repeat;
      background-position: center;
      background-color: #cccccc;
    }
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent( {
    props: {
        // Not yet
    },
    components: {
        // Not yet
    }

});

</script>