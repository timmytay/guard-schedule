import { createApp } from "vue";
import { createVuetify } from "vuetify";
import { VBtn, VAlert, VTextField } from "vuetify/components";
import "vuetify/styles";
import Login from "./Login.vue";
import Schedule from "./Schedule.vue";
import Home from "./Home.vue";
import Audit from "./Audit.vue";

const pages = { login: Login, schedule: Schedule, home: Home, audit: Audit };
const root = document.querySelector("[data-vue-page]");
if (root) {
  const data = JSON.parse(document.querySelector("#vue-page-data").textContent);
  createApp(pages[root.dataset.vuePage], data)
    .use(createVuetify({ components: { VBtn, VAlert, VTextField } }))
    .mount(root);
}
