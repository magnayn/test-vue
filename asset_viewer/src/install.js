import AssetView from "./components/AssetView.vue";
import AssetViewer from "./components/AssetViewer.vue";
import AssetViewToolbar from "./components/AssetView.vue";

const AssetViewSimple = {
 install(Vue, options) {
  // Let's register our component globally
  // https://vuejs.org/v2/guide/components-registration.html
  Vue.component("asset-view", AssetView);
  Vue.component("asset-viewer", AssetViewer);
  Vue.component("asset-view-toolbar", AssetViewToolbar);
  
 }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(AssetViewSimple);
}

export default AssetViewSimple;