<script setup>
import { nextTick, ref } from "vue";

const props = defineProps({
  month: String, dispatcher: Boolean, csrf: String, approved: Boolean, exists: Boolean,
  days: Array, assignments: Array, total: Number, vacant: Number, pdf: String, approve: String,
  generateUrl: String,
});
const requestedMonth = ref("");
const generating = ref(false);
const generationError = ref("");
const editor = ref(null);
const editorHtml = ref("");
const editorError = ref("");
const editorLink = ref("");
const saving = ref(false);
let loadVersion = 0;

async function generate() {
  generating.value = true;
  generationError.value = "";
  const [year, month] = requestedMonth.value.split("-").map(Number);
  try {
    const response = await fetch(props.generateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CSRFToken": props.csrf },
      body: JSON.stringify({ year, month }),
    });
    const data = await response.json();
    if (response.status === 201) {
      window.location.assign(data.url);
      return;
    }
    generationError.value = response.status === 409
      ? `Недостаточно сотрудников на даты: ${data.dates.join(", ")}.`
      : data.detail || "Проверьте указанный период.";
  } catch {
    generationError.value = "Не удалось получить ответ сервера.";
  } finally {
    generating.value = false;
  }
}

async function openEditor(event, href) {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const version = ++loadVersion;
  editorHtml.value = "";
  editorError.value = "";
  editorLink.value = href;
  editor.value.showModal();
  try {
    const response = await fetch(href + "?modal=1");
    if (!response.ok || response.redirected) throw new Error();
    const html = await response.text();
    if (version === loadVersion) editorHtml.value = html;
  } catch {
    if (version === loadVersion) editorError.value = "Не удалось загрузить форму.";
  }
}

async function saveEditor(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || saving.value) return;
  saving.value = true;
  editorError.value = "";
  const button = form.querySelector("button");
  if (button) button.disabled = true;
  try {
    const response = await fetch(form.action, { method: "POST", body: new FormData(form) });
    if (response.redirected) {
      window.location.assign(response.url);
      return;
    }
    if (!response.ok) throw new Error();
    editorHtml.value = await response.text();
    await nextTick();
  } catch {
    editorError.value = "Сервер не подтвердил сохранение. Проверьте расписание перед повтором.";
  } finally {
    if (button) button.disabled = false;
    saving.value = false;
  }
}

function approveSchedule(event) {
  if (!window.confirm("Руководитель подписал график?")) event.preventDefault();
}
</script>

<template>
  <div class="toolbar">
    <form method="get" class="inline">
      <label>Период <input type="month" name="month" :value="month" required></label>
      <v-btn type="submit" variant="outlined">Показать</v-btn>
    </form>
    <form v-if="dispatcher" class="inline" @submit.prevent="generate">
      <label>Новый график <input v-model="requestedMonth" type="month" required></label>
      <v-btn type="submit" color="primary" :loading="generating">Сформировать</v-btn>
    </form>
  </div>
  <v-alert v-if="generationError" type="error">{{ generationError }}</v-alert>
  <template v-if="exists && dispatcher">
    <div class="metrics">
      <div class="panel metric"><span>Период</span><strong>{{ month }}</strong></div>
      <div class="panel metric"><span>Позиций в графике</span><strong>{{ total }}</strong></div>
      <div class="panel metric"><span>Требуют назначения</span><strong>{{ vacant }}</strong></div>
      <div class="panel metric"><span>Статус графика</span><strong>{{ approved ? "Утверждён" : "Черновик" }}</strong></div>
    </div>
    <section class="panel">
      <div class="section-head">
        <div><h2>Смены по дням</h2><p class="muted">08:00–08:00 следующего дня</p></div>
        <div class="actions">
          <v-btn :href="pdf" variant="outlined">Скачать PDF</v-btn>
          <form v-if="!approved" method="post" :action="approve" @submit="approveSchedule">
            <input type="hidden" name="csrfmiddlewaretoken" :value="csrf">
            <v-btn type="submit" color="primary">Утвердить</v-btn>
          </form>
        </div>
      </div>
      <div v-for="day in days" :key="day.label" class="day">
        <div class="day-label"><strong>{{ day.label }}</strong><small>{{ day.weekday }}</small></div>
        <div class="slot-grid">
          <a v-for="slot in day.slots" :key="slot.href" :href="slot.href" data-slot-editor
             class="slot" :class="{vacant: !slot.guard}" @click="openEditor($event, slot.href)">
            <small>{{ slot.site }} · Пост {{ slot.number }}</small>
            <span>{{ slot.guard || "Свободная позиция" }}</span>
          </a>
        </div>
      </div>
    </section>
    <dialog ref="editor" class="slot-dialog" id="slot-editor" aria-labelledby="slot-editor-title"
            @cancel="saving && $event.preventDefault()">
      <div class="section-head">
        <h2 id="slot-editor-title">Подбор замены</h2>
        <v-btn variant="outlined" :disabled="saving" @click="editor.close()">Отмена</v-btn>
      </div>
      <p v-if="editorError" role="alert">{{ editorError }} <a :href="editorLink">Открыть позицию отдельно</a></p>
      <p v-else-if="!editorHtml">Загрузка…</p>
      <div @submit.prevent="saveEditor" v-html="editorHtml"></div>
    </dialog>
  </template>
  <section v-else-if="exists" class="panel">
    <h2>Мои дежурства</h2>
    <div v-for="item in assignments" :key="item.id" class="row">
      <div><strong>{{ item.day }}</strong><small>{{ item.site }} · Пост {{ item.number }}</small></div>
      <span class="chip">{{ item.state }}</span>
      <a v-if="item.report" :href="item.report">Открыть отчёт</a>
    </div>
    <p v-if="!assignments.length">У вас нет назначений за выбранный месяц.</p>
  </section>
  <section v-else class="panel empty">
    <h2>График за этот месяц отсутствует</h2>
  </section>
</template>
