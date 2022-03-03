<script lang="ts">
import { defineComponent } from 'vue';

interface SampleData {
  counter: number;
  initCounter: number;
  message: {
    action: string | null;
    amount: number | null;
  };
}

class Options {
    icon?: String;
    hint?: String;
    onClick: any;
     
}

export default /*#__PURE__*/defineComponent({
  name: 'ToolbarButton', // vue component name
  props: {
      options: Options
  },
  data(): SampleData {
    return {
      counter: 5,
      initCounter: 5,
      message: {
        action: null,
        amount: null,
      },
    };
  },
  computed: {
    changedBy() {
      const { message } = this as SampleData;
      if (!message.action) return 'initialized';
      return `${message.action} ${message.amount || ''}`.trim();
    },
  },
  methods: {
    
  },
});
</script>

<template>
<button @click="options.onClick">
  <img :src="options.icon"/>
</button>
</template>

<style scoped>
  .wooyay-sample {
    display: block;
    width: 400px;
    margin: 25px auto;
    border: 1px solid #ccc;
    background: #eaeaea;
    text-align: center;
    padding: 25px;
  }
  .wooyay-sample p {
    margin: 0 0 1em;
  }
</style>
