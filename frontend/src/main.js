import { createApp } from "vue";
import { createVuetify } from "vuetify";
import { VBtn, VAlert, VTextField } from "vuetify/components";
import "vuetify/styles";

import Login from "./Login.vue";
import Schedule from "./Schedule.vue";
import Home from "./Home.vue";
import Audit from "./Audit.vue";
import Guards from "./Guards.vue";

const pages = {
  guards: Guards,
  login: Login,
  schedule: Schedule,
  home: Home,
  audit: Audit,
};

const root = document.querySelector("[data-vue-page]");

if (root) {
  const page = root.dataset.vuePage;
  const component = pages[page];
  const dataElement = document.querySelector("#vue-page-data");

  if (!component) {
    console.error("Компонент не найден:", page);
  } else if (!dataElement) {
    console.error("Отсутствует элемент vue-page-data");
  } else {
    try {
      const data = JSON.parse(dataElement.textContent);

      createApp(component, data)
        .use(
          createVuetify({
            components: {
              VBtn,
              VAlert,
              VTextField,
            },
          })
        )
        .mount(root);
    } catch (error) {
      console.error("Ошибка подключения Vue:", error);
    }
  }
}