<script lang="ts">
import { defineComponent } from 'vue';


export default /*#__PURE__*/defineComponent({
  name: 'Toolbar', // vue component name

});
</script>

<template>
  <div class="toolbar"><slot></slot></div>
</template>

<style scoped>
.toolbar {
  border: 1px solid red;
}

</style>
