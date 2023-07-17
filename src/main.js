import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import elementui from "./plugins/elementui";
import Global from "@/utils/global";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(elementui);
app.use(Global);
app.mount("#app");
