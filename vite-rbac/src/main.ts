import { createApp } from 'vue'
import router from './router/index'     // 路由
import ElementPlus from 'element-plus'  // element plus
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'  // element plus 使用中文
import { createPinia } from 'pinia'  // pinia
import piniaPersist from 'pinia-plugin-persistedstate'
import myconfirm from './util/myconfirm'
import App from './App.vue'

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersist)

app.use(router).use(ElementPlus, { locale: zhCn }).use(pinia).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.$myconfirm = myconfirm;

