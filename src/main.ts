import { createSSRApp } from "vue";
import i18n from "./lang/i18n";
import App from "./App.vue";
import pinia from "./stores/index";
import '@/api/request'



export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  app.use(i18n);
  return {
    app,
  };
}
