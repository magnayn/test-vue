import { createApp } from 'vue';
import Dev from './serve.vue';
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "app.use" call
import Wooyay from '@/entry.esm';
import ElementPlus from 'element-plus';
import 'element-plus/es/components/message/style/css';
const app = createApp(Dev);
app.use(Wooyay);
app.use(ElementPlus, { size: 'small', zIndex: 3000 });

app.mount('#app');
